
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Product } from '@/data/products';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useCart } from '@/contexts/CartContext';
import LazyImage from './LazyImage';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { addToCart } = useCart();
  const favorite = isFavorite(product.id);
  
  const handleFavoriteClick = () => {
    if (favorite) {
      removeFromFavorites(product.id);
      toast.success(`Removed ${product.name} from favorites`);
    } else {
      addToFavorites(product);
      toast.success(`Added ${product.name} to favorites`);
    }
  };
  
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
    toast.success(`Added ${product.name} to cart`);
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden border hover:border-primary/80 transition-all">
      <div className="relative">
        <Link to={`/product/${product.id}/${product.slug}`}>
          <LazyImage 
            src={product.image}
            alt={product.name}
            aspectRatio="portrait"
            width={400}
            className="aspect-[6/4] transition-transform duration-300 hover:scale-105"
          />
        </Link>
        
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-2 right-2 rounded-full bg-background/80 backdrop-blur-sm min-h-[44px] min-w-[44px] sm:min-h-[32px] sm:min-w-[32px] ${
            favorite ? "text-red-500 hover:text-red-600" : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={handleFavoriteClick}
        >
          <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${favorite ? "fill-current" : ""}`} />
          <span className="sr-only">
            {favorite ? "Remove from favorites" : "Add to favorites"}
          </span>
        </Button>
      </div>
      
      <CardContent className="flex-grow p-3 sm:p-4">
        <div className="mb-1 text-xs sm:text-sm text-muted-foreground">{product.category}</div>
        <Link to={`/product/${product.id}/${product.slug}`} className="block">
          <h3 className="font-medium text-xs sm:text-sm mb-1 line-clamp-2 hover:text-primary transition-colors leading-tight">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={`text-xs ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}>
              ★
            </span>
          ))}
          <span className="text-xs text-muted-foreground ml-1">({product.rating})</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
          <p className="text-sm sm:text-md font-semibold">${product.price.toFixed(2)}</p>
          {product.originalPrice && (
            <div className="flex items-center gap-1 sm:gap-2">
              <p className="text-xs sm:text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </p>
              {product.discountPercentage && (
                <span className="text-xs font-medium text-green-600">
                  {product.discountPercentage}% off
                </span>
              )}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-3 sm:p-4 pt-0">
        <Button 
          onClick={handleAddToCart}
          className="w-full text-xs sm:text-sm h-8 sm:h-10 touch-manipulation"
        >
          <ShoppingCart className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
          <span className="hidden sm:inline">Add to Cart</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
