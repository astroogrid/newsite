
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';
import { CartItem } from '@/contexts/CartContext';
import LazyImage from '@/components/LazyImage';

interface CartNotificationPopoverProps {
  item: CartItem | null;
  isVisible: boolean;
  onClose: () => void;
}

const CartNotificationPopover: React.FC<CartNotificationPopoverProps> = ({
  item,
  isVisible,
  onClose,
}) => {
  useEffect(() => {
    if (isVisible && item) {
      // Auto close after 4 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, item, onClose]);

  if (!item) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100, y: -20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 100, y: -20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-4 right-4 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm w-80"
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex space-x-3 flex-1">
                  <div className="flex-shrink-0 w-16 h-16">
                    <LazyImage
                      src={item.image}
                      alt={item.name}
                      width={64}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      Added to cart
                    </p>
                    <p className="text-sm text-gray-600 max-w-40 truncate mt-1">
                      {item.name}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm font-semibold text-gray-900">
                        ${item.price.toFixed(2)}
                      </span>
                      {item.quantity > 1 && (
                        <span className="text-xs text-gray-500">
                          × {item.quantity}
                        </span>
                      )}
                    </div>
                    {(item.size || item.color) && (
                      <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                        {item.size && <span>Size: {item.size}</span>}
                        {item.color && <span>Color: {item.color}</span>}
                      </div>
                    )}
                  </div>
                </div>
                
                <button
                  onClick={onClose}
                  className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartNotificationPopover;
