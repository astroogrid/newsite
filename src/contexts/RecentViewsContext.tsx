import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface RecentViewItem {
  id: number;
  name: string;
  price: number;
  image: string;
  slug?: string;
  viewedAt: number;
}

interface RecentViewsContextType {
  recentViews: RecentViewItem[];
  addToRecentViews: (product: RecentViewItem) => void;
  clearRecentViews: () => void;
}

const RecentViewsContext = createContext<RecentViewsContextType | undefined>(undefined);

export const RecentViewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recentViews, setRecentViews] = useState<RecentViewItem[]>([]);
  
  // Load recent views from localStorage on initial render
  useEffect(() => {
    const savedRecentViews = localStorage.getItem('recentViews');
    if (savedRecentViews) {
      try {
        const parsed = JSON.parse(savedRecentViews);
        // Filter out views older than 30 days
        const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
        const validViews = parsed.filter((view: RecentViewItem) => view.viewedAt > thirtyDaysAgo);
        setRecentViews(validViews);
      } catch (e) {
        console.error('Failed to parse recent views from localStorage:', e);
      }
    }
  }, []);
  
  // Save recent views to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('recentViews', JSON.stringify(recentViews));
  }, [recentViews]);
  
  const addToRecentViews = useCallback((product: RecentViewItem) => {
    setRecentViews(prevViews => {
      // Remove existing entry if it exists
      const filteredViews = prevViews.filter(view => view.id !== product.id);

      // Add new entry at the beginning with current timestamp
      const newView = { ...product, viewedAt: Date.now() };

      // Keep only the last 10 items
      return [newView, ...filteredViews].slice(0, 10);
    });
  }, []);
  
  const clearRecentViews = useCallback(() => {
    setRecentViews([]);
  }, []);
  
  return (
    <RecentViewsContext.Provider value={{ 
      recentViews, 
      addToRecentViews, 
      clearRecentViews 
    }}>
      {children}
    </RecentViewsContext.Provider>
  );
};

export const useRecentViews = () => {
  const context = useContext(RecentViewsContext);
  if (context === undefined) {
    throw new Error('useRecentViews must be used within a RecentViewsProvider');
  }
  return context;
};
