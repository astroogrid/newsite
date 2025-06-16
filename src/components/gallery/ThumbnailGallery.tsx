
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import LazyImage from '../LazyImage';

interface ThumbnailProps {
  images: {
    id: number;
    url: string;
    alt: string;
  }[];
  activeImage: number;
  setActiveImage: (index: number) => void;
}

const ThumbnailGallery: React.FC<ThumbnailProps> = ({
  images,
  activeImage,
  setActiveImage,
}) => {
  return (
    <ScrollArea className="w-full">
      <div className="flex space-x-3 pb-4 min-w-max">
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            className={cn(
              "product-thumbnail relative flex-shrink-0 cursor-pointer border-2 rounded-lg overflow-hidden w-20 h-20",
              activeImage === index ? "border-primary shadow-md" : "border-gray-200 hover:border-gray-300"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveImage(index)}
          >
            <LazyImage
              src={image.url}
              alt={`Thumbnail ${index + 1}`}
              width={120}
              className="w-full h-full object-cover"
            />
            
            {/* Active indicator overlay */}
            {activeImage === index && (
              <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ThumbnailGallery;
