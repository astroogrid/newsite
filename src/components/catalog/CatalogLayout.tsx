
import React from 'react';
import CatalogSidebar, { FilterOptions } from '@/components/CatalogSidebar';
import ProductGrid from '@/components/ProductGrid';
import CatalogResults from './CatalogResults';
import { Product } from '@/data/products';
import { useIsMobile } from '@/hooks/use-mobile';

interface CatalogLayoutProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  filteredProducts: Product[];
  isLoading: boolean;
  searchQuery: string;
}

const CatalogLayout: React.FC<CatalogLayoutProps> = ({
  filters,
  onFiltersChange,
  filteredProducts,
  isLoading,
  searchQuery
}) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex gap-6">
      {!isMobile && (
        <CatalogSidebar
          filters={filters}
          setFilters={onFiltersChange}
          isMobile={false}
        />
      )}
      
      <div className="flex-1">
        <CatalogResults
          isLoading={isLoading}
          productCount={filteredProducts.length}
          searchQuery={searchQuery}
          activeCategories={filters.categories}
        />
        
        <ProductGrid 
          products={filteredProducts} 
          loading={isLoading}
          count={12}
        />
      </div>
    </div>
  );
};

export default CatalogLayout;
