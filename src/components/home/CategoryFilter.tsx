
import React from 'react';
import { motion } from 'framer-motion';
import { Search, Globe, Menu, User, Star, Heart, UserRoundCheck } from 'lucide-react';
import categoriesData from '@/data/json/homeCategories.json';

const iconMap = { Heart, Star, Globe, User, Menu, Search, UserRoundCheck };
const categories = ([{ name: "All", icon: "Search", filter: "all" }, ...(categoriesData as Array<{name:string;icon:keyof typeof iconMap;filter:string;}>)]).map(cat => ({
  ...cat,
  icon: React.createElement(iconMap[cat.icon])
}));

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ activeCategory, onCategoryChange }) => {
  const handleCategoryClick = (category: string) => {
    onCategoryChange(category);
  };

  return (
    <div className="border-b border-gray-200">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex items-center gap-4 sm:gap-6 lg:gap-8 py-3 sm:py-4 overflow-x-auto scrollbar-hide">
          {categories.map((category, index) => (
            <motion.button
              key={index}
              onClick={() => handleCategoryClick(category.filter)}
              className={`flex flex-col items-center min-w-fit gap-1 sm:gap-2 pb-2 border-b-2 transition-all duration-300 touch-manipulation relative ${
                activeCategory === category.filter
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-600 hover:border-gray-300'
              }`}
              whileHover={{ 
                scale: 1.05,
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.2,
                delay: index * 0.05
              }}
            >
              <motion.span 
                className="text-xl sm:text-2xl flex-shrink-0"
                whileHover={{ 
                  rotate: [0, -10, 10, 0],
                  transition: { duration: 0.5 }
                }}
              >
                {/* {category.icon} */}
              </motion.span>
              <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                {category.name}
              </span>
              
              {/* Hover background effect */}
              <motion.div
                className="absolute inset-0 bg-gray-100 rounded-lg opacity-0 -z-10"
                whileHover={{ opacity: 0.1 }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
