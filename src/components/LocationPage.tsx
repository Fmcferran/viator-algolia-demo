import React from 'react';
import {
  Configure,
  Hits,
  TrendingItems,
  FrequentlyBoughtTogether,
  useInstantSearch,
} from 'react-instantsearch';
import {
  Container,
  Title,
  Text,
  Group,
  Paper,
  Stack,
  Box,
  Image,
  Divider,
  Badge,
} from '@mantine/core';
import { Header } from './Header';
import TourCard from './TourCard';

interface LocationInfo {
  name: string;
  country: string;
  description: string;
  imageUrl: string;
  highlights: string[];
}

const WHISTLER_INFO: LocationInfo = {
  name: 'Whistler',
  country: 'Canada',
  description: 'A world-famous resort town and outdoor recreation hub, Whistler is located in the Coast Mountains of British Columbia. Known for its exceptional skiing and snowboarding in winter, and mountain biking and hiking in summer, Whistler hosted many events during the 2010 Winter Olympics.',
  imageUrl: 'https://images.unsplash.com/photo-1587982649760-70c2f63573b2?q=80&w=1280&h=720&fit=crop',
  highlights: [
    'World-class skiing and snowboarding',
    'Mountain biking trails',
    'Scenic hiking paths',
    'Peak 2 Peak Gondola',
    'Vibrant village atmosphere',
    'Olympic legacy venues'
  ]
};

const LocationHero = ({ info }: { info: LocationInfo }) => (
  <Box 
    style={{ 
      position: 'relative',
      height: 400,
      marginBottom: '2rem',
      borderRadius: '8px',
      overflow: 'hidden'
    }}
  >
    <Image
      src={info.imageUrl}
      alt={info.name}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }}
    />
    <Box
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
        padding: '2rem',
        color: 'white',
      }}
    >
      <Title order={1}>{info.name}</Title>
      <Text size="lg" mt="xs">{info.country}</Text>
    </Box>
  </Box>
);

const HighlightsSection = ({ highlights }: { highlights: string[] }) => (
  <Paper shadow="sm" p="xl" radius="md" mb="xl">
    <Title order={3} mb="md">Destination Highlights</Title>
    <Group gap="sm">
      {highlights.map((highlight, index) => (
        <Badge 
          key={index} 
          size="lg" 
          variant="light" 
          color="blue"
          style={{ 
            padding: '0.5rem 1rem',
            fontSize: '1rem' 
          }}
        >
          {highlight}
        </Badge>
      ))}
    </Group>
  </Paper>
);

const TrendingSection = () => (
  <Paper shadow="sm" p="xl" radius="md" mb="xl">
    <Title order={3} mb="md">Trending in Whistler</Title>
    <TrendingItems
      recommendClient={{
        appId: 'VL18WR543G',
        apiKey: '80cf6645cac35a277341566edba38427',
        indexName: 'viator_tours',
      }}
      maxRecommendations={4}
      fallbackParameters={{
        facetFilters: ['location:Whistler'],
        sortBy: ['rating:desc', 'reviewCount:desc']
      }}
      hitComponent={TourCard}
    />
  </Paper>
);

const RecommendedSection = () => (
  <Paper shadow="sm" p="xl" radius="md" mb="xl">
    <Title order={3} mb="md">Recommended Experiences</Title>
    <FrequentlyBoughtTogether
      recommendClient={{
        appId: 'VL18WR543G',
        apiKey: '80cf6645cac35a277341566edba38427',
        indexName: 'viator_tours',
      }}
      maxRecommendations={4}
      fallbackParameters={{
        facetFilters: ['location:Whistler'],
        sortBy: ['popularity:desc']
      }}
      hitComponent={TourCard}
    />
  </Paper>
);

const AllToursSection = () => (
  <Paper shadow="sm" p="xl" radius="md">
    <Title order={3} mb="md">All Whistler Tours & Activities</Title>
    <Configure
      filters="location:Whistler"
      hitsPerPage={12}
    />
    <Hits hitComponent={TourCard} />
  </Paper>
);

export const LocationPage: React.FC = () => {
  return (
    <Box bg="#F2F2F2" style={{ minHeight: '100vh' }}>
      <Header />
      <Container size="xl">
        <LocationHero info={WHISTLER_INFO} />
        <Stack>
          <HighlightsSection highlights={WHISTLER_INFO.highlights} />
          <Text size="lg" c="dimmed" mb="xl">{WHISTLER_INFO.description}</Text>
          <TrendingSection />
          <RecommendedSection />
          <AllToursSection />
        </Stack>
      </Container>
    </Box>
  );
};
