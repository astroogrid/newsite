
import React from 'react';
import { cn } from '@/lib/utils';

interface PaymentMethod {
  name: string;
  logo?: string;
}

interface PaymentMethodsProps {
  methods?: PaymentMethod[];
  className?: string;
  title?: string;
  layout?: 'horizontal' | 'vertical';
}

const defaultMethods: PaymentMethod[] = [
  { name: 'Visa' },
  { name: 'Mastercard' },
  { name: 'PayPal' }
];

const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  methods = defaultMethods,
  className,
  title = "We accept",
  layout = 'horizontal'
}) => {
  return (
    <div className={cn("text-xs text-center text-shop-dark-gray", className)}>
      <p className="mb-2">{title}</p>
      <div className={cn(
        "flex justify-center gap-2",
        layout === 'vertical' && "flex-col items-center"
      )}>
        {methods.map((method, index) => (
          <span
            key={index}
            className="border rounded px-2 py-1 bg-white text-shop-dark-gray"
          >
            {method.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;
