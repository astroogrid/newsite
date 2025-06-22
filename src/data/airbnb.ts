export interface Stay {
  id: string;
  title: string;
  type: string;
  location: string;
  price: number;
  rating: number;
  reviewCount: number;
  categories?: string[];
  images: string[];
  host: {
    name: string;
    avatar: string;
    isSuperhost: boolean;
    joinedYear: number;
  };
  amenities: string[];
  description: string;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  beds: number;
  checkIn: string;
  checkOut: string;
  cancellation: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  helpful?: number;
}

import staysData from './json/home-cateogry.json';
import reviewsData from './json/airbnb-reviews.json';

export const mockStays: Stay[] = staysData as Stay[];
export const mockReviews: Review[] = reviewsData as Review[];
