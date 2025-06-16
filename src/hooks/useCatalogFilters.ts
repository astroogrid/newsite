
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, Product } from '@/data/products';
import { FilterOptions } from '@/components/CatalogSidebar';

export const useCatalogFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    brands: [],
    categories: [],
    priceRange: { min: 0, max: 5000 }
  });
  const [sortOption, setSortOption] = useState<string>('featured');
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Initialize filters and search from URL parameters
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');
    
    if (categoryParam) {
      setFilters(prev => ({
        ...prev,
        categories: [categoryParam]
      }));
    }
    
    if (searchParam) {
      setSearchQuery(searchParam);
    }
    
    // Set initial load to false after mounting
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchParams]);

  // Memoized filtered products - no loading states, instant filtering
  const filteredProducts = useMemo(() => {
    let result = [...products];
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        (product.tags && product.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }
    
    // Apply category filter
    if (filters.categories.length > 0) {
      result = result.filter(product => filters.categories.includes(product.category));
    }
    
    // Apply brand filter
    if (filters.brands.length > 0) {
      result = result.filter(product => filters.brands.includes(product.brand));
    }
    
    // Apply price range filter
    result = result.filter(product => 
      product.price >= filters.priceRange.min && product.price <= filters.priceRange.max
    );
    
    // Apply sorting
    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default: // featured - keep original order
        break;
    }
    
    return result;
  }, [searchQuery, filters, sortOption]);

  const handleSearchChange = (newQuery: string) => {
    setSearchQuery(newQuery);
    // Update URL with search parameter
    const newSearchParams = new URLSearchParams(searchParams);
    if (newQuery.trim()) {
      newSearchParams.set('search', newQuery.trim());
    } else {
      newSearchParams.delete('search');
    }
    setSearchParams(newSearchParams);
  };

  return {
    searchQuery,
    filters,
    filteredProducts,
    sortOption,
    isLoading: isInitialLoad, // Only loading on initial page load
    setFilters,
    setSortOption,
    handleSearchChange
  };
};
