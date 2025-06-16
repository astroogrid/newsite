
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CartHeaderProps {
  cartLength: number;
  onClearCart: () => void;
}

const CartHeader: React.FC<CartHeaderProps> = ({ cartLength, onClearCart }) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <p className="text-muted-foreground mt-1">
          {cartLength} {cartLength === 1 ? 'item' : 'items'} in cart
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Button asChild variant="outline">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Continue Shopping
          </Link>
        </Button>

        {cartLength > 0 && (
          <Button variant="destructive" onClick={onClearCart}>
            Clear All
          </Button>
        )}
      </div>
    </div>
  );
};

export default CartHeader;
