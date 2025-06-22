
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { categories } from '@/data/categories';
import MegaMenuDropdown from './MegaMenuDropdown';

const DesktopMegaMenu: React.FC = () => {
  const [openCategory, setOpenCategory] = useState<number | null>(null);
  
  const handleCategoryHover = (categoryId: number) => {
    setOpenCategory(categoryId);
  };
  
  const handleCategoryLeave = () => {
    setOpenCategory(null);
  };
  
  return (
    <div className="hidden md:flex">
      <ul className="flex space-x-8">
        {categories.map((category) => (
          <li
            key={category.id}
            className="py-4 relative"
            onMouseEnter={() => handleCategoryHover(category.id)}
            onMouseLeave={handleCategoryLeave}
          >
            <Link 
              to={`/category/${category.slug}`} 
              className="text-sm flex items-center text-shop-dark-gray hover:text-shop-blue transition-colors"
            >
              {category.name}
              <ChevronDown className="ml-1 h-4 w-4" />
            </Link>
            
            <AnimatePresence>
              {openCategory === category.id && (
                <MegaMenuDropdown category={category} />
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DesktopMegaMenu;
