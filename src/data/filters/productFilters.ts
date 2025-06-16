
import { products } from '../mockData/products';
import priceRangesData from '../json/priceRanges.json';

// Filter helpers
export const categories = [...new Set(products.map(product => product.category))];
export const brands = [...new Set(products.map(product => product.brand))];

export const priceRanges = priceRangesData as { label: string; min: number; max: number | null }[];
