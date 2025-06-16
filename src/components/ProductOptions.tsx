import React from 'react';
import { cn } from '@/lib/utils';
import { SizeOption, ColorOption } from '@/data/products';

interface ProductOptionsProps {
  sizes: SizeOption[];
  colors: ColorOption[];
  selectedSize: number | null;
  selectedColor: number | null;
  onSizeChange: (sizeId: number, price: number) => void;
  onColorChange: (colorId: number) => void;
}

const ProductOptions: React.FC<ProductOptionsProps> = ({
  sizes,
  colors,
  selectedSize,
  selectedColor,
  onSizeChange,
  onColorChange
}) => {
  return (
    <div className="space-y-6">
      {/* Sizes */}
      {sizes && sizes.length > 0 && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-shop-black">Size</h3>
            <button className="text-sm text-shop-blue hover:underline">Size Guide</button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size.id}
                className={cn(
                  "size-option",
                  selectedSize === size.id && "active",
                  !size.available && "opacity-40 cursor-not-allowed"
                )}
                onClick={() => size.available && onSizeChange(size.id, size.price)}
                disabled={!size.available}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Colors */}
      {colors && colors.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-medium text-shop-black">Color</h3>
          
          <div className="flex flex-wrap gap-3">
            {colors.map((color) => (
              <button
                key={color.id}
                className={cn(
                  "color-option",
                  selectedColor === color.id && "active"
                )}
                style={{ backgroundColor: color.hexCode }}
                onClick={() => onColorChange(color.id)}
                aria-label={color.name}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductOptions;
