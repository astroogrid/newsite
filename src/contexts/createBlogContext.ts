import { createContext } from 'react';
import { BlogPost } from '@/types/blog';

export interface BlogContextType {
  posts: BlogPost[];
  setPosts: (posts: BlogPost[]) => void;
  addPost: (post: BlogPost) => void;
  updatePost: (id: string, post: BlogPost) => void;
  deletePost: (id: string) => void;
  getPost: (id: string) => BlogPost | undefined;
  refreshPosts: () => void;
}

export const BlogContext = createContext<BlogContextType | undefined>(undefined);
