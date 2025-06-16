
import React from 'react';
import { Button } from '@/components/ui/button';
import PaymentMethods from '@/components/ui/PaymentMethods';

interface OrderSummaryProps {
  totalItems: number;
  totalPrice: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ totalItems, totalPrice }) => {
  return (
    <div className="border rounded-lg p-6 bg-gray-50 sticky top-32 h-fit">
      <h2 className="text-lg font-medium mb-4">Order Summary</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <p className="text-shop-dark-gray">Subtotal ({totalItems} items)</p>
          <p className="font-medium">${totalPrice.toFixed(2)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-shop-dark-gray">Shipping</p>
          <p className="font-medium">Free</p>
        </div>
        <div className="flex justify-between">
          <p className="text-shop-dark-gray">Tax</p>
          <p className="font-medium">${(totalPrice * 0.001/5).toFixed(2)}</p>
        </div>
        
        <div className="h-px bg-gray-200 my-4"></div>
        
        <div className="flex justify-between text-lg font-bold">
          <p>Total</p>
          <p>${(totalPrice + totalPrice * 0.07).toFixed(2)}</p>
        </div>
      </div>
      
      <Button className="w-full mt-6" size="lg">
        Proceed to Checkout
      </Button>
      
      <PaymentMethods className="mt-4" />
    </div>
  );
};

export default OrderSummary;
