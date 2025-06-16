import React, { useState, useEffect, useCallback } from 'react';
import { BlogPost } from '@/types/blog';
import astrologyBlogPosts from '@/data/json/astrologyBlogPosts.json';
import { BlogContext } from './createBlogContext';

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  const loadDefaultPosts = useCallback(() => {
    // Clean and format the astrology posts
    const cleanedPosts = (astrologyBlogPosts as BlogPost[]).map(post => ({
      ...post,
      status: post.status || 'published',
      publishDate: post.publishDate || new Date().toISOString(),
      tags: post.tags || [],
      categories: post.categories || ['Astrology'],
      seo: {
        metaTitle: post.seo?.metaTitle || post.title,
        metaDescription: post.seo?.metaDescription || post.excerpt,
        keywords: post.seo?.keywords || post.title.split(' ').join(', '),
        canonicalUrl: post.seo?.canonicalUrl || ``,
        ogImage: post.seo?.ogImage || post.featuredImage || ''
      }
    }));
    
    setPosts(cleanedPosts);
    localStorage.setItem('blog-posts', JSON.stringify(cleanedPosts));
  }, []);

  const loadPosts = useCallback(() => {
    const savedPosts = localStorage.getItem('blog-posts');
    if (savedPosts) {
      try {
        const parsedPosts = JSON.parse(savedPosts);
        setPosts(parsedPosts);
      } catch (error) {
        console.error('Error parsing saved posts:', error);
        loadDefaultPosts();
      }
    } else {
      loadDefaultPosts();
    }
  }, [loadDefaultPosts]);

  // Load posts from localStorage on mount
  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  // Save posts to localStorage whenever posts change
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem('blog-posts', JSON.stringify(posts));
    }
  }, [posts]);

  const addPost = useCallback((post: BlogPost) => {
    setPosts(currentPosts => [post, ...currentPosts]);
  }, []);

  const updatePost = useCallback((id: string, updatedPost: BlogPost) => {
    setPosts(currentPosts => 
      currentPosts.map(post => post.id === id ? updatedPost : post)
    );
  }, []);

  const deletePost = useCallback((id: string) => {
    setPosts(currentPosts => 
      currentPosts.filter(post => post.id !== id)
    );
  }, []);

  const getPost = useCallback((id: string) => {
    return posts.find(post => post.id === id);
  }, [posts]);

  const refreshPosts = useCallback(() => {
    loadPosts();
  }, [loadPosts]);

  const value = {
    posts,
    setPosts,
    addPost,
    updatePost,
    deletePost,
    getPost,
    refreshPosts
  };

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  );
};
