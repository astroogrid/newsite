
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import { heroBanners } from '@/data/banners';

const HeroBanner = () => {
  return (
    <section className="relative">
      <Carousel className="w-full" opts={{ loop: true }}>
        <CarouselContent className="h-[70vh]">
          {heroBanners.map((banner) => (
            <CarouselItem key={banner.id} className="relative h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10" />
              <img 
                src={banner.bgImage} 
                alt={banner.title} 
                className="w-full h-full object-cover"
              />
              <motion.div 
                className="absolute inset-0 z-20 container flex flex-col justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold text-white max-w-md">{banner.title}</h1>
                <p className="text-xl text-white/80 mt-4 max-w-md">
                  {banner.subtitle}
                </p>
                <div className="mt-8">
                  <Link to={banner.buttonLink}>
                    <Button size="lg" className="bg-shop-blue hover:bg-shop-light-blue">
                      {banner.buttonText}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 bg-white/20 hover:bg-white/40 border-none text-white" />
        <CarouselNext className="right-4 bg-white/20 hover:bg-white/40 border-none text-white" />
      </Carousel>
    </section>
  );
};

export default HeroBanner;
