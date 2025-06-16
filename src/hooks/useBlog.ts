import { useContext } from 'react';
import { BlogContext } from '@/contexts/createBlogContext';

export function useBlog() {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
}
