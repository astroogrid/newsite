
import { useState, useEffect, useMemo } from 'react';
import { products, Product } from '@/data/products';

export const useSearch = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  // Debounced search logic
  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    
    const timeoutId = setTimeout(() => {
      const filtered = products.filter(product => {
        const searchTerm = query.toLowerCase();
        return (
          product.name.toLowerCase().includes(searchTerm) ||
          product.brand.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
        );
      });
      
      setSearchResults(filtered);
      setIsLoading(false);
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [query]);

  return {
    query,
    setQuery,
    searchResults,
    isLoading
  };
};
