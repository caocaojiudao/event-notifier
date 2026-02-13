const axios = require('axios');
const cheerio = require('cheerio');

class BaseScraper {
  constructor(name, url) {
    this.name = name;
    this.url = url;
  }

  async fetchPage() {
    try {
      const response = await axios.get(this.url, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      return cheerio.load(response.data);
    } catch (error) {
      console.error(`Error fetching ${this.name}:`, error.message);
      return null;
    }
  }

  // To be implemented by child classes
  async scrape() {
    throw new Error('scrape() must be implemented by child class');
  }

  // Helper to normalize dates
  parseDate(dateString) {
    try {
      const date = new Date(dateString);
      return date.toISOString();
    } catch {
      return new Date().toISOString();
    }
  }

  // Create standardized event object
  createEvent(title, date, location, description, link) {
    return {
      title: title || 'Untitled Event',
      date: date || new Date().toISOString(),
      location: location || 'Location TBA',
      description: description || '',
      link: link || this.url,
      source: this.name,
      scrapedAt: new Date().toISOString()
    };
  }
}

module.exports = BaseScraper;
