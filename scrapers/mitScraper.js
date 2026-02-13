const LocalistScraper = require('./localistScraper');

/**
 * MIT Events Scraper
 * Uses the Localist API from MIT Events Calendar
 */
class MITScraper extends LocalistScraper {
  constructor() {
    super(
      'MIT',
      'https://calendar.mit.edu',
      {
        daysAhead: 30,  // Fetch events for next 30 days
        perPage: 100,   // Max results per request
        distinct: true  // Remove duplicates
      }
    );
  }

  // Can override methods here if MIT needs special handling
  // For now, the generic Localist implementation works perfectly
}

module.exports = MITScraper;
