# Event Notifier 🎓

A Node.js application that fetches university events via the Localist API and displays them in a beautiful, organized web interface.

## Features

- 🔍 **Dynamic Discovery**: Find universities near you using location-based search
- 🗺️ **32 Universities**: Pre-loaded directory of major US universities
- 🔄 **Automatic Updates**: Fetches events every 2 hours via API
- 🎨 **Beautiful UI**: Modern, responsive design with gradient colors
- ⚙️ **Configurable**: Add/remove event sources on-the-fly
- 📅 **Organized Display**: Events sorted by date and time
- 🔗 **Direct Links**: Click through to original event pages
- 🚀 **Lightweight**: No database required, in-memory caching
- 🌐 **API-Based**: Uses official Localist API (no web scraping!)

## Getting Started

The application starts **empty** - you discover and add universities you want to track!

## What is Localist?

Localist is an event management platform used by many universities. Both Harvard and MIT (and many other schools) use Localist for their event calendars. This application uses the official Localist JSON API to fetch events reliably and efficiently.

## Installation

1. Make sure you have Node.js installed (v14 or higher)
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

Start the server:
```bash
npm start
```

The application will:
1. Start the server on `http://localhost:3000`
2. Perform an initial fetch from all enabled sources
3. Schedule automatic updates every 2 hours

## Using the Application

### First Time Setup

1. Open your browser and go to `http://localhost:3000`
2. You'll see "No events found" - this is normal!
3. Click **"🔍 Discover Nearby"** to find universities

### Add Universities

**Option 1: Location-Based (Recommended)**
1. Click "📍 Share Location"
2. Allow location access
3. See nearby universities sorted by distance
4. Click "+ Add" on universities you want to track

**Option 2: Browse All**
1. Switch to "All Universities" tab
2. Browse the complete list of 32 universities
3. Click "+ Add" on any university

**Option 3: Search**
1. Switch to "Search" tab
2. Type university name, city, or state
3. Click "+ Add" on search results

### Manage Sources

- Click "⚙️ Settings" to toggle sources on/off
- Click "🔄 Refresh Now" to manually fetch new events
- Remove universities by clicking the "✓ Added" button in Discovery

## API Endpoints

- `GET /api/events` - Get all fetched events
- `GET /api/scrapers` - Get available scrapers and their status
- `POST /api/scrapers/:id/toggle` - Enable/disable a scraper
- `POST /api/scrape` - Manually trigger event fetching

## Project Structure

```
event-notifier/
├── server.js                 # Main Express server
├── package.json              # Dependencies
├── scrapers/
│   ├── localistScraper.js   # Generic Localist API client
│   ├── harvardScraper.js    # Harvard events (Localist)
│   ├── mitScraper.js        # MIT events (Localist)
│   ├── demoScraper.js       # Demo events generator
│   └── scraperManager.js    # Manages all scrapers
└── public/
    └── index.html           # Frontend interface
```

## Adding New Localist-Based Universities

Many universities use Localist for their event calendars. Adding a new university is simple:

### Step 1: Create a Scraper File

Create a new file in `scrapers/` (e.g., `yaleScraper.js`):

```javascript
const LocalistScraper = require('./localistScraper');

class YaleScraper extends LocalistScraper {
  constructor() {
    super(
      'Yale University',                    // Display name
      'https://calendar.yale.edu',          // Calendar URL
      {
        daysAhead: 30,  // How many days to fetch
        perPage: 100,   // Results per page (max 100)
        distinct: true  // Remove duplicates
      }
    );
  }
}

module.exports = YaleScraper;
```

### Step 2: Register the Scraper

Add it to `scraperManager.js`:

```javascript
const YaleScraper = require('./yaleScraper');

class ScraperManager {
  constructor() {
    this.availableScrapers = {
      'harvard': HarvardScraper,
      'mit': MITScraper,
      'yale': YaleScraper,  // Add your new scraper
      'demo': DemoScraper
    };

    this.activeScrapers = ['harvard', 'mit', 'yale', 'demo'];
  }
  // ...
}
```

### Step 3: Restart the Server

The new source will automatically appear in the web UI!

## Finding Localist Calendars

To find if a university uses Localist, look for:
- URLs like `calendar.university.edu` or `events.university.edu`
- Calendars powered by Localist/Concept3D
- API endpoint at `https://calendar.university.edu/api/2/events`

Common universities using Localist:
- Stanford: `https://events.stanford.edu`
- Columbia: `https://events.columbia.edu`
- Cornell: `https://events.cornell.edu`
- Duke: `https://calendar.duke.edu`
- And many more!

## Localist API Details

The generic `LocalistScraper` class handles all the API communication:

- **Endpoint**: `{calendar-url}/api/2/events`
- **Format**: JSON
- **Parameters**:
  - `days` - Number of days ahead to fetch (max 370)
  - `pp` - Results per page (max 100)
  - `distinct` - Remove duplicate events
- **Documentation**: https://developer.localist.com/doc/api

## Configuration

- **Port**: Set `PORT` environment variable (default: 3000)
- **Update Frequency**: Modify cron schedule in `server.js` (default: every 2 hours)
- **Days Ahead**: Configure in each scraper's constructor (default: 30 days)

## Network Restrictions

⚠️ **Important Note**: If you're running this in a sandboxed or restricted environment (like some cloud shells or VMs), external API access may be blocked by network policies. In such cases, only the demo events will work.

To test the full functionality with real Harvard and MIT events, run the application on your local machine or in an environment without network restrictions.

## Troubleshooting

### Getting 403 Errors from APIs

If you see 403 Forbidden errors:

1. **Network Restrictions**: Check if your environment blocks external API access
2. **Rate Limiting**: Try reducing the fetch frequency or number of results
3. **Authentication**: Some Localist instances may require authentication (rare for public calendars)

### No Events Showing

1. Check that the scraper is enabled in Settings
2. Click "Refresh Now" to manually trigger fetching
3. Check server logs for error messages
4. Verify the calendar URL is correct

## Development

To add custom event parsing or filtering:

1. Override methods in your scraper class:
   - `parseEvents()` - Custom event parsing
   - `parseDate()` - Custom date handling
   - `parseLocation()` - Custom location formatting
   - `parseDescription()` - Custom description processing

2. See `localistScraper.js` for all available methods

## License

ISC
