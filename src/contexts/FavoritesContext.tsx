
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/sonner';
import { Product } from '@/data/products';

// Define types for favorites context
interface FavoritesContextType {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (id: number) => void;
  isFavorite: (id: number) => boolean;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  
  // Load favorites from localStorage on initial render
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (e) {
        console.error('Failed to parse favorites from localStorage:', e);
      }
    }
  }, []);
  
  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);
  
  const addToFavorites = (product: Product) => {
    if (!isFavorite(product.id)) {
      setFavorites(prev => [...prev, product]);
      toast.success('Added to favorites!', {
        description: `${product.name} has been added to your favorites.`,
      });
    }
  };
  
  const removeFromFavorites = (id: number) => {
    const productToRemove = favorites.find(item => item.id === id);
    setFavorites(prev => prev.filter(product => product.id !== id));
    if (productToRemove) {
      toast.success('Removed from favorites', {
        description: `${productToRemove.name} has been removed from your favorites.`,
      });
    }
  };
  
  const isFavorite = (id: number): boolean => {
    return favorites.some(product => product.id === id);
  };

  const clearFavorites = () => {
    setFavorites([]);
    toast.success('Favorites cleared', {
      description: 'All items have been removed from your favorites.'
    });
  };
  
  return (
    <FavoritesContext.Provider value={{ 
      favorites, 
      addToFavorites, 
      removeFromFavorites, 
      isFavorite,
      clearFavorites
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
