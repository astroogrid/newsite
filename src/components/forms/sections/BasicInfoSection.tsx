
import React from 'react';
import { Control } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { ProductFormData } from '../types/ProductFormTypes';

interface BasicInfoSectionProps {
  control: Control<ProductFormData>;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ control }) => {
  return (
    <div className="bg-white p-6 rounded-lg border space-y-4">
      <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="name"
          rules={{ required: 'Product name is required' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter product name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="url"
          rules={{ 
            required: 'Product URL is required',
            pattern: {
              value: /^https?:\/\/.+/,
              message: 'Please enter a valid URL'
            }
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product URL</FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://example.com/product" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="description"
        rules={{ required: 'Description is required' }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea 
                {...field} 
                placeholder="Enter product description"
                rows={4}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="specifications"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Specifications</FormLabel>
            <FormControl>
              <Textarea 
                {...field} 
                placeholder="Enter product specifications"
                rows={4}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="categoryName"
        rules={{ required: 'Category is required' }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category Name</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter category name" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default BasicInfoSection;
