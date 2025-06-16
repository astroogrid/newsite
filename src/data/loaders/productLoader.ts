
import { Product } from '../types/product';
import braceletsData from '../json/products/bracelets.json';
import necklacesData from '../json/products/necklaces.json';

export const loadAllProducts = (): Product[] => {
  const allProducts = [
    ...braceletsData,
    ...necklacesData
  ];
  
  // Sort by ID to maintain consistent order
  return allProducts.sort((a, b) => a.id - b.id) as Product[];
};

export const loadProductsByCategory = (category: string): Product[] => {
  const allProducts = loadAllProducts();
  return allProducts.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );
};

export const loadProductsByBrand = (brand: string): Product[] => {
  const allProducts = loadAllProducts();
  return allProducts.filter(product => 
    product.brand.toLowerCase() === brand.toLowerCase()
  );
};
