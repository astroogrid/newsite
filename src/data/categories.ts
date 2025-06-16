
export interface CategoryImage {
  id: number;
  url: string;
  alt: string;
}

export interface SubCategory {
  id: number;
  name: string;
  slug: string;
}

export interface FeaturedProduct {
  id: number;
  name: string;
  image: string;
  slug: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  featured: FeaturedProduct[];
  subcategories: SubCategory[];
}

import categoriesData from './json/categories.json';

export const categories: Category[] = categoriesData as Category[];

export const getCategoryById = (id: number): Category | undefined => {
  return categories.find(category => category.id === id);
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(category => category.slug === slug);
};

export const getAllCategories = (): Category[] => {
  return categories;
};
