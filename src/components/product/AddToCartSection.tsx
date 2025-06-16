
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductQuantitySelector from './ProductQuantitySelector';

interface AddToCartSectionProps {
  quantity: number;
  onQuantityChange: (amount: number) => void;
  onAddToCart: () => void;
}

const AddToCartSection: React.FC<AddToCartSectionProps> = ({ 
  quantity, 
  onQuantityChange, 
  onAddToCart 
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-6 pt-4">
        <ProductQuantitySelector 
          quantity={quantity}
          onQuantityChange={onQuantityChange}
        />
        
        <Button 
          className="flex-1 bg-shop-blue hover:bg-shop-light-blue text-white py-6"
          onClick={onAddToCart}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart
        </Button>
      </div>
      
      <div className="pt-4 flex items-center space-x-2 text-shop-dark-gray">
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>Free shipping on orders over $50</span>
      </div>
    </div>
  );
};

export default AddToCartSection;
