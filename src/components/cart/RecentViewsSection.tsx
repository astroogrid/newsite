
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Eye } from 'lucide-react';
import { useRecentViews } from '@/contexts/RecentViewsContext';
import { Button } from '@/components/ui/button';

const RecentViewsSection: React.FC = () => {
  const { recentViews, clearRecentViews } = useRecentViews();

  if (recentViews.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 border-t pt-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-xl font-semibold">Recently Viewed</h2>
        </div>
        <Button variant="outline" size="sm" onClick={clearRecentViews}>
          Clear All
        </Button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {recentViews.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="group"
          >
            <Link 
              to={`/product/${item.id}/${item.slug || ''}`}
              className="block bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="h-3 w-3" />
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium line-clamp-2 mb-1">{item.name}</h3>
                <p className="text-sm font-semibold text-primary">${item.price.toFixed(2)}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentViewsSection;
