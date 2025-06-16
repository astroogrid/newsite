
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart, Share } from 'lucide-react';
import { Product } from '@/data/products';
import { Skeleton } from '@/components/ui/skeleton';
import { useFavorites } from '@/contexts/FavoritesContext';
import { toast } from 'sonner';

interface ProductHistorySidebarProps {
  product: Product;
  loading?: boolean;
}

const ProductHistorySidebar: React.FC<ProductHistorySidebarProps> = ({ product, loading = false }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const favorite = isFavorite(product?.id);
  
  const handleFavoriteToggle = () => {
    if (favorite) {
      removeFromFavorites(product.id);
      toast.success('Removed from favorites');
    } else {
      addToFavorites(product);
      toast.success('Added to favorites');
    }
  };
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out the history of ${product.name}!`,
          url: window.location.href
        });
      } catch (err) {
        toast('Link copied to clipboard');
        navigator.clipboard.writeText(window.location.href);
      }
    } else {
      toast('Link copied to clipboard');
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="h-full px-4 py-6">
        <div className="space-y-6">
          <Skeleton className="aspect-square w-full" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <Skeleton className="h-24 w-full" />
          <div className="space-y-3 border-t pt-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/4" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/4" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full px-4 py-6">
      <div className="space-y-6">
        {/* Product Image */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative aspect-square overflow-hidden rounded-lg"
        >
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>
        
        {/* Product Title */}
        <div className="space-y-2">
          <h2 className="text-base font-bold">{product.name}</h2>
          <p className="text-muted-foreground">by {product.brand}</p>
        </div>
        
        {/* Product Description */}
        <div>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {product.description}
          </p>
        </div>
        
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 flex items-center justify-center gap-1"
            onClick={handleFavoriteToggle}
          >
            <Heart className={`h-4 w-4 ${favorite ? 'fill-red-500 text-red-500' : ''}`} />
            <span>{favorite ? 'Saved' : 'Save'}</span>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 flex items-center justify-center gap-1"
            onClick={handleShare}
          >
            <Share className="h-4 w-4" />
            <span>Share</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductHistorySidebar;
