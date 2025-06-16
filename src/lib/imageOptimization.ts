
/**
 * Utility functions for image optimization
 */

/**
 * Optimizes an image URL by adding width and quality parameters
 * @param url The original image URL
 * @param width The desired width of the image
 * @returns The optimized image URL
 */
export const getOptimizedImageUrl = (url: string, width: number = 800): string => {
  if (!url) {
    return '/placeholder.svg'; // Fallback to placeholder image
  }

  // Skip optimization for SVGs and data URIs
  if (url.endsWith('.svg') || url.startsWith('data:')) {
    return url;
  }

  try {
    const urlObj = new URL(url);
    
    // Check if it's already an optimized URL
    if (urlObj.search) {
      return `${url}&w=${width}&q=80&auto=format`;
    }
    return `${url}?w=${width}&q=80&auto=format`;
  } catch (error) {
    console.error('Invalid image URL:', url);
    return '/placeholder.svg'; // Fallback to placeholder for invalid URLs
  }
};
