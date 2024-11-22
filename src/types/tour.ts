export interface Tour {
  objectID: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  durationHours: number;
  activityType: string;
  location: {
    city: string;
    country: string;
    lat: number;
    lng: number;
  };
  rating: number;
  reviewCount: number;
  imageUrl: string;
  included: string[];
  excludes: string[];
  highlights: string[];
  cancellationPolicy: string;
  startTimes: string[];
  languages: string[];
  groupSize: {
    min: number;
    max: number;
  };
}
