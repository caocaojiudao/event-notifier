const DiscoveryService = require('./discoveryService');

class ScraperManager {
  constructor() {
    // Available scrapers (populated dynamically by user)
    this.availableScrapers = {};

    // Active scrapers (enabled by user)
    this.activeScrapers = [];

    // Cached events
    this.events = [];
    this.lastUpdate = null;

    // Discovery service for finding nearby universities
    this.discoveryService = new DiscoveryService();
  }

  // Get list of available scrapers
  getAvailableScrapers() {
    return Object.keys(this.availableScrapers).map(key => {
      const scraper = new this.availableScrapers[key]();
      return {
        id: key,
        name: scraper.name,
        url: scraper.url,
        active: this.activeScrapers.includes(key)
      };
    });
  }

  // Enable/disable a scraper
  toggleScraper(scraperId, enabled) {
    if (!this.availableScrapers[scraperId]) {
      return false;
    }

    if (enabled && !this.activeScrapers.includes(scraperId)) {
      this.activeScrapers.push(scraperId);
    } else if (!enabled) {
      this.activeScrapers = this.activeScrapers.filter(id => id !== scraperId);
    }

    return true;
  }

  // Run all active scrapers
  async scrapeAll() {
    console.log(`Starting scrape of ${this.activeScrapers.length} sources...`);
    const allEvents = [];

    for (const scraperId of this.activeScrapers) {
      const ScraperClass = this.availableScrapers[scraperId];
      if (ScraperClass) {
        try {
          const scraper = new ScraperClass();
          const events = await scraper.scrape();
          allEvents.push(...events);
        } catch (error) {
          console.error(`Error running ${scraperId} scraper:`, error.message);
        }
      }
    }

    // Sort events by date
    allEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

    this.events = allEvents;
    this.lastUpdate = new Date().toISOString();

    console.log(`Scraping complete. Found ${allEvents.length} total events.`);
    return allEvents;
  }

  // Get cached events
  getEvents() {
    return {
      events: this.events,
      lastUpdate: this.lastUpdate,
      sources: this.activeScrapers.length
    };
  }

  // Discovery methods

  /**
   * Find nearby universities based on location
   */
  findNearby(lat, lng, radiusMiles = 100) {
    return this.discoveryService.findNearby(lat, lng, radiusMiles);
  }

  /**
   * Get all universities in the directory
   */
  getAllUniversities() {
    return this.discoveryService.getAllUniversities();
  }

  /**
   * Search universities by name or location
   */
  searchUniversities(query) {
    return this.discoveryService.search(query);
  }

  /**
   * Add a university scraper dynamically
   */
  addUniversity(universityId) {
    // Check if already added
    if (this.availableScrapers[universityId]) {
      console.log(`University ${universityId} already added`);
      return { success: false, message: 'Already added' };
    }

    try {
      // Create scraper class dynamically
      const ScraperClass = this.discoveryService.createScraper(universityId);

      // Add to available scrapers
      this.availableScrapers[universityId] = ScraperClass;

      // Enable it by default
      this.activeScrapers.push(universityId);

      console.log(`Added and enabled university: ${universityId}`);
      return { success: true, message: 'University added successfully' };
    } catch (error) {
      console.error(`Error adding university ${universityId}:`, error.message);
      return { success: false, message: error.message };
    }
  }

  /**
   * Remove a dynamically added university
   */
  removeUniversity(universityId) {
    if (!this.availableScrapers[universityId]) {
      return { success: false, message: 'University not found' };
    }

    // Remove from available scrapers
    delete this.availableScrapers[universityId];

    // Remove from active scrapers
    this.activeScrapers = this.activeScrapers.filter(id => id !== universityId);

    console.log(`Removed university: ${universityId}`);
    return { success: true, message: 'University removed successfully' };
  }

  /**
   * Get discovery service statistics
   */
  getDiscoveryStats() {
    return this.discoveryService.getStats();
  }
}

module.exports = ScraperManager;
