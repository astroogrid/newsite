
/**
 * Optimizes an image URL by adding query parameters for width, quality, and format
 * 
 * @param url Original image URL
 * @param width Desired image width in pixels
 * @param quality Image quality (0-100)
 * @returns Optimized image URL
 */
export const getOptimizedImageUrl = (
  url: string, 
  width: number = 800, 
  quality: number = 80
): string => {
  // Handle null or undefined URLs
  if (!url) return '';
  
  // Check if URL already has query parameters
  const hasParams = url.includes('?');
  const separator = hasParams ? '&' : '?';
  
  // Add optimization parameters
  return `${url}${separator}w=${width}&q=${quality}&auto=format&fit=crop`;
};

/**
 * Generates a slug from a string by converting to lowercase and replacing non-alphanumeric characters with hyphens
 * 
 * @param text Text to slugify
 * @returns SEO-friendly slug
 */
export const generateSlug = (text: string): string => {
  return text.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};
