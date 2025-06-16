
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Category } from '@/data/categories';

interface MobileCategorySubmenuProps {
  category: Category;
}

const MobileCategorySubmenu: React.FC<MobileCategorySubmenuProps> = ({ category }) => {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="ml-4 mt-2 space-y-1"
    >
      {category.subcategories.map((subcategory) => (
        <Link 
          key={subcategory.id}
          to={`/category/${category.slug}/${subcategory.slug}`}
          className="block py-2 px-3 text-sm text-shop-dark-gray hover:bg-gray-50 hover:text-shop-blue transition-colors rounded-md"
        >
          {subcategory.name}
        </Link>
      ))}
      <Link 
        to={`/category/${category.slug}`}
        className="block py-2 px-3 text-sm text-shop-blue font-medium hover:bg-gray-50 transition-colors rounded-md"
      >
        View all {category.name}
      </Link>
    </motion.div>
  );
};

export default MobileCategorySubmenu;
