const LocalistScraper = require('./localistScraper');

/**
 * Harvard University Events Scraper
 * Uses the Localist API from Harvard College Calendar
 */
class HarvardScraper extends LocalistScraper {
  constructor() {
    super(
      'Harvard University',
      'https://calendar.college.harvard.edu',
      {
        daysAhead: 30,  // Fetch events for next 30 days
        perPage: 100,   // Max results per request
        distinct: true  // Remove duplicates
      }
    );
  }

  // Can override methods here if Harvard needs special handling
  // For now, the generic Localist implementation works perfectly
}

module.exports = HarvardScraper;
