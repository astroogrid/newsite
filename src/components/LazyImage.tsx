
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { getOptimizedImageUrl } from '@/lib/imageOptimization';
import { getAspectRatioClass } from '@/lib/aspectRatioUtils';
import ImageSkeleton from './image/ImageSkeleton';
import ImageError from './image/ImageError';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape' | number;
  className?: string;
  width?: number;
  height?: number;
  skeletonClassName?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  aspectRatio = 'square',
  className,
  width,
  skeletonClassName,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  
  const optimizedSrc = getOptimizedImageUrl(src, width || 800);
  const aspectRatioClass = getAspectRatioClass(aspectRatio);
  
  return (
    <div className={cn(aspectRatioClass, "relative overflow-hidden", className)}>
      {!isLoaded && !isError && (
        <ImageSkeleton className={skeletonClassName} />
      )}
      
      {isError ? (
        <ImageError />
      ) : (
        <img
          src={optimizedSrc}
          alt={alt}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300",
            !isLoaded && "opacity-0"
          )}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsError(true)}
          {...props}
        />
      )}
    </div>
  );
};

export default LazyImage;
