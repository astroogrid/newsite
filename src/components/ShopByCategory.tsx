
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import { categories } from '@/data/categories';

const ShopByCategory = () => {
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-shop-bg-gray">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Shop by Category</h2>
        
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 sm:-ml-4">
            {categories.map((category) => (
              <CarouselItem key={category.id} className="pl-2 sm:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <Link to={`/category/${category.slug}`} className="relative h-48 sm:h-56 md:h-64 group block">
                  <div className="absolute inset-0 bg-black/30 rounded-lg group-hover:bg-black/40 transition-colors" />
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover rounded-lg"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-white text-center">{category.name}</h3>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center sm:justify-end gap-2 mt-4 sm:mt-6">
            <CarouselPrevious className="static ml-0 mr-2 transform-none h-8 w-8 sm:h-10 sm:w-10" />
            <CarouselNext className="static ml-0 transform-none h-8 w-8 sm:h-10 sm:w-10" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default ShopByCategory;
