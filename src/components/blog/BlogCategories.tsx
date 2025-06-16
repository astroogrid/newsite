
import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

interface BlogCategoriesProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const BlogCategories: React.FC<BlogCategoriesProps> = ({
  categories,
  selectedCategory,
  onCategoryChange
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category, index) => (
        <motion.button
          key={category}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          onClick={() => onCategoryChange(category)}
          className="transition-all duration-200"
        >
          <Badge
            variant={selectedCategory === category ? "default" : "outline"}
            className={`capitalize px-4 py-2 text-sm cursor-pointer hover:shadow-md transition-all ${
              selectedCategory === category
                ? "bg-black text-white border-black"
                : "hover:bg-gray-100 hover:border-gray-400"
            }`}
          >
            {category === 'all' ? 'All Topics' : category}
          </Badge>
        </motion.button>
      ))}
    </div>
  );
};

export default BlogCategories;
