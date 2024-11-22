# Viator Algolia Search Demo

This project demonstrates how Algolia can enhance Viator's search and discovery experiences, taking inspiration from AllTrails' user interface.

## Features

- Instant search with typo tolerance and synonym matching
- Faceted navigation for filtering tours
- Dynamic re-ranking based on user interactions
- Personalized search results
- Geographic search capabilities
- Clean and intuitive interface inspired by AllTrails

## Technologies Used

- React with TypeScript
- Algolia JavaScript API Client
- InstantSearch UI Library
- Mantine UI Components
- React Map GL (for map integration)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your Algolia credentials:
   ```
   REACT_APP_ALGOLIA_APP_ID=your_app_id
   REACT_APP_ALGOLIA_ADMIN_API_KEY=your_admin_api_key
   REACT_APP_ALGOLIA_SEARCH_API_KEY=your_search_api_key
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Project Structure

- `/src/components`: React components
- `/src/services`: Service layer (Algolia configuration)
- `/src/types`: TypeScript type definitions
- `/src/utils`: Utility functions

## Development

The project includes a mock data generator that creates realistic tour data for development purposes. To populate your Algolia index with mock data:

1. Update the Algolia credentials in `src/services/algoliaService.ts`
2. Use the `generateMockTours` and `indexTours` functions from the mock data generator

## Deployment

The project is configured for deployment on Netlify. To deploy:

1. Create a new site on Netlify
2. Connect your repository
3. Add your Algolia environment variables in Netlify's settings
4. Deploy!

## Features to Add

- [ ] Map integration for geographic search
- [ ] More sophisticated personalization rules
- [ ] Advanced filtering options
- [ ] Tour booking simulation
- [ ] Analytics dashboard

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
