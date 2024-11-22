import React from 'react';
import { Card, Image, Text, Badge, Group, Button, Box } from '@mantine/core';
import { Tour } from '../types/tour';

interface TourCardProps {
  hit: Tour;
}

const TourCard: React.FC<TourCardProps> = ({ hit }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={hit.imageUrl}
          height={160}
          alt={hit.title}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{hit.title}</Text>
        <Badge color="blue" variant="light">
          {hit.activityType}
        </Badge>
      </Group>

      <Text size="sm" c="dimmed">
        {hit.description}
      </Text>

      <Group justify="space-between" mt="md">
        <Box>
          <Text fw={500}>${hit.price}</Text>
          <Text size="xs" c="dimmed">per person</Text>
        </Box>
        <Box>
          <Text fw={500}>{hit.duration}</Text>
          <Text size="xs" c="dimmed">duration</Text>
        </Box>
        <Box>
          <Text fw={500}>{hit.rating}★</Text>
          <Text size="xs" c="dimmed">{hit.reviewCount} reviews</Text>
        </Box>
      </Group>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        View Details
      </Button>
    </Card>
  );
};

export default TourCard;
