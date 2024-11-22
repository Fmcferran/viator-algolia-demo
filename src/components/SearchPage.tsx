import React from 'react';
import {
  SearchBox,
  Hits,
  RefinementList,
  RangeInput,
  Configure,
  connectRange,
  connectRefinementList,
  Pagination,
} from 'react-instantsearch-dom';
import { 
  Container, 
  Grid, 
  Paper, 
  Title, 
  Stack, 
  RangeSlider, 
  Box,
  Text,
  Group,
  UnstyledButton,
  Rating,
} from '@mantine/core';
import TourCard from './TourCard';
import SearchStats from './SearchStats';
import { Header } from './Header';

interface RangeProps {
  min?: number;
  max?: number;
  currentRefinement: {
    min?: number;
    max?: number;
  };
  refine: (value: { min?: number; max?: number }) => void;
}

interface RatingProps {
  items: {
    label: string;
    count: number;
    isRefined: boolean;
  }[];
  refine: (value: string) => void;
}

const DurationRangeSlider = connectRange<RangeProps>(({ min, max, currentRefinement, refine }) => {
  const handleChange = (value: [number, number]) => {
    refine({ min: value[0], max: value[1] });
  };

  return (
    <Box px="md">
      <RangeSlider
        min={min}
        max={max}
        step={0.5}
        label={(value: number) => `${value}h`}
        value={[currentRefinement.min || min || 0, currentRefinement.max || max || 12]}
        onChange={handleChange}
        marks={[
          { value: 1, label: '1h' },
          { value: 6, label: '6h' },
          { value: 12, label: '12h' },
        ]}
      />
    </Box>
  );
});

const CustomRatingMenu = connectRefinementList<RatingProps>(({ items, refine }) => {
  return (
    <Stack gap="xs">
      {[5, 4, 3, 2, 1].map((rating) => {
        const item = items.find((i) => Number(i.label) === rating);
        return (
          <UnstyledButton
            key={rating}
            onClick={() => refine(String(rating))}
            style={{ opacity: item?.isRefined ? 1 : 0.7 }}
          >
            <Group>
              <Rating value={rating} readOnly />
              <Text size="sm" c="dimmed">
                ({item?.count || 0})
              </Text>
            </Group>
          </UnstyledButton>
        );
      })}
    </Stack>
  );
});

const SearchPage = () => {
  return (
    <>
      <Header />
      <Container size="xl">
        <Grid>
          {/* Filters Column */}
          <Grid.Col span={3}>
            <Paper shadow="xs" p="md">
              <Stack>
                <div>
                  <Title order={6} mb="xs">Categories</Title>
                  <RefinementList attribute="activityType" />
                </div>

                <div>
                  <Title order={6} mb="xs">Location</Title>
                  <RefinementList attribute="location.city" />
                </div>

                <div>
                  <Title order={6} mb="xs">Duration</Title>
                  <DurationRangeSlider attribute="durationHours" min={1} max={12} />
                </div>

                <div>
                  <Title order={6} mb="xs">Price Range</Title>
                  <RangeInput attribute="price" />
                </div>

                <div>
                  <Title order={6} mb="xs">Rating</Title>
                  <CustomRatingMenu attribute="rating" />
                </div>

                <div>
                  <Title order={6} mb="xs">Languages</Title>
                  <RefinementList attribute="languages" />
                </div>
              </Stack>
            </Paper>
          </Grid.Col>

          {/* Main Content Column */}
          <Grid.Col span={9}>
            <Stack>
              <Paper shadow="xs" p="md">
                <Grid align="center">
                  <Grid.Col span={9}>
                    <SearchBox />
                  </Grid.Col>
                  <Grid.Col span={3}>
                    <SearchStats />
                  </Grid.Col>
                </Grid>
              </Paper>

              <Configure hitsPerPage={12} />
              <Hits hitComponent={TourCard} />
              <Pagination />
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
};

export default SearchPage;
