export interface ProductImage {
  id: number;
  url: string;
  alt: string;
}

export interface ProductReview {
  id: number;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
}

export interface SizeOption {
  id: number;
  label: string;
  available: boolean;
  price: number;
}

export interface ColorOption {
  id: number;
  name: string;
  hexCode: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number; // Original price before discount
  discountPercentage?: number; // Discount percentage
  category: string;
  brand: string;
  rating: number;
  image: string;
  description: string;
  slug: string;
  specs?: string[];
  images?: ProductImage[];
  reviews?: ProductReview[];
  sizes?: SizeOption[];
  colors?: ColorOption[];
  tags?: string[];
}
