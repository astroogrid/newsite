
import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/data/products';
import { Skeleton } from '@/components/ui/skeleton';

interface SearchDropdownProps {
  isOpen: boolean;
  searchResults: Product[];
  isLoading: boolean;
  onClose: () => void;
  query: string;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({
  isOpen,
  searchResults,
  isLoading,
  onClose,
  query
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
      >
        {isLoading ? (
          <div className="p-4 space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="w-12 h-12 rounded" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : searchResults.length > 0 ? (
          <div className="py-2">
            {searchResults.slice(0, 8).map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}/${product.slug}`}
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {product.name}
                  </h4>
                  <p className="text-sm text-gray-500">{product.brand}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    ${product.price.toFixed(2)}
                  </p>
                  {product.originalPrice && (
                    <p className="text-xs text-gray-500 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </p>
                  )}
                </div>
              </Link>
            ))}
            {searchResults.length > 8 && (
              <div className="px-4 py-2 border-t">
                <Link
                  to={`/catalog?search=${encodeURIComponent(query)}`}
                  onClick={onClose}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  View all {searchResults.length} results
                </Link>
              </div>
            )}
          </div>
        ) : query.trim() ? (
          <div className="p-4 text-center text-gray-500">
            <p className="text-sm">No products found for "{query}"</p>
            <Link
              to="/catalog"
              onClick={onClose}
              className="text-sm text-blue-600 hover:text-blue-800 mt-2 inline-block"
            >
              Browse all products
            </Link>
          </div>
        ) : null}
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchDropdown;
