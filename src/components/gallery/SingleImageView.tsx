import React from 'react';
import { motion } from 'framer-motion';
import LazyImage from '../LazyImage';

interface SingleImageViewProps {
  src: string;
  alt: string;
  onClick: () => void;
}

const SingleImageView: React.FC<SingleImageViewProps> = ({ src, alt, onClick }) => {
  return (
    <motion.div 
      className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      <LazyImage
        src={src}
        alt={alt}
        width={800}
        aspectRatio="square"
        className="w-full h-full object-cover hover:brightness-90 transition-all"
      />
    </motion.div>
  );
};

export default SingleImageView;
