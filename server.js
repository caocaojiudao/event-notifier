const express = require('express');
const path = require('path');
const cron = require('node-cron');
const ScraperManager = require('./scrapers/scraperManager');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize scraper manager
const scraperManager = new ScraperManager();

// Middleware
app.use(express.json());
app.use(express.static('public'));

// API Routes

// Get all events
app.get('/api/events', (req, res) => {
  const data = scraperManager.getEvents();
  res.json(data);
});

// Get available scrapers
app.get('/api/scrapers', (req, res) => {
  const scrapers = scraperManager.getAvailableScrapers();
  res.json(scrapers);
});

// Toggle a scraper on/off
app.post('/api/scrapers/:id/toggle', (req, res) => {
  const { id } = req.params;
  const { enabled } = req.body;

  const success = scraperManager.toggleScraper(id, enabled);

  if (success) {
    res.json({ success: true, message: `Scraper ${enabled ? 'enabled' : 'disabled'}` });
  } else {
    res.status(404).json({ success: false, message: 'Scraper not found' });
  }
});

// Manually trigger scraping
app.post('/api/scrape', async (req, res) => {
  try {
    console.log('Manual scrape triggered');
    const events = await scraperManager.scrapeAll();
    res.json({
      success: true,
      message: `Scraped ${events.length} events`,
      events: events.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Scraping failed',
      error: error.message
    });
  }
});

// Discovery API Endpoints

// Find nearby universities
app.post('/api/discover/nearby', (req, res) => {
  const { lat, lng, radius } = req.body;

  if (!lat || !lng) {
    return res.status(400).json({
      success: false,
      message: 'Latitude and longitude are required'
    });
  }

  try {
    const nearby = scraperManager.findNearby(lat, lng, radius || 100);
    res.json({
      success: true,
      universities: nearby,
      count: nearby.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Discovery failed',
      error: error.message
    });
  }
});

// Get all universities
app.get('/api/discover/all', (req, res) => {
  try {
    const universities = scraperManager.getAllUniversities();
    res.json({
      success: true,
      universities,
      count: universities.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get universities',
      error: error.message
    });
  }
});

// Search universities
app.get('/api/discover/search', (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({
      success: false,
      message: 'Search query is required'
    });
  }

  try {
    const results = scraperManager.searchUniversities(q);
    res.json({
      success: true,
      universities: results,
      count: results.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Search failed',
      error: error.message
    });
  }
});

// Add a university
app.post('/api/discover/add/:id', (req, res) => {
  const { id } = req.params;
  const result = scraperManager.addUniversity(id);
  res.json(result);
});

// Remove a university
app.delete('/api/discover/remove/:id', (req, res) => {
  const { id } = req.params;
  const result = scraperManager.removeUniversity(id);
  res.json(result);
});

// Get discovery stats
app.get('/api/discover/stats', (req, res) => {
  try {
    const stats = scraperManager.getDiscoveryStats();
    res.json({
      success: true,
      stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get stats',
      error: error.message
    });
  }
});

// Schedule periodic scraping (every 2 hours)
cron.schedule('0 */2 * * *', async () => {
  console.log('Running scheduled scrape...');
  try {
    await scraperManager.scrapeAll();
  } catch (error) {
    console.error('Scheduled scrape failed:', error.message);
  }
});

// Initial scrape on startup
console.log('Performing initial scrape...');
scraperManager.scrapeAll().then(() => {
  console.log('Initial scrape complete');
}).catch(error => {
  console.error('Initial scrape failed:', error.message);
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   Event Notifier Server Running        ║
╠════════════════════════════════════════╣
║   URL: http://localhost:${PORT}         ║
║   Scraping: Every 2 hours              ║
╚════════════════════════════════════════╝
  `);
});
