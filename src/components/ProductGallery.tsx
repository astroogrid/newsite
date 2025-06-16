
import React, { useState } from 'react';
import { 
  ThumbnailGallery, 
  SingleImageView, 
  GridGallery,
  FullscreenGallery,
  GalleryViewToggle
} from './gallery';

interface ProductImage {
  id: number;
  url: string;
  alt: string;
}

interface ProductGalleryProps {
  images: ProductImage[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [activeImage, setActiveImage] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'grid' | 'single'>('grid');
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);

  const handleViewModeToggle = () => {
    setViewMode(prevMode => prevMode === 'grid' ? 'single' : 'grid');
  };

  const openFullscreen = (index: number) => {
    setFullscreenIndex(index);
    setFullscreenOpen(true);
  };

  const handlePrevImage = () => {
    setFullscreenIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setFullscreenIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handlePrevImage();
    } else if (e.key === 'ArrowRight') {
      handleNextImage();
    } else if (e.key === 'Escape') {
      setFullscreenOpen(false);
    }
  };

  // Show all gallery option
  const showAllGallery = () => {
    setFullscreenOpen(true);
    setFullscreenIndex(0);
  };

  // Single view mode
  if (viewMode === 'single') {
    return (
      <div className="w-full space-y-4">
        <GalleryViewToggle 
          viewMode={viewMode}
          onToggleView={handleViewModeToggle}
        />
        
        <SingleImageView 
          src={images[activeImage]?.url || ''} 
          alt={images[activeImage]?.alt || 'Product image'}
          onClick={() => openFullscreen(activeImage)}
        />
        
        <ThumbnailGallery 
          images={images}
          activeImage={activeImage}
          setActiveImage={setActiveImage}
        />

        <FullscreenGallery 
          images={images}
          isOpen={fullscreenOpen}
          currentIndex={fullscreenIndex}
          onClose={() => setFullscreenOpen(false)}
          onPrevious={handlePrevImage}
          onNext={handleNextImage}
          onSelectImage={setFullscreenIndex}
          onKeyDown={handleKeyDown}
        />
      </div>
    );
  }

  // Grid view mode (Airbnb style)
  return (
    <div className="w-full">
      {/* <GalleryViewToggle 
        viewMode={viewMode}
        onToggleView={handleViewModeToggle}
        onShowAllGallery={showAllGallery}
      /> */}

      <GridGallery 
        images={images}
        onImageClick={openFullscreen}
      />

      {/* Show all photos button - visible only on mobile */}
      {images.length > 5 && (
        <div className="mt-4 md:hidden">
          <button 
            className="w-full py-2 border border-gray-300 rounded-lg font-medium bg-white hover:bg-gray-50"
            onClick={showAllGallery}
          >
            Show all photos ({images.length})
          </button>
        </div>
      )}

      <FullscreenGallery 
        images={images}
        isOpen={fullscreenOpen}
        currentIndex={fullscreenIndex}
        onClose={() => setFullscreenOpen(false)}
        onPrevious={handlePrevImage}
        onNext={handleNextImage}
        onSelectImage={setFullscreenIndex}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default ProductGallery;
