
import React from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface ImageSkeletonProps {
  className?: string;
}

const ImageSkeleton: React.FC<ImageSkeletonProps> = ({ className }) => {
  return (
    <Skeleton className={cn("absolute inset-0 bg-muted", className)} />
  );
};

export default ImageSkeleton;
