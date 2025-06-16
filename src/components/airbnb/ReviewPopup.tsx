
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Review } from '@/data/airbnb';

interface ReviewPopupProps {
  review: Review | null;
  isOpen: boolean;
  onClose: () => void;
}

const ReviewPopup: React.FC<ReviewPopupProps> = ({ review, isOpen, onClose }) => {
  if (!review) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed right-1 bottom-5 z-50 w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 mx-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Review Details</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="rounded-full h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Author Info */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={review.avatar}
                alt={review.author}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{review.author}</h4>
                <p className="text-sm text-gray-500">{review.date}</p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={`h-4 w-4 ${
                      index < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{review.rating}/5</span>
            </div>

            {/* Review Content */}
            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed">{review.comment}</p>
            </div>

            {/* Helpful Section */}
            {review.helpful && (
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {review.helpful} people found this helpful
                  </span>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <ThumbsUp className="h-3 w-3" />
                    Helpful
                  </Button>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <Button variant="outline" className="flex-1" onClick={onClose}>
                Close
              </Button>
              <Button className="flex-1 bg-[#FF5A5F] hover:bg-[#E00007]">
                Report Review
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ReviewPopup;
