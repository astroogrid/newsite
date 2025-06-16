
import React from 'react';
import { motion } from 'framer-motion';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import Header from '@/components/Header';
import SEO from '@/components/SEO';
import CatalogFilters from '@/components/catalog/CatalogFilters';
import CatalogLayout from '@/components/catalog/CatalogLayout';
import { useCatalogFilters } from '@/hooks/useCatalogFilters';

const CatalogPage: React.FC = () => {
  useScrollToTop();
  
  const {
    searchQuery,
    filters,
    filteredProducts,
    sortOption,
    isLoading,
    setFilters,
    setSortOption,
    handleSearchChange
  } = useCatalogFilters();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <SEO 
        title="Camera Shop"
        description="Browse our selection of high-quality cameras and photography equipment."
        keywords="cameras, photography, equipment, shop, mirrorless, DSLR"
      />
      
      <main className="flex-grow max-w-7xl 3xl:max-w-[1500px] mx-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-3xl font-bold mb-2">Camera Shop</h1>
            <p className="text-muted-foreground">Browse our collection of professional cameras and accessories</p>
          </motion.div>
          
          <CatalogFilters
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            sortOption={sortOption}
            onSortChange={setSortOption}
            filters={filters}
            onFiltersChange={setFilters}
          />
          
          <CatalogLayout
            filters={filters}
            onFiltersChange={setFilters}
            filteredProducts={filteredProducts}
            isLoading={isLoading}
            searchQuery={searchQuery}
          />
        </div>
      </main>
    </div>
  );
};

export default CatalogPage;
