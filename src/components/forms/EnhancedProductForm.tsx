
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Save, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useProducts } from '@/contexts/ProductContext';
import { Product } from '@/data/types/product';

interface EnhancedProductFormData {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand: string;
  image: string;
}

interface EnhancedProductFormProps {
  productId?: number;
  onCancel?: () => void;
  onSuccess?: (product: Product) => void;
}

const EnhancedProductForm: React.FC<EnhancedProductFormProps> = ({ 
  productId, 
  onCancel, 
  onSuccess 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addProduct, updateProduct, getProductById, categories, brands } = useProducts();
  const isEditing = !!productId;
  
  const form = useForm<EnhancedProductFormData>({
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      originalPrice: undefined,
      category: '',
      brand: '',
      image: ''
    }
  });

  // Load product data for editing
  useEffect(() => {
    if (isEditing && productId) {
      const product = getProductById(productId);
      if (product) {
        form.reset({
          name: product.name,
          description: product.description,
          price: product.price,
          originalPrice: product.originalPrice,
          category: product.category,
          brand: product.brand,
          image: product.image
        });
      }
    }
  }, [productId, isEditing, getProductById, form]);

  const onSubmit = async (data: EnhancedProductFormData) => {
    setIsSubmitting(true);
    
    try {
      // Calculate discount percentage if original price is provided
      const discountPercentage = data.originalPrice && data.originalPrice > data.price
        ? Math.round(((data.originalPrice - data.price) / data.originalPrice) * 100)
        : undefined;

      const productData = {
        ...data,
        discountPercentage,
        rating: 0,
        slug: data.name.toLowerCase().replace(/\s+/g, '-'),
        specs: [],
        tags: []
      };

      let result: Product;
      
      if (isEditing && productId) {
        updateProduct(productId, productData);
        result = getProductById(productId)!;
      } else {
        result = addProduct(productData);
      }

      onSuccess?.(result);
      
      if (!isEditing) {
        form.reset();
      }
      
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 flex items-center gap-4">
          {onCancel && (
            <Button variant="outline" size="sm" onClick={onCancel}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {isEditing ? 'Edit Product' : 'Add New Product'}
            </h1>
            <p className="text-muted-foreground">
              {isEditing ? 'Update product information' : 'Fill in the details to create a new product'}
            </p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="bg-white p-6 rounded-lg border space-y-4">
              <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
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
                  control={form.control}
                  name="brand"
                  rules={{ required: 'Brand is required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brand</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter brand name" list="brands" />
                      </FormControl>
                      <datalist id="brands">
                        {brands.map(brand => (
                          <option key={brand} value={brand} />
                        ))}
                      </datalist>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  rules={{ required: 'Category is required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter category" list="categories" />
                      </FormControl>
                      <datalist id="categories">
                        {categories.map(category => (
                          <option key={category} value={category} />
                        ))}
                      </datalist>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="image"
                  rules={{ 
                    required: 'Image URL is required',
                    pattern: {
                      value: /^https?:\/\/.+/,
                      message: 'Please enter a valid URL'
                    }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://example.com/image.jpg" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
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
            </div>

            {/* Pricing */}
            <div className="bg-white p-6 rounded-lg border space-y-4">
              <h2 className="text-xl font-semibold mb-4">Pricing</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  rules={{ 
                    required: 'Price is required',
                    min: { value: 0.01, message: 'Price must be greater than 0' }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="99.99" 
                          type="number" 
                          step="0.01"
                          onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="originalPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Original Price (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="129.99" 
                          type="number" 
                          step="0.01"
                          onChange={e => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              {onCancel && (
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              )}
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="flex items-center gap-2 px-8"
              >
                <Save className="h-4 w-4" />
                {isSubmitting ? 'Saving...' : (isEditing ? 'Update Product' : 'Save Product')}
              </Button>
            </div>
          </form>
        </Form>
      </motion.div>
    </div>
  );
};

export default EnhancedProductForm;
