import React from 'react';
import { connectStats } from 'react-instantsearch-dom';
import { Text } from '@mantine/core';

const SearchStats = ({ nbHits, processingTimeMS }: { nbHits: number; processingTimeMS: number }) => {
  return (
    <Text size="sm" color="dimmed">
      {nbHits.toLocaleString()} results found in {processingTimeMS}ms
    </Text>
  );
};

export default connectStats(SearchStats);
