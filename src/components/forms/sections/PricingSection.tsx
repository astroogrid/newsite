
import React from 'react';
import { Control } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { ProductFormData } from '../types/ProductFormTypes';

interface PricingSectionProps {
  control: Control<ProductFormData>;
}

const PricingSection: React.FC<PricingSectionProps> = ({ control }) => {
  return (
    <div className="bg-white p-6 rounded-lg border space-y-4">
      <h2 className="text-xl font-semibold mb-4">Pricing</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="price"
          rules={{ 
            required: 'Price is required',
            pattern: {
              value: /^\d+(\.\d{1,2})?$/,
              message: 'Please enter a valid price'
            }
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input {...field} placeholder="99.99" type="number" step="0.01" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="discountPrice"
          rules={{
            pattern: {
              value: /^\d+(\.\d{1,2})?$/,
              message: 'Please enter a valid price'
            }
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discount Price (Optional)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="79.99" type="number" step="0.01" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default PricingSection;
