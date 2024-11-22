import algoliasearch from 'algoliasearch';
import { generateMockTours } from '../utils/mockDataGenerator';

const APP_ID = 'VL18WR543G';
const ADMIN_API_KEY = 'c636f04b51e2f139b0c02e19c31b4bda';
const INDEX_NAME = 'viator_tours';

const client = algoliasearch(APP_ID, ADMIN_API_KEY);
const index = client.initIndex(INDEX_NAME);

const seedAlgolia = async () => {
  try {
    console.log('Generating mock tours...');
    const tours = generateMockTours(1000);

    console.log('Configuring index settings...');
    await index.setSettings({
      searchableAttributes: [
        'title',
        'description',
        'activityType',
        'location.city',
        'location.country'
      ],
      attributesForFaceting: [
        'searchable(activityType)',
        'searchable(location.city)',
        'searchable(location.country)',
        'searchable(languages)',
        'price',
        'durationHours',
        'rating'
      ],
      customRanking: [
        'desc(rating)',
        'desc(reviewCount)'
      ]
    });

    console.log('Sending tours to Algolia...');
    const { objectIDs } = await index.saveObjects(tours);
    console.log(`Successfully indexed ${objectIDs.length} tours!`);

  } catch (error) {
    console.error('Error seeding Algolia:', error);
  }
};

// Run the script
seedAlgolia();
