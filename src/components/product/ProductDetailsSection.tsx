import React, { useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import ProductHeader from './ProductHeader';
import ProductPriceSection from './ProductPriceSection';
import ProductOptions from '@/components/ProductOptions';
import AddToCartSection from './AddToCartSection';
import { useCart } from '@/contexts/CartContext';
import { useRecentViews } from '@/contexts/RecentViewsContext';
import { Product, SizeOption, ColorOption } from '@/data/products';

interface ProductDetailsSectionProps {
  product: Product;
  productSizes: SizeOption[];
  productColors: ColorOption[];
  reviewCount: number;
}

const ProductDetailsSection: React.FC<ProductDetailsSectionProps> = ({ 
  product,
  productSizes,
  productColors,
  reviewCount
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<number>(1);
  const [currentPrice, setCurrentPrice] = useState(product.price);
  const { addToCart } = useCart();
  const { addToRecentViews } = useRecentViews();

  // Add product to recent views when component mounts
  useEffect(() => {
    const viewedProduct = {
      id: product.id,
      name: product.name,
      price: product.price, // Use base product price instead of currentPrice
      image: product.image,
      slug: product.slug,
      viewedAt: Date.now()
    };
    addToRecentViews(viewedProduct);
  }, [product, addToRecentViews]); // Simplified dependency array

  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  const handleSizeChange = (sizeId: number, price: number) => {
    setSelectedSize(sizeId);
    setCurrentPrice(price);
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: currentPrice,
      quantity: quantity,
      image: product.image,
      size: productSizes.find(size => size.id === selectedSize)?.label,
      color: productColors.find(color => color.id === selectedColor)?.name
    });
    
    console.log('Added to cart:', {
      product: product.name,
      quantity,
      size: productSizes.find(size => size.id === selectedSize)?.label,
      color: productColors.find(color => color.id === selectedColor)?.name,
      price: currentPrice
    });
  };

  return (
    <div className="space-y-6">
      <ProductHeader 
        product={product} 
        reviewCount={reviewCount}
      />
      
      <ProductPriceSection 
        price={currentPrice}
        originalPrice={product.originalPrice}
        discountPercentage={product.discountPercentage}
        description={product.description}
      />
      
      <Separator className="my-4" />
      
      <ProductOptions
        sizes={productSizes}
        colors={productColors}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
        onSizeChange={handleSizeChange}
        onColorChange={setSelectedColor}
      />
      
      <AddToCartSection
        quantity={quantity}
        onQuantityChange={handleQuantityChange}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default ProductDetailsSection;
