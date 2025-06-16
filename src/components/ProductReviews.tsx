
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StarIcon } from 'lucide-react';
import { ProductReview } from '@/data/products';

interface ProductReviewsProps {
  reviews: ProductReview[];
  averageRating: number;
  totalReviews: number;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({
  reviews,
  averageRating,
  totalReviews
}) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <StarIcon
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="mt-12 border-t pt-10">
      <Tabs defaultValue="reviews">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="reviews">Reviews ({totalReviews})</TabsTrigger>
          <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
        </TabsList>
        
        <TabsContent value="description" className="animate-slide-up">
          <div className="prose max-w-none">
            <p className="text-shop-dark-gray">
              This premium product features high-quality materials and exceptional craftsmanship.
              Designed for durability and performance, it's perfect for both everyday use and
              special occasions.
            </p>
            <ul className="mt-4 space-y-2">
              <li>Premium materials for durability</li>
              <li>Ergonomic design for comfort</li>
              <li>Versatile functionality</li>
              <li>Modern aesthetic with attention to detail</li>
            </ul>
          </div>
        </TabsContent>
        
        <TabsContent value="reviews" className="animate-slide-up">
          <div className="space-y-8">
            <div className="flex items-center space-x-2">
              <div className="review-stars">
                {renderStars(Math.round(averageRating))}
              </div>
              <span className="text-shop-black font-medium">{averageRating.toFixed(1)}</span>
              <span className="text-shop-gray">({totalReviews} reviews)</span>
            </div>
            
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b pb-6">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{review.author}</h4>
                    <span className="text-sm text-shop-gray">{review.date}</span>
                  </div>
                  
                  <div className="review-stars my-1">
                    {renderStars(review.rating)}
                  </div>
                  
                  <h5 className="font-medium mt-2">{review.title}</h5>
                  <p className="text-shop-dark-gray mt-1">{review.content}</p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="shipping" className="animate-slide-up">
          <div className="prose max-w-none">
            <h4 className="text-lg font-medium">Shipping</h4>
            <p className="text-shop-dark-gray">
              We offer free standard shipping on all orders over $50. Orders typically ship within 1-2
              business days and arrive within 3-5 business days.
            </p>
            
            <h4 className="text-lg font-medium mt-6">Returns & Exchanges</h4>
            <p className="text-shop-dark-gray">
              If you're not completely satisfied with your purchase, you can return it within 30 days
              for a full refund. Items must be unused and in original packaging.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductReviews;
