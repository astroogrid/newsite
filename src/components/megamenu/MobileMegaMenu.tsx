
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { categories } from '@/data/categories';
import MobileCategorySubmenu from './MobileCategorySubmenu';

const MobileMegaMenu: React.FC = () => {
  const [openCategory, setOpenCategory] = useState<number | null>(null);
  
  const handleCategoryClick = (categoryId: number) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId);
  };
  
  return (
    <div className="space-y-1">
      {categories.map((category) => (
        <div key={category.id}>
          <button
            onClick={() => handleCategoryClick(category.id)}
            className="w-full flex items-center justify-between py-3 px-3 text-shop-dark-gray hover:bg-gray-50 rounded-lg transition-colors"
          >
            <span className="font-medium">{category.name}</span>
            <ChevronDown 
              className={`h-4 w-4 transition-transform duration-200 ${
                openCategory === category.id ? 'rotate-180' : ''
              }`} 
            />
          </button>
          
          {openCategory === category.id && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <MobileCategorySubmenu category={category} />
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MobileMegaMenu;
