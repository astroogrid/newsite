import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Clock, ShoppingCart } from 'lucide-react';
import ProductGallery from '@/components/ProductGallery';
import ProductDetailsSection from './ProductDetailsSection';
import ProductPriceSection from './ProductPriceSection';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';

interface ProductContentProps {
  product: Product;
}

const ProductContent: React.FC<ProductContentProps> = ({
  product,
}) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
  };
  
  return (
    <div className="flex flex-col space-y-6">
      {/* Product Name and Header with Price and Add to Cart - Above the Gallery */}
      <div className="max-w-6xl mx-auto w-full px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div>
            <h1 className="text-xl font-bold">{product.name}</h1>
            {/* <p className="text-shop-gray mt-1">By {product.brand}</p> */}
            
            {/* History link */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-2"
            >
              <Button variant="link" asChild className="p-0 h-auto">
                <Link to={`/product/${product.id}/${product.slug}/history`} className="flex items-center text-primary">
                  <Clock className="h-4 w-4 mr-1" />
                  View Product History
                </Link>
              </Button>
            </motion.div>
          </div>
          
          {/* Price and Add to Cart at Top */}
          <div className="flex gap-4 items-center">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  {product.discountPercentage && (
                    <span className="text-sm font-medium text-green-600">
                      {product.discountPercentage}% off
                    </span>
                  )}
                </>
              )}
            </div>
            <Button 
              className="bg-white hover:bg-shop-light-blue hover:text-white text-shop-blue"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
            </Button>
          </div>
        </div>
      </div>
      
      {/* Product Gallery - Full Width on Mobile, Max-Width on Desktop */}
      <div className="max-w-6xl mx-auto w-full px-4">
        {product.images && <ProductGallery images={product.images} />}
      </div>
      
      {/* Product Details - Two Column Layout */}
      <div className="max-w-6xl mx-auto w-full px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Left Column - Product Info */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Product Description</h2>
              <p className="text-shop-dark-gray">
                {product.description}
              </p>
              
              {product.specs && product.specs.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Specifications</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {product.specs.map((spec, index) => (
                      <li key={index} className="text-shop-dark-gray">{spec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          
          {/* Right Column - Pricing and Add to Cart */}
          <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
            <ProductDetailsSection 
              product={product}
              productSizes={product.sizes || []}
              productColors={product.colors || []}
              reviewCount={product.reviews?.length || 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductContent;
