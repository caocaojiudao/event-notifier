const BaseScraper = require('./baseScraper');

class DemoScraper extends BaseScraper {
  constructor() {
    super('Demo Events', 'https://example.com/events');
  }

  async scrape() {
    // Generate sample events to demonstrate the application
    const now = new Date();
    const events = [];

    // Event 1: Today
    events.push(this.createEvent(
      'Introduction to Quantum Computing',
      new Date(now.getTime() + 3 * 60 * 60 * 1000).toISOString(), // 3 hours from now
      'Science Center Hall A',
      'Join us for an introductory lecture on quantum computing principles and applications. Learn about qubits, superposition, and entanglement.',
      'https://example.com/events/quantum-computing'
    ));

    // Event 2: Tomorrow
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(14, 0, 0, 0);
    events.push(this.createEvent(
      'AI Ethics Panel Discussion',
      tomorrow.toISOString(),
      'Technology Auditorium',
      'A panel of experts will discuss the ethical implications of artificial intelligence and machine learning in modern society.',
      'https://example.com/events/ai-ethics'
    ));

    // Event 3: In 3 days
    const threeDays = new Date(now);
    threeDays.setDate(threeDays.getDate() + 3);
    threeDays.setHours(18, 30, 0, 0);
    events.push(this.createEvent(
      'Startup Pitch Competition Finals',
      threeDays.toISOString(),
      'Innovation Center',
      'Watch student entrepreneurs pitch their startup ideas to a panel of venture capitalists. Prizes include funding and mentorship.',
      'https://example.com/events/startup-pitch'
    ));

    // Event 4: Next week
    const nextWeek = new Date(now);
    nextWeek.setDate(nextWeek.getDate() + 7);
    nextWeek.setHours(19, 0, 0, 0);
    events.push(this.createEvent(
      'Guest Lecture: Future of Biotechnology',
      nextWeek.toISOString(),
      'Medical School Lecture Hall',
      'Distinguished speaker Dr. Jane Smith presents cutting-edge research in CRISPR technology and gene editing.',
      'https://example.com/events/biotech-lecture'
    ));

    // Event 5: In 10 days
    const tenDays = new Date(now);
    tenDays.setDate(tenDays.getDate() + 10);
    tenDays.setHours(16, 0, 0, 0);
    events.push(this.createEvent(
      'Career Fair: Tech Companies',
      tenDays.toISOString(),
      'Student Center',
      'Meet recruiters from top tech companies including Google, Microsoft, Apple, and Amazon. Bring your resume!',
      'https://example.com/events/career-fair'
    ));

    // Event 6: In 14 days
    const twoWeeks = new Date(now);
    twoWeeks.setDate(twoWeeks.getDate() + 14);
    twoWeeks.setHours(20, 0, 0, 0);
    events.push(this.createEvent(
      'Spring Concert: Student Orchestra',
      twoWeeks.toISOString(),
      'Memorial Hall',
      'Enjoy an evening of classical music performed by talented student musicians. Free admission with student ID.',
      'https://example.com/events/spring-concert'
    ));

    console.log(`Generated ${events.length} demo events`);
    return events;
  }
}

module.exports = DemoScraper;
