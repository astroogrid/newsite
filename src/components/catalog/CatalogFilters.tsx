
import React from 'react';
import { motion } from 'framer-motion';
import SearchBar from '@/components/SearchBar';
import CatalogSidebar, { FilterOptions } from '@/components/CatalogSidebar';
import { useIsMobile } from '@/hooks/use-mobile';

interface CatalogFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortOption: string;
  onSortChange: (sort: string) => void;
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

const CatalogFilters: React.FC<CatalogFiltersProps> = ({
  searchQuery,
  onSearchChange,
  sortOption,
  onSortChange,
  filters,
  onFiltersChange
}) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
      <SearchBar 
        query={searchQuery} 
        setQuery={onSearchChange} 
        placeholder="Search cameras, brands, or categories..."
      />
      
      <div className="flex gap-3 w-full sm:w-auto">
        {isMobile && (
          <CatalogSidebar
            filters={filters}
            setFilters={onFiltersChange}
            isMobile={true}
          />
        )}
        
        <select
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value)}
          className=" h-9 w-full hidden md:block items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>
    </div>
  );
};

export default CatalogFilters;
