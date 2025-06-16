
import React from 'react';
import { GalleryHorizontal, Grid3X3 } from 'lucide-react';

interface GalleryViewToggleProps {
  viewMode: 'grid' | 'single';
  onToggleView: () => void;
  onShowAllGallery?: () => void;
}

const GalleryViewToggle: React.FC<GalleryViewToggleProps> = ({
  viewMode,
  onToggleView,
  onShowAllGallery
}) => {
  return (
    <div className="flex justify-between mb-2">
      {viewMode === 'grid' && (
        <button
          onClick={onShowAllGallery}
          className="px-3 py-1 text-sm rounded bg-white shadow-md hover:bg-gray-100 transition-colors flex items-center"
          aria-label="View all photos"
        >
          <GalleryHorizontal className="h-4 w-4 mr-1" />
          View all photos
        </button>
      )}
      
      <button
        onClick={onToggleView}
        className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
        aria-label={viewMode === 'grid' ? "Switch to single image view" : "Switch to grid view"}
      >
        {viewMode === 'grid' ? (
          <GalleryHorizontal className="h-5 w-5 text-gray-700" />
        ) : (
          <Grid3X3 className="h-5 w-5 text-gray-700" />
        )}
      </button>
    </div>
  );
};

export default GalleryViewToggle;
