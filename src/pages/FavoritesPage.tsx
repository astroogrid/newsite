
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Trash, ArrowLeft } from 'lucide-react';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import SEO from '@/components/SEO';

const FavoritesPage: React.FC = () => {
  useScrollToTop();
  const { favorites, removeFromFavorites, clearFavorites } = useFavorites();
  const { addToCart } = useCart();
  
  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    });
  };
  
  if (favorites.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <SEO
          title="Your Favorites"
          description="View and manage your favorite products."
        />
        
        <main className="flex-grow container py-12 px-4">
          <div className="max-w-2xl mx-auto text-center py-12">
            <div className="mb-6 flex justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Heart className="h-24 w-24 text-gray-300" />
              </motion.div>
            </div>
            <h1 className="text-3xl font-bold mb-4">Your favorites list is empty</h1>
            <p className="text-muted-foreground mb-8">
              Save your favorite products to quickly find them later.
            </p>
            <Button asChild>
              <Link to="/catalog">Explore Products</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <SEO
        title="Your Favorites"
        description="View and manage your favorite products."
      />
      
      <main className="flex-grow container py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Your Favorites</h1>
              <p className="text-muted-foreground mt-1">
                {favorites.length} {favorites.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Button asChild variant="outline">
                <Link to="/catalog" className="flex items-center gap-2">
                  <ArrowLeft size={16} />
                  Continue Shopping
                </Link>
              </Button>
              
              {favorites.length > 0 && (
                <Button 
                  variant="destructive" 
                  onClick={clearFavorites}
                >
                  Clear All
                </Button>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="border rounded-lg overflow-hidden bg-card"
              >
                <Link to={`/product/${product.id}`} className="block relative">
                  <div className="aspect-[8/4] overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </Link>
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <Link 
                      to={`/product/${product.id}`} 
                      className="text-sm font-medium hover:text-primary transition-colors"
                    >
                      {product.name}
                    </Link>
                    <button
                      onClick={() => removeFromFavorites(product.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                      aria-label="Remove from favorites"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}>
                        ★
                      </span>
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">({product.rating})</span>
                  </div>
                  
                  {product.category && (
                    <p className="text-muted-foreground text-sm mb-3">{product.category}</p>
                  )}
                  
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-medium text-lg">
                      ${product.price.toFixed(2)}
                    </span>
                    <Button 
                      size="sm" 
                      onClick={() => handleAddToCart(product)}
                      className="flex items-center"
                    >
                      <ShoppingCart className="mr-1 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default FavoritesPage;
