
import React from 'react';

interface ImageErrorProps {
  className?: string;
}

const ImageError: React.FC<ImageErrorProps> = ({ className }) => {
  return (
    <div className={`absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground text-sm ${className}`}>
      Failed to load image
    </div>
  );
};

export default ImageError;
