
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import SEO from '@/components/SEO';
import RecentViewsSection from './RecentViewsSection';

const EmptyCartView: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <SEO
        title="Your Shopping Cart"
        description="View and manage items in your shopping cart."
      />
      
      <main className="flex-grow container py-12 px-4">
        <div className="max-w-2xl mx-auto text-center py-12">
          <div className="mb-6 flex justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ShoppingCart className="h-24 w-24 text-gray-300" />
            </motion.div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-shop-dark-gray mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Button asChild>
            <Link to="/">Continue Shopping</Link>
          </Button>
        </div>
        <RecentViewsSection />
      </main>
    </div>
  );
};

export default EmptyCartView;
