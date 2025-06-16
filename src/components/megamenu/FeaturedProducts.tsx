
import React from 'react';
import { Link } from 'react-router-dom';
import { FeaturedProduct } from '@/data/categories';

interface FeaturedProductsProps {
  products: FeaturedProduct[];
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {products.map((product) => (
        <Link 
          key={product.id} 
          to={`/product/${product.id}/${product.slug}`}
          className="group"
        >
          <div className="aspect-square rounded-md overflow-hidden bg-gray-100">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <h4 className="mt-2 text-sm font-medium text-gray-900 group-hover:text-shop-blue transition-colors">
            {product.name}
          </h4>
        </Link>
      ))}
    </div>
  );
};

export default FeaturedProducts;
