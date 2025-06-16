
import React from 'react';

interface ProductPriceSectionProps {
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  description: string;
}

const ProductPriceSection: React.FC<ProductPriceSectionProps> = ({ 
  price, 
  originalPrice, 
  discountPercentage, 
  description 
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-baseline gap-3">
        <div className="text-2xl font-bold text-shop-black">
          ${price.toFixed(2)}
        </div>
        {originalPrice && (
          <div className="text-lg text-muted-foreground line-through">
            ${originalPrice.toFixed(2)}
          </div>
        )}
        {discountPercentage && (
          <div className="text-lg font-semibold text-green-600">
            {discountPercentage}% off
          </div>
        )}
      </div>
      
      {discountPercentage && (
        <div className="text-sm text-green-600">
          You save: ${(originalPrice! - price).toFixed(2)}
        </div>
      )}
    </div>
  );
};

export default ProductPriceSection;
