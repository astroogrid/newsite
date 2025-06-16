
import React from 'react';
import QuantitySelector from '@/components/ui/QuantitySelector';

interface ProductQuantitySelectorProps {
  quantity: number;
  onQuantityChange: (amount: number) => void;
}

const ProductQuantitySelector: React.FC<ProductQuantitySelectorProps> = ({ 
  quantity, 
  onQuantityChange 
}) => {
  const handleQuantityChange = (newQuantity: number) => {
    const difference = newQuantity - quantity;
    onQuantityChange(difference);
  };

  return (
    <QuantitySelector
      quantity={quantity}
      onQuantityChange={handleQuantityChange}
      size="md"
    />
  );
};

export default ProductQuantitySelector;
