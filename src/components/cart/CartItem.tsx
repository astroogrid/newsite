
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash } from 'lucide-react';
import { CartItem as CartItemType } from '@/contexts/CartContext';
import QuantitySelector from '@/components/ui/QuantitySelector';

interface CartItemProps {
  item: CartItemType;
  onQuantityChange: (item: CartItemType, newQuantity: number) => void;
  onRemove: (id: number, size?: string, color?: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onQuantityChange, onRemove }) => {
  return (
    <motion.li 
      key={`${item.id}-${item.size}-${item.color}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="py-6 flex"
    >
      <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-2xl shadow-sm">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between text-base font-medium text-shop-black">
          <h3 className="text-sm flex flex-col">
            <Link to={`/product/${item.id}`}>{item.name}</Link>
            <span className="text-xs text-shop-dark-gray">${item.price} / 1 pc</span>
          </h3>
          <p className="ml-4 text-sm product-price">${(item.price * item.quantity).toFixed(2)}</p>
        </div>
        
        {(item.size || item.color) && (
          <p className="mt-1 text-sm text-shop-dark-gray">
            {item.size && `Size: ${item.size}`} 
            {item.size && item.color && ' / '} 
            {item.color && `Color: ${item.color}`}
          </p>
        )}
        
        <div className="flex items-center justify-between mt-4">
          <QuantitySelector
            quantity={item.quantity}
            onQuantityChange={(newQuantity) => onQuantityChange(item, newQuantity)}
            className="scale-90"
            size="sm"
          />
          
          <button
            type="button"
            className="text-red-500 hover:text-red-700 flex items-center"
            onClick={() => onRemove(item.id, item.size, item.color)}
          >
            <Trash className="h-4 w-4 mr-1" />
            <span className="text-sm">Remove</span>
          </button>
        </div>
      </div>
    </motion.li>
  );
};

export default CartItem;
