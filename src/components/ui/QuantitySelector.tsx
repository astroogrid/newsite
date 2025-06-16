
import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  min?: number;
  max?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onQuantityChange,
  min = 1,
  max = 999,
  className,
  size = 'md'
}) => {
  const handleDecrease = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  return (
    <div className={cn("flex items-center border rounded-md", className)}>
      <button
        className={cn(
          "text-shop-gray hover:text-shop-black disabled:opacity-50 disabled:cursor-not-allowed",
          sizeClasses[size]
        )}
        onClick={handleDecrease}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
      >
        <Minus className={iconSizes[size]} />
      </button>
      <span className={cn(
        "text-shop-black font-medium border-x",
        sizeClasses[size]
      )}>
        {quantity}
      </span>
      <button
        className={cn(
          "text-shop-gray hover:text-shop-black disabled:opacity-50 disabled:cursor-not-allowed",
          sizeClasses[size]
        )}
        onClick={handleIncrease}
        disabled={quantity >= max}
        aria-label="Increase quantity"
      >
        <Plus className={iconSizes[size]} />
      </button>
    </div>
  );
};

export default QuantitySelector;
