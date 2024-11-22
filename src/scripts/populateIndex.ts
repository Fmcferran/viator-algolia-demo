import algoliasearch from 'algoliasearch';
import { generateMockTours } from '../utils/mockDataGenerator';

const client = algoliasearch('VL18WR543G', 'c636f04b51e2f139b0c02e19c31b4bda');
const index = client.initIndex('viator_tours');

async function configureIndex() {
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
      'activityType',
      'location.city',
      'location.country',
      'rating',
      'price',
      'durationHours',
      'languages'
    ],
    customRanking: [
      'desc(rating)',
      'desc(reviewCount)',
      'asc(price)'
    ],
    attributesToHighlight: [
      'title',
      'description'
    ],
    attributesToSnippet: [
      'description:50'
    ],
    distinct: true,
    attributesToRetrieve: [
      'title',
      'description',
      'price',
      'duration',
      'durationHours',
      'activityType',
      'location',
      'rating',
      'reviewCount',
      'imageUrl',
      'included',
      'excludes',
      'highlights',
      'cancellationPolicy',
      'startTimes',
      'languages',
      'groupSize'
    ]
  });
}

async function populateIndex() {
  try {
    await configureIndex();
    
    console.log('Indexing tours...');
    const tours = generateMockTours(1000); // Generate 1,000 mock tours
    const result = await index.saveObjects(tours);
    console.log('Indexed tours successfully:', result);
    
    console.log('Successfully populated index with mock data!');
  } catch (error) {
    console.error('Error populating index:', error);
    process.exit(1);
  }
}

populateIndex();
