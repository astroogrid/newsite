
/**
 * Utility functions for aspect ratio calculations
 */

/**
 * Gets the appropriate CSS class for an aspect ratio
 * @param aspectRatio The aspect ratio to convert to a CSS class
 * @returns The corresponding CSS class
 */
export const getAspectRatioClass = (
  aspectRatio: 'square' | 'video' | 'portrait' | 'landscape' | number | undefined
): string => {
  if (typeof aspectRatio === 'number') {
    return `aspect-[${aspectRatio}]`;
  }
  
  switch (aspectRatio) {
    case 'square': return 'aspect-square';
    case 'video': return 'aspect-video';
    case 'portrait': return 'aspect-[3/4]';
    case 'landscape': return 'aspect-[4/3]';
    default: return 'aspect-square';
  }
};
