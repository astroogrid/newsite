
import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/data/products';
import ProductCard from './ProductCard';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  count?: number;
}

const ProductSkeletons: React.FC<{ count: number }> = ({ count }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: i * 0.05 }}
        className="flex flex-col h-full"
      >
        <Skeleton className="aspect-square rounded-md mb-3" />
        <Skeleton className="h-4 w-1/3 mb-2" />
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-4" />
        <Skeleton className="h-10 w-full mt-auto" />
      </motion.div>
    ))}
  </>
);

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  loading = false, 
  count = 8
}) => {
  // Only show loading for initial page load
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        <ProductSkeletons count={count} />
      </div>
    );
  }
  
  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col items-center justify-center py-12 sm:py-16 text-center px-4 min-w-[800px]"
      >
        <h3 className="text-xl sm:text-2xl font-medium mb-2">No products found</h3>
        <p className="text-muted-foreground mb-6 text-sm sm:text-base">Try adjusting your filters or search query</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-4"
    >
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          layout
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.2,
            delay: Math.min(index * 0.02, 0.1) // Cap the delay for faster rendering
          }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProductGrid;
