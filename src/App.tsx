import React from 'react';
import { MantineProvider, createTheme } from '@mantine/core';
import { InstantSearch } from 'react-instantsearch-dom';
import { searchClient } from './services/algoliaService';
import SearchPage from './components/SearchPage';
import '@mantine/core/styles.css';
import './styles/search.css';

const theme = createTheme({
  primaryColor: 'blue',
  colors: {
    blue: [
      '#E5F3FF',
      '#CCE4FF',
      '#99C9FF',
      '#66ADFF',
      '#3392FF',
      '#006CE4', // Primary
      '#0056B3',
      '#004C9E',
      '#003A7A',
      '#002857',
    ],
  },
});

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error);
    console.error('Error info:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20 }}>
          <h1>Something went wrong.</h1>
          <pre>{this.state.error?.toString()}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  console.log('App rendering...');
  return (
    <ErrorBoundary>
      <MantineProvider theme={theme}>
        <InstantSearch 
          searchClient={searchClient}
          indexName="viator_tours"
        >
          <SearchPage />
        </InstantSearch>
      </MantineProvider>
    </ErrorBoundary>
  );
}

export default App;
