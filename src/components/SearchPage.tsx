import React from 'react';
import {
  SearchBox,
  Hits,
  RefinementList,
  connectRange,
  connectRefinementList,
  Configure,
  Pagination,
} from 'react-instantsearch-dom';
import { 
  Container, 
  Grid, 
  Paper, 
  Title, 
  Stack, 
  Box,
  Text,
  Group,
  UnstyledButton,
  Rating,
  NumberInput
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

const DurationRangeInput = connectRange<RangeProps>(({ min, max, currentRefinement, refine }) => {
  const [inputValues, setInputValues] = React.useState({
    min: currentRefinement.min || '',
    max: currentRefinement.max || '',
  });

  React.useEffect(() => {
    setInputValues({
      min: currentRefinement.min || '',
      max: currentRefinement.max || '',
    });
  }, [currentRefinement]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    refine({
      min: inputValues.min === '' ? undefined : Number(inputValues.min),
      max: inputValues.max === '' ? undefined : Number(inputValues.max),
    });
  };

  return (
    <Box px="md">
      <form onSubmit={handleSubmit}>
        <Group>
          <NumberInput
            value={inputValues.min}
            onChange={(value) => setInputValues({ ...inputValues, min: value || '' })}
            placeholder="Min hours"
            min={min}
            max={max}
            step={0.5}
            w={100}
          />
          <Text>to</Text>
          <NumberInput
            value={inputValues.max}
            onChange={(value) => setInputValues({ ...inputValues, max: value || '' })}
            placeholder="Max hours"
            min={min}
            max={max}
            step={0.5}
            w={100}
          />
          <button type="submit" style={{ display: 'none' }}>Apply</button>
        </Group>
      </form>
    </Box>
  );
});

const PriceRangeInput = connectRange(({ min, max, currentRefinement, refine }) => {
  const [inputValues, setInputValues] = React.useState({
    min: currentRefinement.min || '',
    max: currentRefinement.max || '',
  });

  React.useEffect(() => {
    setInputValues({
      min: currentRefinement.min || '',
      max: currentRefinement.max || '',
    });
  }, [currentRefinement]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    refine({
      min: inputValues.min === '' ? undefined : Number(inputValues.min),
      max: inputValues.max === '' ? undefined : Number(inputValues.max),
    });
  };

  return (
    <Box px="md">
      <form onSubmit={handleSubmit}>
        <Group>
          <NumberInput
            value={inputValues.min}
            onChange={(value) => setInputValues({ ...inputValues, min: value || '' })}
            placeholder="Min price"
            min={min}
            max={max}
            step={10}
            w={100}
            prefix="$"
          />
          <Text>to</Text>
          <NumberInput
            value={inputValues.max}
            onChange={(value) => setInputValues({ ...inputValues, max: value || '' })}
            placeholder="Max price"
            min={min}
            max={max}
            step={10}
            w={100}
            prefix="$"
          />
          <button type="submit" style={{ display: 'none' }}>Apply</button>
        </Group>
      </form>
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
                  <DurationRangeInput attribute="durationHours" min={1} max={12} />
                </div>

                <div>
                  <Title order={6} mb="xs">Price Range</Title>
                  <PriceRangeInput attribute="price" min={0} max={1000} />
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
