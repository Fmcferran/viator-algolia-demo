import algoliasearch from 'algoliasearch';
import { Tour } from '../types/tour';

// Replace these with your actual Algolia credentials
const APP_ID = 'VL18WR543G';
const ADMIN_API_KEY = 'c636f04b51e2f139b0c02e19c31b4bda';
const SEARCH_API_KEY = '80cf6645cac35a277341566edba38427';

// Initialize the Algolia client
const adminClient = algoliasearch(APP_ID, ADMIN_API_KEY);
export const searchClient = algoliasearch(APP_ID, SEARCH_API_KEY);

// Initialize the index
const index = adminClient.initIndex('viator_tours');

// Configure the index settings
export const configureIndex = async () => {
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
      'duration',
      'location.city',
      'location.country',
      'languages',
      'price'
    ],
    customRanking: [
      'desc(rating)',
      'desc(reviewCount)'
    ],
    attributesToSnippet: [
      'description:50'
    ],
    snippetEllipsisText: '...',
  });
};

// Function to index tours
export const indexTours = async (tours: Tour[]) => {
  try {
    const result = await index.saveObjects(tours);
    console.log('Indexed tours successfully:', result);
    return result;
  } catch (error) {
    console.error('Error indexing tours:', error);
    throw error;
  }
};

// Function to simulate user interactions
export const simulateUserInteraction = async (objectID: string, eventType: 'click' | 'conversion') => {
  try {
    // In a real application, you would use the Insights API to track events
    console.log(`Simulated ${eventType} event for tour ${objectID}`);
  } catch (error) {
    console.error('Error simulating user interaction:', error);
    throw error;
  }
};
