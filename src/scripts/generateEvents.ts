import algoliasearch from 'algoliasearch';
import searchInsights from 'search-insights';

const APP_ID = 'VL18WR543G';
const API_KEY = '80cf6645cac35a277341566edba38427';
const INDEX_NAME = 'viator_tours';

const client = algoliasearch(APP_ID, API_KEY);
const index = client.initIndex(INDEX_NAME);

// Initialize the insights client
searchInsights('init', {
  appId: APP_ID,
  apiKey: API_KEY,
});

interface AlgoliaEvent {
  eventType: 'view' | 'click' | 'conversion';
  eventName: string;
  index: string;
  userToken: string;
  objectIDs: string[];
}

interface TourHit {
  objectID: string;
  title: string;
  location: string;
  [key: string]: any;
}

// Get all Whistler tours
const getWhistlerTours = async (): Promise<TourHit[]> => {
  const { hits } = await index.search<TourHit>('', {
    filters: 'location.city:Whistler',
    hitsPerPage: 100,
  });
  return hits;
};

// Generate random user tokens
const generateUserToken = () => `user_${Math.random().toString(36).substring(7)}`;

// Generate events for a single tour
const generateEventsForTour = async (objectID: string, popularity: number): Promise<AlgoliaEvent[]> => {
  const events: AlgoliaEvent[] = [];
  const numEvents = Math.floor(popularity * 100); // More popular tours get more events

  for (let i = 0; i < numEvents; i++) {
    const userToken = generateUserToken();
    const eventType = Math.random();

    // View event (50% chance)
    if (eventType < 0.5) {
      events.push({
        eventType: 'view',
        eventName: 'Product Viewed',
        index: INDEX_NAME,
        userToken,
        objectIDs: [objectID],
      });
    }
    // Click event (30% chance)
    else if (eventType < 0.8) {
      events.push({
        eventType: 'click',
        eventName: 'Product Clicked',
        index: INDEX_NAME,
        userToken,
        objectIDs: [objectID],
      });
    }
    // Conversion event (20% chance)
    else {
      events.push({
        eventType: 'conversion',
        eventName: 'Product Purchased',
        index: INDEX_NAME,
        userToken,
        objectIDs: [objectID],
      });
    }
  }

  return events;
};

// Generate related purchase events
const generateRelatedPurchases = async (tours: TourHit[]): Promise<AlgoliaEvent[]> => {
  const events: AlgoliaEvent[] = [];
  const numPairs = 50;

  for (let i = 0; i < numPairs; i++) {
    const userToken = generateUserToken();
    const tour1 = tours[Math.floor(Math.random() * tours.length)];
    const tour2 = tours[Math.floor(Math.random() * tours.length)];

    if (tour1?.objectID && tour2?.objectID && tour1.objectID !== tour2.objectID) {
      events.push({
        eventType: 'conversion',
        eventName: 'Product Purchased',
        index: INDEX_NAME,
        userToken,
        objectIDs: [tour1.objectID, tour2.objectID],
      });
    }
  }

  return events;
};

// Main function to generate all events
const generateAllEvents = async () => {
  try {
    console.log('Fetching Whistler tours...');
    const tours = await getWhistlerTours();
    
    if (!tours || tours.length === 0) {
      throw new Error('No tours found for Whistler');
    }

    console.log(`Found ${tours.length} tours for Whistler`);
    console.log('Generating events...');
    const allEvents: AlgoliaEvent[] = [];

    // Generate individual tour events
    for (const tour of tours) {
      if (!tour.objectID) continue;
      const popularity = Math.random(); // Random popularity score
      const events = await generateEventsForTour(tour.objectID, popularity);
      allEvents.push(...events);
    }

    // Generate related purchase events
    const relatedEvents = await generateRelatedPurchases(tours);
    allEvents.push(...relatedEvents);

    console.log(`Sending ${allEvents.length} events to Algolia...`);
    
    // Send events in batches
    const batchSize = 1000;
    for (let i = 0; i < allEvents.length; i += batchSize) {
      const batch = allEvents.slice(i, i + batchSize);
      await Promise.all(batch.map(event => {
        return searchInsights('sendEvents', [event]);
      }));
    }

    console.log('Successfully generated events!');
  } catch (error) {
    console.error('Error generating events:', error);
  }
};

// Run the script
generateAllEvents();
