import React from 'react';
import { motion } from 'framer-motion';
import { Maximize } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import LazyImage from '../LazyImage';

interface GridGalleryProps {
  images: {
    id: number;
    url: string;
    alt: string;
  }[];
  onImageClick: (index: number) => void;
}

const GridGallery: React.FC<GridGalleryProps> = ({ images, onImageClick }) => {
  return (
    <motion.div 
      className="grid grid-cols-4 grid-rows-2 gap-2 h-96 rounded-xl overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Featured large image */}
      <div 
        className="col-span-2 row-span-2 relative cursor-pointer"
        onClick={() => onImageClick(0)}
      >
        <LazyImage
          src={images[0]?.url || ''}
          alt={images[0]?.alt || 'Product featured image'}
          width={800}
          className="w-full h-full object-cover hover:brightness-90 transition-all"
        />
      </div>

      {/* Gallery grid items */}
      {images.slice(1, 5).map((image, index) => (
        <div 
          key={image.id} 
          className="relative cursor-pointer"
          onClick={() => onImageClick(index + 1)}
        >
          <LazyImage
            src={image.url}
            alt={image.alt}
            width={400}
            className="w-full h-full object-cover hover:brightness-90 transition-all"
          />
          
          {/* Show all photos overlay on the last image */}
          {index === 3 && (
            <div
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer"
              onClick={() => onImageClick(index + 1)}
            >
              <span className="text-white font-medium">Show all photos</span>
            </div>
          )}
        </div>
      ))}
    </motion.div>
  );
};

export default GridGallery;
