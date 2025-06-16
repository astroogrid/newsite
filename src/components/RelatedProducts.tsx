
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { Product } from '@/data/products';
import { Skeleton } from '@/components/ui/skeleton';
import LazyImage from './LazyImage';

interface RelatedProductsProps {
  products: Product[];
  title?: string;
  loading?: boolean;
}

const RelatedProductsSkeleton: React.FC = () => {
  return (
    <div className="mt-16 pt-10 border-t">
      <Skeleton className="h-8 w-48 mb-6" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col">
            <Skeleton className="aspect-[3/4] w-full mb-2" />
            <Skeleton className="h-5 w-3/4 mb-1" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
};

const RelatedProducts: React.FC<RelatedProductsProps> = ({ 
  products,
  title = "You might also like",
  loading = false
}) => {
  if (loading) {
    return <RelatedProductsSkeleton />;
  }

  return (
    <div className="mt-16 pt-10 border-t">
      <h2 className="text-lg font-medium mb-6">{title}</h2>
      
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product.id} className="md:basis-1/4 lg:basis-2/8">
              <Link to={`/product/${product.id}/${product.slug}`} className="block group">
                <LazyImage 
                  src={product.image}
                  alt={product.name}
                  aspectRatio="portrait"
                  width={100}
                  height={150}
                  loading="lazy"
                  className="aspect-[6/4] rounded-xl transition-transform duration-300 hover:scale-105"
                />
                <h3 className="font-medium text-shop-black text-sm group-hover:text-shop-blue transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-shop-gray">{product.category}</p>
                <p className="font-medium mt-1 text-sm">${product.price.toFixed(2)}</p>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </div>
  );
};

export default RelatedProducts;
