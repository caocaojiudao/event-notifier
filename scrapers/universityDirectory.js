/**
 * Directory of universities using Localist
 * Compiled from Concept3D client list and public sources
 *
 * Each entry includes:
 * - name: University name
 * - calendarUrl: Localist calendar URL
 * - location: { lat, lng } coordinates
 * - city, state: Location info
 */

const universities = [
  // Ivy League & Top Private Universities
  {
    id: 'harvard',
    name: 'Harvard University',
    calendarUrl: 'https://calendar.college.harvard.edu',
    location: { lat: 42.3744, lng: -71.1169 },
    city: 'Cambridge',
    state: 'MA'
  },
  {
    id: 'mit',
    name: 'MIT',
    calendarUrl: 'https://calendar.mit.edu',
    location: { lat: 42.3601, lng: -71.0942 },
    city: 'Cambridge',
    state: 'MA'
  },
  {
    id: 'stanford',
    name: 'Stanford University',
    calendarUrl: 'https://events.stanford.edu',
    location: { lat: 37.4275, lng: -122.1697 },
    city: 'Stanford',
    state: 'CA'
  },
  {
    id: 'columbia',
    name: 'Columbia University',
    calendarUrl: 'https://events.columbia.edu',
    location: { lat: 40.8075, lng: -73.9626 },
    city: 'New York',
    state: 'NY'
  },
  {
    id: 'cornell',
    name: 'Cornell University',
    calendarUrl: 'https://events.cornell.edu',
    location: { lat: 42.4534, lng: -76.4735 },
    city: 'Ithaca',
    state: 'NY'
  },
  {
    id: 'brown',
    name: 'Brown University',
    calendarUrl: 'https://events.brown.edu',
    location: { lat: 41.8268, lng: -71.4025 },
    city: 'Providence',
    state: 'RI'
  },
  {
    id: 'dartmouth',
    name: 'Dartmouth College',
    calendarUrl: 'https://events.dartmouth.edu',
    location: { lat: 43.7044, lng: -72.2887 },
    city: 'Hanover',
    state: 'NH'
  },
  {
    id: 'duke',
    name: 'Duke University',
    calendarUrl: 'https://calendar.duke.edu',
    location: { lat: 36.0014, lng: -78.9382 },
    city: 'Durham',
    state: 'NC'
  },
  {
    id: 'northwestern',
    name: 'Northwestern University',
    calendarUrl: 'https://events.northwestern.edu',
    location: { lat: 42.0565, lng: -87.6753 },
    city: 'Evanston',
    state: 'IL'
  },
  {
    id: 'rice',
    name: 'Rice University',
    calendarUrl: 'https://events.rice.edu',
    location: { lat: 29.7174, lng: -95.4018 },
    city: 'Houston',
    state: 'TX'
  },
  {
    id: 'vanderbilt',
    name: 'Vanderbilt University',
    calendarUrl: 'https://calendar.vanderbilt.edu',
    location: { lat: 36.1447, lng: -86.8027 },
    city: 'Nashville',
    state: 'TN'
  },

  // Major Public Universities
  {
    id: 'berkeley',
    name: 'UC Berkeley',
    calendarUrl: 'https://events.berkeley.edu',
    location: { lat: 37.8719, lng: -122.2585 },
    city: 'Berkeley',
    state: 'CA'
  },
  {
    id: 'ucla',
    name: 'UCLA',
    calendarUrl: 'https://events.ucla.edu',
    location: { lat: 34.0689, lng: -118.4452 },
    city: 'Los Angeles',
    state: 'CA'
  },
  {
    id: 'umich',
    name: 'University of Michigan',
    calendarUrl: 'https://events.umich.edu',
    location: { lat: 42.2780, lng: -83.7382 },
    city: 'Ann Arbor',
    state: 'MI'
  },
  {
    id: 'unc',
    name: 'UNC Chapel Hill',
    calendarUrl: 'https://calendar.unc.edu',
    location: { lat: 35.9049, lng: -79.0469 },
    city: 'Chapel Hill',
    state: 'NC'
  },
  {
    id: 'uva',
    name: 'University of Virginia',
    calendarUrl: 'https://events.virginia.edu',
    location: { lat: 38.0336, lng: -78.5080 },
    city: 'Charlottesville',
    state: 'VA'
  },
  {
    id: 'georgia-tech',
    name: 'Georgia Institute of Technology',
    calendarUrl: 'https://calendar.gatech.edu',
    location: { lat: 33.7756, lng: -84.3963 },
    city: 'Atlanta',
    state: 'GA'
  },
  {
    id: 'uw-seattle',
    name: 'University of Washington',
    calendarUrl: 'https://events.washington.edu',
    location: { lat: 47.6553, lng: -122.3035 },
    city: 'Seattle',
    state: 'WA'
  },

  // Additional Universities (verified Localist users)
  {
    id: 'bentley',
    name: 'Bentley University',
    calendarUrl: 'https://events.bentley.edu',
    location: { lat: 42.3884, lng: -71.2107 },
    city: 'Waltham',
    state: 'MA'
  },
  {
    id: 'lmu',
    name: 'Loyola Marymount University',
    calendarUrl: 'https://calendar.lmu.edu',
    location: { lat: 33.9689, lng: -118.4187 },
    city: 'Los Angeles',
    state: 'CA'
  },
  {
    id: 'miami-ohio',
    name: 'Miami University',
    calendarUrl: 'https://events.miamioh.edu',
    location: { lat: 39.5101, lng: -84.7330 },
    city: 'Oxford',
    state: 'OH'
  },
  {
    id: 'unomaha',
    name: 'University of Nebraska Omaha',
    calendarUrl: 'https://events.unomaha.edu',
    location: { lat: 41.2587, lng: -96.0103 },
    city: 'Omaha',
    state: 'NE'
  },
  {
    id: 'und',
    name: 'University of North Dakota',
    calendarUrl: 'https://events.und.edu',
    location: { lat: 47.9225, lng: -97.0714 },
    city: 'Grand Forks',
    state: 'ND'
  },
  {
    id: 'pacific',
    name: 'University of the Pacific',
    calendarUrl: 'https://calendar.pacific.edu',
    location: { lat: 37.9816, lng: -121.3102 },
    city: 'Stockton',
    state: 'CA'
  },
  {
    id: 'gsu',
    name: 'Georgia State University',
    calendarUrl: 'https://calendar.gsu.edu',
    location: { lat: 33.7537, lng: -84.3863 },
    city: 'Atlanta',
    state: 'GA'
  },
  {
    id: 'bu',
    name: 'Boston University',
    calendarUrl: 'https://calendar.bu.edu',
    location: { lat: 42.3505, lng: -71.1054 },
    city: 'Boston',
    state: 'MA'
  },
  {
    id: 'northeastern',
    name: 'Northeastern University',
    calendarUrl: 'https://events.northeastern.edu',
    location: { lat: 42.3398, lng: -71.0892 },
    city: 'Boston',
    state: 'MA'
  },
  {
    id: 'tufts',
    name: 'Tufts University',
    calendarUrl: 'https://events.tufts.edu',
    location: { lat: 42.4085, lng: -71.1183 },
    city: 'Medford',
    state: 'MA'
  },
  {
    id: 'cmu',
    name: 'Carnegie Mellon University',
    calendarUrl: 'https://events.cmu.edu',
    location: { lat: 40.4433, lng: -79.9436 },
    city: 'Pittsburgh',
    state: 'PA'
  },
  {
    id: 'usc',
    name: 'University of Southern California',
    calendarUrl: 'https://events.usc.edu',
    location: { lat: 34.0224, lng: -118.2851 },
    city: 'Los Angeles',
    state: 'CA'
  },
  {
    id: 'nyu',
    name: 'New York University',
    calendarUrl: 'https://events.nyu.edu',
    location: { lat: 40.7295, lng: -73.9965 },
    city: 'New York',
    state: 'NY'
  },
  {
    id: 'emory',
    name: 'Emory University',
    calendarUrl: 'https://events.emory.edu',
    location: { lat: 33.7920, lng: -84.3240 },
    city: 'Atlanta',
    state: 'GA'
  }
];

module.exports = universities;
