
import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { toast } from '@/components/ui/sonner';
import BasicInfoSection from './sections/BasicInfoSection';
import PricingSection from './sections/PricingSection';
import AdditionalInfoSection from './sections/AdditionalInfoSection';
import { ProductFormData } from './types/ProductFormTypes';

const ProductForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ProductFormData>({
    defaultValues: {
      name: '',
      url: '',
      description: '',
      specifications: '',
      price: '',
      discountPrice: '',
      relatedLinks: [{ value: '' }],
      mayYouLike: [{ value: '' }],
      categoryName: '',
      sizes: [{ value: '' }]
    }
  });

  const {
    fields: relatedLinksFields,
    append: appendRelatedLink,
    remove: removeRelatedLink
  } = useFieldArray({
    control: form.control,
    name: 'relatedLinks'
  });

  const {
    fields: mayYouLikeFields,
    append: appendMayYouLike,
    remove: removeMayYouLike
  } = useFieldArray({
    control: form.control,
    name: 'mayYouLike'
  });

  const {
    fields: sizesFields,
    append: appendSize,
    remove: removeSize
  } = useFieldArray({
    control: form.control,
    name: 'sizes'
  });

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);
    
    try {
      // Filter out empty values from arrays
      const cleanedData = {
        ...data,
        relatedLinks: data.relatedLinks.filter(item => item.value.trim() !== '').map(item => item.value),
        mayYouLike: data.mayYouLike.filter(item => item.value.trim() !== '').map(item => item.value),
        sizes: data.sizes.filter(item => item.value.trim() !== '').map(item => item.value),
      };

      // Convert to JSON
      const productJson = JSON.stringify(cleanedData, null, 2);
      
      // Log the JSON (in a real app, you'd send this to your API)
      console.log('Product JSON:', productJson);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Product saved successfully!', {
        description: 'The product data has been updated.',
      });
      
      // Reset form after successful submission
      form.reset();
      
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product', {
        description: 'Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Add New Product</h1>
          <p className="text-muted-foreground">Fill in the details to create a new product</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <BasicInfoSection control={form.control} />
            
            <PricingSection control={form.control} />

            <AdditionalInfoSection
              control={form.control}
              relatedLinksFields={relatedLinksFields}
              appendRelatedLink={appendRelatedLink}
              removeRelatedLink={removeRelatedLink}
              mayYouLikeFields={mayYouLikeFields}
              appendMayYouLike={appendMayYouLike}
              removeMayYouLike={removeMayYouLike}
              sizesFields={sizesFields}
              appendSize={appendSize}
              removeSize={removeSize}
            />

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="flex items-center gap-2 px-8"
              >
                <Save className="h-4 w-4" />
                {isSubmitting ? 'Saving...' : 'Save Product'}
              </Button>
            </div>
          </form>
        </Form>
      </motion.div>
    </div>
  );
};

export default ProductForm;
