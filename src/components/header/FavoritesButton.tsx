
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useFavorites } from '@/contexts/FavoritesContext';

const FavoritesButton: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <Link to="/favorites" className="hidden md:flex relative">
      <Heart className="h-5 w-5 text-shop-dark-gray hover:text-shop-blue transition-colors" />
      {favorites.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-shop-blue text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {favorites.length}
        </span>
      )}
    </Link>
  );
};

export default FavoritesButton;
