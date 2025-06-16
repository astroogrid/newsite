import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import { mockStays } from '@/data/airbnb';

interface FilteredStaysProps {
  activeCategory: string;
}

const FilteredStays: React.FC<FilteredStaysProps> = ({ activeCategory }) => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [filteredStays, setFilteredStays] = useState(mockStays);

  // Use useEffect to handle category changes
  useEffect(() => {
    setIsLoading(true);
    const filterStays = () => {
      if (activeCategory === "all") {
        setFilteredStays(mockStays);
      } else {
        const filtered = mockStays.filter(stay => 
          stay.categories?.includes(activeCategory.toLowerCase()) || false
        );
        setFilteredStays(filtered);
      }
    };
    
    filterStays();
    setIsLoading(false);
  }, [activeCategory]);

  const toggleFavorite = (stayId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(stayId)) {
      newFavorites.delete(stayId);
    } else {
      newFavorites.add(stayId);
    }
    setFavorites(newFavorites);
  };

  return (
    <main className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8">
      <motion.div 
        key={activeCategory}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {isLoading ? (
          <div className="flex justify-center py-8 sm:py-12">
            <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <>
            {filteredStays.length > 0 ? (
              <Carousel className="w-full" opts={{ slidesToScroll: 3 }}>
                <CarouselContent className="-ml-3">
                  {filteredStays.map((stay, index) => (
                    <CarouselItem key={`${activeCategory}-${stay.id}`} className="pl-2 sm:pl-3 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="group"
                      >
                        <Card className="border-none shadow-none overflow-hidden">
                          <div className="relative rounded-xl overflow-hidden">
                            <Link to={`/stays/ooty-india/${stay.id}`}>
                              <img
                                src={stay.images[0]}
                                alt={stay.title}
                                className="w-full h-32 sm:h-40 md:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                              />
                            </Link>
                            <button
                              onClick={() => toggleFavorite(stay.id)}
                              className="absolute top-2 sm:top-3 right-2 sm:right-3 p-1.5 sm:p-1 rounded-full bg-black/20 hover:bg-black/40 transition-colors min-h-[44px] min-w-[44px] sm:min-h-auto sm:min-w-auto flex items-center justify-center"
                            >
                              <Heart
                                className={`h-4 w-4 sm:h-3 sm:w-3 ${
                                  favorites.has(stay.id) ? 'fill-red-500 text-red-500' : 'text-white'
                                }`}
                              />
                            </button>
                            {stay.host.isSuperhost && (
                              <Badge className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-white text-black text-xs">
                                Superhost
                              </Badge>
                            )}
                          </div>
                          
                          <CardContent className="p-0 pt-2 sm:pt-3">
                            <Link to={`/stays/ooty-india/${stay.id}`}>
                              <div className="flex items-center justify-between mb-1">
                                <h3 className="font-semibold text-gray-900 truncate text-xs sm:text-sm">{stay.location}</h3>
                                <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                                  <Star className="h-2 w-2 fill-gray-500" />
                                  <span className="text-xs text-gray-500 font-medium">{stay.rating}</span>
                                </div>
                              </div>
                              <div className="hidden items-center gap-1">
                                <span className="font-semibold text-sm">₹{stay.price.toLocaleString()}</span>
                              </div>
                            </Link>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-end gap-2 mt-4 sm:mt-6">
                  <CarouselPrevious className="static ml-0 mr-2 transform-none h-8 w-8 sm:h-10 sm:w-10" />
                  <CarouselNext className="static ml-0 transform-none h-8 w-8 sm:h-10 sm:w-10" />
                </div>
              </Carousel>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 sm:py-12"
              >
                <p className="text-gray-500 text-base sm:text-lg px-4">No items found in the {activeCategory} category.</p>
              </motion.div>
            )}
          </>
        )}
      </motion.div>
    </main>
  );
};

export default FilteredStays;
