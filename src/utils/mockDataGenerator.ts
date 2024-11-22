import { Tour } from '../types/tour';

const activityTypes = [
  'Walking Tour',
  'Food & Drink',
  'Adventure',
  'Cultural',
  'Historical',
  'Nature',
  'Water Sports',
  'Day Trip',
  'Photography',
  'Wine Tasting',
  'Cooking Class',
  'Museum Tour',
  'Street Art',
  'Bike Tour',
  'Sunset Cruise',
  'Wildlife',
  'Architecture',
  'Local Markets',
  'Night Tour',
  'Workshop',
  'Skiing',
  'Snowboarding',
  'Snowshoeing',
  'Ice Skating',
  'Winter Sports'
];

const cities = [
  { city: 'Paris', country: 'France', lat: 48.8566, lng: 2.3522 },
  { city: 'Rome', country: 'Italy', lat: 41.9028, lng: 12.4964 },
  { city: 'Barcelona', country: 'Spain', lat: 41.3851, lng: 2.1734 },
  { city: 'Amsterdam', country: 'Netherlands', lat: 52.3676, lng: 4.9041 },
  { city: 'London', country: 'United Kingdom', lat: 51.5074, lng: -0.1278 },
  { city: 'Tokyo', country: 'Japan', lat: 35.6762, lng: 139.6503 },
  { city: 'New York', country: 'United States', lat: 40.7128, lng: -74.0060 },
  { city: 'Sydney', country: 'Australia', lat: -33.8688, lng: 151.2093 },
  { city: 'Dubai', country: 'UAE', lat: 25.2048, lng: 55.2708 },
  { city: 'Singapore', country: 'Singapore', lat: 1.3521, lng: 103.8198 },
  { city: 'Istanbul', country: 'Turkey', lat: 41.0082, lng: 28.9784 },
  { city: 'Prague', country: 'Czech Republic', lat: 50.0755, lng: 14.4378 },
  { city: 'Venice', country: 'Italy', lat: 45.4408, lng: 12.3155 },
  { city: 'Bangkok', country: 'Thailand', lat: 13.7563, lng: 100.5018 },
  { city: 'Berlin', country: 'Germany', lat: 52.5200, lng: 13.4050 },
  { city: 'Whistler', country: 'Canada', lat: 50.1163, lng: -122.9574 },
  { city: 'Aspen', country: 'United States', lat: 39.1911, lng: -106.8175 },
  { city: 'Zermatt', country: 'Switzerland', lat: 46.0207, lng: 7.7491 },
  { city: 'Queenstown', country: 'New Zealand', lat: -45.0312, lng: 168.6626 },
  { city: 'Chamonix', country: 'France', lat: 45.9237, lng: 6.8694 }
];

const languages = ['English', 'Spanish', 'French', 'German', 'Italian', 'Japanese', 'Chinese', 'Arabic', 'Portuguese', 'Russian'];

const tourImages = [
  'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800',
  'https://images.unsplash.com/photo-1493707553966-283afac8c358?w=800',
  'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=800',
  'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800',
  'https://images.unsplash.com/photo-1531816458010-fb7685eecbcb?w=800',
  'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800',
  'https://images.unsplash.com/photo-1504512485720-7d83a16ee930?w=800',
  'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800',
  'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800',
  'https://images.unsplash.com/photo-1534237710431-e2fc698436d0?w=800',
  'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=800',
  'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800',
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800',
  'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
  'https://images.unsplash.com/photo-1495562569060-2eec283d3391?w=800'
];

const tourDescriptions = [
  "Discover the hidden gems of {city} with our expert local guides.",
  "Experience the best of {city}'s culture, history, and cuisine.",
  "Explore {city} like a local on this intimate small-group tour.",
  "Uncover the secrets of {city}'s most iconic landmarks.",
  "Immerse yourself in the rich history and culture of {city}.",
  "Journey through time in the historic streets of {city}.",
  "Taste your way through {city}'s culinary delights.",
  "Adventure awaits in the heart of {city}.",
  "Capture stunning photos of {city}'s most picturesque spots.",
  "Discover the authentic charm of {city} on this guided experience."
];

const highlights = [
  "Skip-the-line access to major attractions",
  "Expert local guide",
  "Small group experience",
  "Insider tips and recommendations",
  "Photo opportunities at iconic locations",
  "Authentic local experiences",
  "Convenient meeting point",
  "Flexible booking options",
  "Personalized attention",
  "Hidden gems off the tourist track",
  "Traditional food tastings",
  "Cultural demonstrations",
  "Historical commentary",
  "Interactive experiences",
  "Scenic viewpoints"
];

const included = [
  "Professional guide",
  "Hotel pickup and drop-off",
  "All entrance fees",
  "Food tastings",
  "Bottled water",
  "Equipment rental",
  "Safety briefing",
  "Insurance",
  "Souvenir photos",
  "Local taxes"
];

const excludes = [
  "Gratuities",
  "Additional food and drinks",
  "Personal expenses",
  "Hotel pickup and drop-off",
  "Optional activities",
  "Transportation to meeting point",
  "Travel insurance",
  "Souvenirs",
  "Professional photos"
];

const generateRandomTour = (id: number): Tour => {
  const location = cities[Math.floor(Math.random() * cities.length)];
  const activityType = activityTypes[Math.floor(Math.random() * activityTypes.length)];
  const durationHours = Number((Math.random() * 10 + 1).toFixed(1));
  const basePrice = Math.floor(Math.random() * 200) + 30;
  const rating = Number((Math.random() * 2 + 3).toFixed(1));
  const description = tourDescriptions[Math.floor(Math.random() * tourDescriptions.length)]
    .replace('{city}', location.city);

  // Randomly select 3-5 highlights
  const selectedHighlights = [...highlights]
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.floor(Math.random() * 3) + 3);

  // Randomly select 3-4 included items
  const selectedIncludes = [...included]
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.floor(Math.random() * 2) + 3);

  // Randomly select 2-3 excluded items
  const selectedExcludes = [...excludes]
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.floor(Math.random() * 2) + 2);
  
  return {
    objectID: id.toString(),
    title: `${activityType} in ${location.city}`,
    description,
    price: basePrice,
    duration: `${durationHours} hours`,
    durationHours,
    activityType,
    location,
    rating,
    reviewCount: Math.floor(Math.random() * 1000) + 50,
    imageUrl: tourImages[Math.floor(Math.random() * tourImages.length)],
    included: selectedIncludes,
    excludes: selectedExcludes,
    highlights: selectedHighlights,
    cancellationPolicy: 'Free cancellation up to 24 hours before the start',
    startTimes: ['09:00', '11:00', '14:00', '16:00'].slice(0, Math.floor(Math.random() * 3) + 2),
    languages: [...languages]
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * 3) + 2),
    groupSize: {
      min: 1,
      max: Math.floor(Math.random() * 10) + 5
    }
  };
};

export const generateMockTours = (count: number = 1000): Tour[] => {
  console.log(`Generating ${count} mock tours...`);
  return Array.from({ length: count }, (_, i) => generateRandomTour(i + 1));
};

export const sendToAlgolia = async (tours: Tour[]) => {
  // Implementation for sending data to Algolia
  // This would require your Algolia credentials and the algoliasearch client
  console.log('Sending mock data to Algolia:', tours.length, 'tours');
};
