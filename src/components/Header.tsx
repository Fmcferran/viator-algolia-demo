import React from 'react';
import { Container, Group, Image, Text, Box } from '@mantine/core';
import logo from '../assets/logo.svg';

export function Header() {
  return (
    <Box 
      component="header" 
      bg="white" 
      mb="md"
      style={{
        height: 70,
        borderBottom: '1px solid #e9ecef'
      }}
    >
      <Container size="xl" h="100%">
        <Group justify="space-between" h="100%">
          <Group>
            <Image
              src={logo}
              alt="Viator Logo"
              w={120}
            />
            <Text 
              size="sm" 
              c="dimmed"
              style={{ 
                borderLeft: '1px solid #e9ecef',
                paddingLeft: '1rem',
                marginLeft: '0.5rem'
              }}
            >
              A Tripadvisor company
            </Text>
          </Group>
          <Group>
            <Text 
              size="sm" 
              c="#2A2A2A" 
              fw={500}
              style={{ cursor: 'pointer' }}
            >
              List your tours
            </Text>
            <Text 
              size="sm" 
              c="#2A22A" 
              fw={500}
              style={{ cursor: 'pointer' }}
            >
              Help
            </Text>
          </Group>
        </Group>
      </Container>
    </Box>
  );
}
