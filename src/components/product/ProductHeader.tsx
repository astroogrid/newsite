
import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useFavorites } from '@/contexts/FavoritesContext';
import ProductRating from './ProductRating';
import { Product } from '@/data/products';

interface ProductHeaderProps {
  product: Product;
  reviewCount: number;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({ product, reviewCount }) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  
  const toggleFavorite = () => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-lg font-bold">{product.name}</h1>
          <p className="text-shop-gray mt-1">By {product.brand}</p>
        </div>
        
        <motion.button
          whileTap={{ scale: 0.9 }}
          className={`p-2 rounded-full ${isFavorite(product.id) ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-400'}`}
          onClick={toggleFavorite}
          aria-label={isFavorite(product.id) ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart 
            className={`h-5 w-5 ${isFavorite(product.id) ? 'fill-current' : ''}`}
          />
        </motion.button>
      </div>
      
      <ProductRating rating={product.rating} reviewCount={reviewCount} />
    </div>
  );
};

export default ProductHeader;
