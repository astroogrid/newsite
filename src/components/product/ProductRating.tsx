
import React from 'react';

interface ProductRatingProps {
  rating: number;
  reviewCount: number;
}

const ProductRating: React.FC<ProductRatingProps> = ({ rating, reviewCount }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`h-5 w-5 ${star <= Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>
      <span className="text-shop-black font-medium">{rating}</span>
      <span className="text-shop-gray">({reviewCount} reviews)</span>
    </div>
  );
};

export default ProductRating;
