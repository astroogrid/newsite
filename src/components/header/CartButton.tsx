
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const CartButton: React.FC = () => {
  const { totalItems } = useCart();

  return (
    <Link to="/cart" className="relative">
      <ShoppingCart className="h-5 w-5 text-shop-dark-gray hover:text-shop-blue transition-colors" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-shop-blue text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </Link>
  );
};

export default CartButton;
