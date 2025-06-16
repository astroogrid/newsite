import React, { KeyboardEvent } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import LazyImage from '../LazyImage';
import { cn } from '@/lib/utils';

interface FullscreenGalleryProps {
  images: {
    id: number;
    url: string;
    alt: string;
  }[];
  isOpen: boolean;
  currentIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSelectImage: (index: number) => void;
  onKeyDown: (e: KeyboardEvent) => void;
}

const FullscreenGallery: React.FC<FullscreenGalleryProps> = ({
  images,
  isOpen,
  currentIndex,
  onClose,
  onPrevious,
  onNext,
  onSelectImage,
  onKeyDown,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-screen-xl w-full p-0 h-[90vh] bg-black" onKeyDown={onKeyDown}>
        <div className="relative w-full h-full flex flex-col">
          {/* Header with close button and image count */}
          <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 text-white">
            <span className="text-lg font-medium">
              {currentIndex + 1} / {images.length}
            </span>
            <button 
              className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* Main image */}
          <div className="flex-1 flex items-center justify-center">
            <button 
              className="absolute left-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={onPrevious}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <LazyImage
              src={images[currentIndex]?.url || ''}
              alt={images[currentIndex]?.alt || 'Product image'}
              className="max-h-[500px] max-w-full object-contain"
              width={1200}
            />
            
            <button 
              className="absolute right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={onNext}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
          
          {/* Thumbnails */}
          {/* <div className="bg-black/90 p-4 hidden">
            <ScrollArea className="w-full">
              <div className="flex space-x-2">
                {images.map((img, idx) => (
                  <div
                    key={img.id}
                    className={cn(
                      "w-16 h-16 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg",
                      idx === currentIndex ? "ring-2 ring-white" : "opacity-70 hover:opacity-100"
                    )}
                    onClick={() => onSelectImage(idx)}
                  >
                    <LazyImage
                      src={img.url}
                      alt={`Thumbnail ${idx + 1}`}
                      width={100}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FullscreenGallery;
