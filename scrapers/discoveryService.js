const universities = require('./universityDirectory');
const LocalistScraper = require('./localistScraper');

/**
 * Discovery Service
 * Finds nearby universities with Localist calendars based on user location
 */
class DiscoveryService {
  constructor() {
    this.universities = universities;
  }

  /**
   * Calculate distance between two coordinates using Haversine formula
   * Returns distance in miles
   */
  calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 3959; // Earth's radius in miles
    const dLat = this.toRad(lat2 - lat1);
    const dLng = this.toRad(lng2 - lng1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return Math.round(distance * 10) / 10; // Round to 1 decimal
  }

  /**
   * Convert degrees to radians
   */
  toRad(degrees) {
    return degrees * (Math.PI / 180);
  }

  /**
   * Find universities near a given location
   * @param {number} lat - User's latitude
   * @param {number} lng - User's longitude
   * @param {number} radiusMiles - Search radius in miles (default: 100)
   * @param {number} maxResults - Maximum results to return (default: 20)
   */
  findNearby(lat, lng, radiusMiles = 100, maxResults = 20) {
    console.log(`Searching for universities within ${radiusMiles} miles of (${lat}, ${lng})`);

    // Calculate distance for each university
    const universitiesWithDistance = this.universities.map(uni => ({
      ...uni,
      distance: this.calculateDistance(lat, lng, uni.location.lat, uni.location.lng)
    }));

    // Filter by radius and sort by distance
    const nearby = universitiesWithDistance
      .filter(uni => uni.distance <= radiusMiles)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, maxResults);

    console.log(`Found ${nearby.length} universities within radius`);

    return nearby;
  }

  /**
   * Get all available universities
   */
  getAllUniversities() {
    return this.universities.map(uni => ({
      ...uni,
      distance: null // No distance calculation
    }));
  }

  /**
   * Find university by ID
   */
  findById(id) {
    return this.universities.find(uni => uni.id === id);
  }

  /**
   * Create a dynamic scraper for a university
   */
  createScraper(universityId) {
    const university = this.findById(universityId);

    if (!university) {
      throw new Error(`University with id '${universityId}' not found`);
    }

    // Create a dynamic scraper class
    class DynamicUniversityScraper extends LocalistScraper {
      constructor() {
        super(
          university.name,
          university.calendarUrl,
          {
            daysAhead: 30,
            perPage: 100,
            distinct: true
          }
        );

        // Store university info for reference
        this.universityId = university.id;
        this.city = university.city;
        this.state = university.state;
      }
    }

    return DynamicUniversityScraper;
  }

  /**
   * Get statistics about the directory
   */
  getStats() {
    const stateCount = {};
    this.universities.forEach(uni => {
      stateCount[uni.state] = (stateCount[uni.state] || 0) + 1;
    });

    return {
      total: this.universities.length,
      byState: stateCount,
      states: Object.keys(stateCount).length
    };
  }

  /**
   * Search universities by name or location
   */
  search(query) {
    const lowerQuery = query.toLowerCase();

    return this.universities.filter(uni =>
      uni.name.toLowerCase().includes(lowerQuery) ||
      uni.city.toLowerCase().includes(lowerQuery) ||
      uni.state.toLowerCase().includes(lowerQuery)
    );
  }
}

module.exports = DiscoveryService;
