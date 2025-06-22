
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Category } from '@/data/categories';
import FeaturedProducts from './FeaturedProducts';

interface MegaMenuDropdownProps {
  category: Category;
}

const MegaMenuDropdown: React.FC<MegaMenuDropdownProps> = ({ category }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="absolute left-0 mt-2 w-screen max-w-4xl border bg-white/95 backdrop-blur-sm shadow-lg rounded-lg z-50"
      style={{ width: 'max-content', minWidth: '800px' }}
    >
      <div className="grid grid-cols-3 gap-8 p-6">
        {/* Subcategories */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-4">Categories</h3>
          <ul className="space-y-2">
            {category.subcategories.map((subcategory) => (
              <li key={subcategory.id}>
                <Link 
                  to={`/category/${category.slug}/${subcategory.slug}`}
                  className="text-shop-dark-gray group transition-all hover:text-shop-blue flex items-center text-sm hover:underline"
                >
                  <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 -ml-2 group-hover:ml-0 transition-all delay-75" />
                  {subcategory.name}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link 
                to={`/category/${category.slug}`}
                className="text-shop-blue hover:underline font-medium text-sm"
              >
                View all {category.name}
              </Link>
            </li>
          </ul>
        </div>
        
        {/* Featured Products */}
        <div className="col-span-2">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Featured Products</h3>
          <FeaturedProducts products={category.featured} />
        </div>
      </div>
    </motion.div>
  );
};

export default MegaMenuDropdown;
