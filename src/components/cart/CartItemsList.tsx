
import React from 'react';
import { CartItem as CartItemType } from '@/contexts/CartContext';
import CartItem from './CartItem';

interface CartItemsListProps {
  cart: CartItemType[];
  onQuantityChange: (item: CartItemType, newQuantity: number) => void;
  onRemoveFromCart: (id: number, size?: string, color?: string) => void;
}

const CartItemsList: React.FC<CartItemsListProps> = ({ 
  cart, 
  onQuantityChange, 
  onRemoveFromCart 
}) => {
  return (
    <div className="md:col-span-2">
      <ul>
        {cart.map((item) => (
          <CartItem
            key={`${item.id}-${item.size}-${item.color}`}
            item={item}
            onQuantityChange={onQuantityChange}
            onRemove={onRemoveFromCart}
          />
        ))}
      </ul>
    </div>
  );
};

export default CartItemsList;
