# Localist API Integration Guide

## What Changed

Your Event Notifier has been upgraded to use the **official Localist API** instead of web scraping! This makes it:

✅ More reliable
✅ Faster
✅ Compliant with university terms of service
✅ Easier to extend to new universities

## Architecture

### Generic Localist Scraper (`localistScraper.js`)

A reusable class that works with **any** university using Localist:

```javascript
const LocalistScraper = require('./localistScraper');

class UniversityScraper extends LocalistScraper {
  constructor() {
    super(
      'University Name',
      'https://calendar.university.edu',
      {
        daysAhead: 30,   // Fetch next 30 days
        perPage: 100,    // Max results
        distinct: true   // Remove duplicates
      }
    );
  }
}
```

### Current Implementations

**Harvard** (`harvardScraper.js`)
- API: `https://calendar.college.harvard.edu/api/2/events`
- Fetches events from Harvard College Calendar

**MIT** (`mitScraper.js`)
- API: `https://calendar.mit.edu/api/2/events`
- Fetches events from MIT Events Calendar

## How It Works

1. **API Call**: Each scraper makes a GET request to `/api/2/events`
2. **Parameters**: Sends `days`, `pp` (per page), and `distinct` params
3. **JSON Response**: Receives structured event data
4. **Parsing**: Converts Localist format to our standard format
5. **Caching**: Stores events in memory until next refresh

## Localist Event Format

The API returns events in this structure:

```json
{
  "events": [
    {
      "event": {
        "id": 123456,
        "title": "Event Title",
        "description": "HTML description",
        "description_text": "Plain text description",
        "location_name": "Building Name",
        "room_number": "Room 123",
        "event_instances": [
          {
            "event_instance": {
              "start": "2026-02-15T14:00:00-05:00",
              "end": "2026-02-15T16:00:00-05:00"
            }
          }
        ],
        "localist_url": "https://calendar.edu/event/123456",
        "tags": ["workshop", "technology"],
        "event_types": [{"name": "Workshop"}]
      }
    }
  ]
}
```

## Adding New Universities

### Step-by-Step Guide

1. **Find the Localist Calendar URL**
   - Look for: `calendar.university.edu` or `events.university.edu`
   - Test the API: `https://calendar.university.edu/api/2/events`

2. **Create Scraper File**
   ```bash
   touch scrapers/stanfordScraper.js
   ```

3. **Write the Scraper**
   ```javascript
   const LocalistScraper = require('./localistScraper');

   class StanfordScraper extends LocalistScraper {
     constructor() {
       super(
         'Stanford University',
         'https://events.stanford.edu',
         {
           daysAhead: 30,
           perPage: 100,
           distinct: true
         }
       );
     }
   }

   module.exports = StanfordScraper;
   ```

4. **Register in ScraperManager**
   ```javascript
   // In scraperManager.js
   const StanfordScraper = require('./stanfordScraper');

   this.availableScrapers = {
     'harvard': HarvardScraper,
     'mit': MITScraper,
     'stanford': StanfordScraper,  // Add here
     'demo': DemoScraper
   };

   this.activeScrapers = ['harvard', 'mit', 'stanford', 'demo'];
   ```

5. **Restart Server**
   ```bash
   npm start
   ```

The new source will appear in the Settings UI automatically!

## Universities Using Localist

Many top universities use Localist. Here are some common ones:

| University | Calendar URL |
|------------|--------------|
| Stanford | https://events.stanford.edu |
| Columbia | https://events.columbia.edu |
| Cornell | https://events.cornell.edu |
| Duke | https://calendar.duke.edu |
| Northwestern | https://events.northwestern.edu |
| Rice | https://events.rice.edu |
| Vanderbilt | https://calendar.vanderbilt.edu |
| Brown | https://events.brown.edu |
| Dartmouth | https://events.dartmouth.edu |

## Customization Options

### Configuration Parameters

```javascript
{
  daysAhead: 30,      // Days into future (max 370)
  perPage: 100,       // Results per page (max 100)
  distinct: true      // Remove duplicates
}
```

### Custom Parsing

Override methods for custom behavior:

```javascript
class CustomScraper extends LocalistScraper {
  constructor() {
    super('Custom University', 'https://calendar.custom.edu');
  }

  // Custom location formatting
  parseLocation(event) {
    const location = super.parseLocation(event);
    return `Campus: ${location}`;
  }

  // Custom description handling
  parseDescription(event) {
    const desc = super.parseDescription(event);
    // Add custom processing
    return desc;
  }

  // Custom date parsing
  parseDate(event) {
    // Your custom logic
    return super.parseDate(event);
  }
}
```

## API Reference

### Localist API Endpoints

**Base URL**: `{calendar-url}/api/2/`

**Events Endpoint**: `/events`

**Query Parameters**:
- `days` - Number of days ahead to fetch (max 370)
- `pp` - Results per page (1-100, default 10)
- `distinct` - Remove duplicate events (true/false)
- `start` - Start date (YYYY-MM-DD)
- `end` - End date (YYYY-MM-DD)

**Example Request**:
```
GET https://calendar.college.harvard.edu/api/2/events?days=30&pp=100&distinct=true
```

**Official Documentation**: https://developer.localist.com/doc/api

## Troubleshooting

### 403 Forbidden Error

**Cause**: Network restrictions in your environment

**Solution**: Run the application on your local machine or in an unrestricted environment

**Test**: `curl https://calendar.college.harvard.edu/api/2/events`

### No Events Returned

**Check**:
1. Is the calendar URL correct?
2. Does the API endpoint exist?
3. Are events published for the date range?
4. Is the scraper enabled in Settings?

**Debug**:
```javascript
// Add to scraper constructor
console.log('API URL:', this.apiUrl);
```

### Rate Limiting

**Symptoms**: 429 Too Many Requests errors

**Solution**:
- Reduce fetch frequency in `server.js`
- Reduce `perPage` value
- Increase time between requests

## Testing Your Scraper

### Manual Test

```bash
# In Node.js console
const Scraper = require('./scrapers/yourScraper');
const scraper = new Scraper();

scraper.scrape().then(events => {
  console.log(`Found ${events.length} events`);
  console.log(events[0]);
});
```

### Test API Endpoint

```bash
# Test if API is accessible
curl "https://calendar.university.edu/api/2/events?pp=5" | jq

# Check response format
curl -I "https://calendar.university.edu/api/2/events"
```

## Benefits Over Web Scraping

| Aspect | Web Scraping | Localist API |
|--------|--------------|--------------|
| Reliability | ❌ Breaks when HTML changes | ✅ Stable JSON format |
| Speed | ❌ Slow (parse HTML) | ✅ Fast (structured data) |
| Accuracy | ❌ May miss elements | ✅ Complete data |
| Compliance | ⚠️ May violate ToS | ✅ Official method |
| Maintenance | ❌ Constant updates needed | ✅ Set and forget |

## Next Steps

1. **Test locally** to verify Harvard/MIT APIs work without network restrictions
2. **Add more universities** using the guide above
3. **Customize parsing** for specific event types or formatting
4. **Deploy** to a production environment for 24/7 availability

## Resources

- [Localist API Documentation](https://developer.localist.com/doc/api)
- [Localist Platform Info](https://www.localist.com/)
- [Event Notifier README](README.md)
