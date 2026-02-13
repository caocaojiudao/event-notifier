const axios = require('axios');

/**
 * Generic Localist API scraper that can be configured for any organization
 * using the Localist event calendar platform
 */
class LocalistScraper {
  constructor(name, calendarUrl, options = {}) {
    this.name = name;
    this.calendarUrl = calendarUrl.replace(/\/$/, ''); // Remove trailing slash
    this.apiUrl = `${this.calendarUrl}/api/2/events`;

    // Configuration options
    this.options = {
      daysAhead: options.daysAhead || 30,      // How many days ahead to fetch
      perPage: options.perPage || 100,          // Results per page (max 100)
      distinct: options.distinct !== false,     // Remove duplicate events
      ...options
    };
  }

  /**
   * Fetch events from the Localist API
   */
  async scrape() {
    try {
      const params = {
        days: this.options.daysAhead,
        pp: this.options.perPage,
        distinct: this.options.distinct
      };

      console.log(`Fetching events from ${this.name} via Localist API...`);

      const response = await axios.get(this.apiUrl, {
        params,
        timeout: 15000,
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'EventNotifier/1.0'
        }
      });

      if (!response.data || !response.data.events) {
        console.log(`No events found for ${this.name}`);
        return [];
      }

      const events = this.parseEvents(response.data.events);
      console.log(`Fetched ${events.length} events from ${this.name}`);

      return events;

    } catch (error) {
      console.error(`Error fetching from ${this.name} Localist API:`, error.message);

      // If we get a specific error, log more details
      if (error.response) {
        console.error(`  Status: ${error.response.status}`);
        console.error(`  URL: ${this.apiUrl}`);
      }

      return [];
    }
  }

  /**
   * Parse Localist API events into our standard format
   */
  parseEvents(apiEvents) {
    return apiEvents.map(eventWrapper => {
      // Localist wraps each event in an "event" object
      const event = eventWrapper.event;

      return {
        title: event.title || 'Untitled Event',
        date: this.parseDate(event),
        location: this.parseLocation(event),
        description: this.parseDescription(event),
        link: event.localist_url || event.url || this.calendarUrl,
        source: this.name,
        scrapedAt: new Date().toISOString(),

        // Additional metadata from Localist
        eventId: event.id,
        eventType: event.event_types?.map(t => t.name).join(', ') || null,
        tags: event.tags || []
      };
    }).filter(event => event.title && event.date);
  }

  /**
   * Parse date from Localist event
   * Localist provides event_instances with start/end times
   */
  parseDate(event) {
    try {
      // Localist events have event_instances array with date/time info
      if (event.event_instances && event.event_instances.length > 0) {
        const instance = event.event_instances[0].event_instance;
        return new Date(instance.start).toISOString();
      }

      // Fallback to created_at or current time
      if (event.created_at) {
        return new Date(event.created_at).toISOString();
      }

      return new Date().toISOString();
    } catch (error) {
      return new Date().toISOString();
    }
  }

  /**
   * Parse location from Localist event
   */
  parseLocation(event) {
    try {
      // Try room/place first
      if (event.room_number && event.location_name) {
        return `${event.location_name}, Room ${event.room_number}`;
      }

      if (event.location_name) {
        return event.location_name;
      }

      // Try address
      if (event.address) {
        return event.address;
      }

      // Try place name from event_instances
      if (event.event_instances && event.event_instances.length > 0) {
        const instance = event.event_instances[0].event_instance;
        if (instance.location_name) {
          return instance.location_name;
        }
      }

      return this.name; // Default to institution name
    } catch (error) {
      return this.name;
    }
  }

  /**
   * Parse description from Localist event
   */
  parseDescription(event) {
    try {
      // Localist provides description and description_text
      // description_text is plain text, description is HTML
      if (event.description_text) {
        return this.truncateDescription(event.description_text);
      }

      if (event.description) {
        // Strip HTML tags for plain text
        const stripped = event.description.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        return this.truncateDescription(stripped);
      }

      return '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Truncate description to reasonable length
   */
  truncateDescription(text, maxLength = 300) {
    if (!text) return '';
    if (text.length <= maxLength) return text;

    // Truncate at word boundary
    const truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');

    return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
  }

  /**
   * Get information about this scraper
   */
  getInfo() {
    return {
      name: this.name,
      url: this.calendarUrl,
      apiUrl: this.apiUrl,
      type: 'Localist API',
      options: this.options
    };
  }
}

module.exports = LocalistScraper;
