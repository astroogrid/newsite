
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

interface CatalogResultsProps {
  isLoading: boolean;
  productCount: number;
  searchQuery: string;
  activeCategories: string[];
}

const CatalogResults: React.FC<CatalogResultsProps> = ({
  isLoading,
  productCount,
  searchQuery,
  activeCategories
}) => {
  return (
    <div className="mb-4 flex items-center justify-between">
      {isLoading ? (
        <Skeleton className="h-5 w-64" />
      ) : (
        <motion.p 
          key={`${productCount}-${searchQuery}-${activeCategories.join('')}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="text-muted-foreground"
        >
          Showing <span className="font-medium text-foreground">{productCount}</span> products
          {searchQuery && (
            <span className="ml-2 text-sm">for "{searchQuery}"</span>
          )}
          {activeCategories.length > 0 && (
            <span className="ml-2 text-sm">in {activeCategories.join(', ')}</span>
          )}
        </motion.p>
      )}
    </div>
  );
};

export default CatalogResults;
