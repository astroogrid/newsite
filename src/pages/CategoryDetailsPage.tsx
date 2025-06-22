
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, Heart, Share, ChevronLeft, ChevronRight, X, 
  Wifi, Car, Waves, Coffee, Mountain, Users, Calendar,
  Shield, MapPin, Globe, Menu, User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Helmet } from 'react-helmet-async';
import { mockStays, mockReviews, Review } from '@/data/airbnb';
import ReviewPopup from '@/components/airbnb/ReviewPopup';
import Header from '@/components/Header';

const StayDetailsPage = () => {
  const { location, stayId } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const stay = mockStays.find(s => s.id === stayId);
  
  if (!stay) {
    return <div>Stay not found</div>;
  }

  const toggleFavorite = () => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(stay.id)) {
      newFavorites.delete(stay.id);
    } else {
      newFavorites.add(stay.id);
    }
    setFavorites(newFavorites);
  };

  const amenityIcons: { [key: string]: React.ReactNode } = {
    'WiFi': <Wifi className="h-6 w-6" />,
    'Kitchen': <Coffee className="h-6 w-6" />,
    'Free parking': <Car className="h-6 w-6" />,
    'Hot tub': <Waves className="h-6 w-6" />,
    'Pool': <Waves className="h-6 w-6" />,
    'Mountain view': <Mountain className="h-6 w-6" />,
  };

  const displayedReviews = showAllReviews ? mockReviews : mockReviews.slice(0, 6);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{stay.title} - Airbnb Clone</title>
        <meta name="description" content={stay.description} />
      </Helmet>

      {/* Header */}
    <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Title and actions */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-2">{stay.title}</h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-black" />
                <span className="font-medium">{stay.rating}</span>
                <span className="text-gray-500">({stay.reviewCount} reviews)</span>
              </div>
              <span className="text-gray-500">·</span>
              <span className="text-gray-500">{stay.location}</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="ghost" size="sm" onClick={toggleFavorite}>
                <Heart className={`h-4 w-4 mr-2 ${favorites.has(stay.id) ? 'fill-red-500 text-red-500' : ''}`} />
                Save
              </Button>
            </div>
          </div>
        </div>

        {/* Photo gallery */}
        <div className="grid grid-cols-4 grid-rows-2 gap-2 h-96 mb-8 rounded-xl overflow-hidden">
          <div className="col-span-2 row-span-2 relative">
            <img
              src={stay.images[1]}
              alt={stay.title}
              className="w-full h-full object-cover cursor-pointer hover:brightness-90 transition-all"
              onClick={() => setShowAllPhotos(true)}
            />
          </div>
          {stay.images.slice(1, 5).map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt={`${stay.title} ${index + 2}`}
                className="w-full h-full object-cover cursor-pointer hover:brightness-90 transition-all"
                onClick={() => setShowAllPhotos(true)}
              />
              {index === 3 && (
                <div
                  className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer"
                  onClick={() => setShowAllPhotos(true)}
                >
                  <span className="text-white font-medium">Show all photos</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left column */}
          <div className="lg:col-span-2">
            {/* Host info */}
            <div className="border-b border-gray-200 pb-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-1">
                    {stay.type} hosted by {stay.host.name}
                  </h2>
                  <div className="text-gray-600">
                    {stay.maxGuests} guests · {stay.bedrooms} bedrooms · {stay.beds} beds · {stay.bathrooms} baths
                  </div>
                </div>
                <img
                  src={stay.host.avatar}
                  alt={stay.host.name}
                  className="w-12 h-12 rounded-full"
                />
              </div>
            </div>

            {/* Property highlights */}
            <div className="border-b border-gray-200 pb-6 mb-6">
              <div className="space-y-4">
                {stay.host.isSuperhost && (
                  <div className="flex items-center gap-4">
                    <Shield className="h-6 w-6 text-[#FF5A5F]" />
                    <div>
                      <div className="font-medium">{stay.host.name} is a Superhost</div>
                      <div className="text-gray-600 text-sm">Superhosts are experienced, highly rated hosts.</div>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-4">
                  <MapPin className="h-6 w-6" />
                  <div>
                    <div className="font-medium">Great location</div>
                    <div className="text-gray-600 text-sm">90% of recent guests gave the location a 5-star rating.</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Calendar className="h-6 w-6" />
                  <div>
                    <div className="font-medium">Free cancellation for 48 hours</div>
                    <div className="text-gray-600 text-sm">Get a full refund if you change your mind.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="border-b border-gray-200 pb-6 mb-6">
              <p className="text-gray-700 leading-relaxed">{stay.description}</p>
            </div>

            {/* Amenities */}
            <div className="border-b border-gray-200 pb-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">What this place offers</h3>
              <div className="grid grid-cols-2 gap-4">
                {stay.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {amenityIcons[amenity] || <div className="w-6 h-6" />}
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews section */}
            <div className="pb-6 mb-6">
              <div className="flex items-center gap-2 mb-6">
                <Star className="h-5 w-5 fill-black" />
                <span className="text-xl font-semibold">{stay.rating} · {stay.reviewCount} reviews</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayedReviews.map((review) => (
                  <motion.div
                    key={review.id}
                    className="cursor-pointer p-4 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => setSelectedReview(review)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={review.avatar}
                        alt={review.author}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="font-medium">{review.author}</div>
                        <div className="text-sm text-gray-500">{review.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-black" />
                      ))}
                    </div>
                    <p className="text-gray-700 text-sm line-clamp-3">{review.comment}</p>
                  </motion.div>
                ))}
              </div>

              {!showAllReviews && mockReviews.length > 6 && (
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => setShowAllReviews(true)}
                >
                  Show all {mockReviews.length} reviews
                </Button>
              )}
            </div>
          </div>

          {/* Right column - Booking card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="border border-gray-200 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <span className="text-2xl font-semibold">₹{stay.price.toLocaleString()}</span>
                      <span className="text-gray-600">night</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-black" />
                      <span className="font-medium">{stay.rating}</span>
                      <span className="text-gray-500">({stay.reviewCount})</span>
                    </div>
                  </div>

                  <div className="border border-gray-300 rounded-lg mb-4">
                    <div className="grid grid-cols-2">
                      <div className="p-3 border-r border-gray-300">
                        <div className="text-xs font-medium uppercase text-gray-600">Check-in</div>
                        <div className="text-sm">Add date</div>
                      </div>
                      <div className="p-3">
                        <div className="text-xs font-medium uppercase text-gray-600">Check-out</div>
                        <div className="text-sm">Add date</div>
                      </div>
                    </div>
                    <div className="p-3 border-t border-gray-300">
                      <div className="text-xs font-medium uppercase text-gray-600">Guests</div>
                      <div className="text-sm">1 guest</div>
                    </div>
                  </div>

                  <Button className="w-full bg-[#FF5A5F] hover:bg-[#E00007] text-white">
                    Reserve
                  </Button>

                  <p className="text-center text-sm text-gray-600 mt-3">
                    You won't be charged yet
                  </p>

                  <div className="mt-6 space-y-3">
                    <div className="flex justify-between">
                      <span className="underline">₹{stay.price.toLocaleString()} x 5 nights</span>
                      <span>₹{(stay.price * 5).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="underline">Cleaning fee</span>
                      <span>₹1,500</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="underline">Service fee</span>
                      <span>₹2,800</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>₹{(stay.price * 5 + 1500 + 2800).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Photo gallery modal */}
      <AnimatePresence>
        {showAllPhotos && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black"
          >
            <div className="flex items-center justify-between p-4 text-white">
              <Button variant="ghost" onClick={() => setShowAllPhotos(false)}>
                <X className="h-6 w-6" />
              </Button>
              <span className="text-lg font-medium">
                {currentImageIndex + 1} / {stay.images.length}
              </span>
            </div>
            <div className="flex items-center justify-center h-full px-16">
              <Button
                variant="ghost"
                className="absolute left-4 text-white"
                onClick={() => setCurrentImageIndex(prev => 
                  prev === 0 ? stay.images.length - 1 : prev - 1
                )}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
              <img
                src={stay.images[currentImageIndex]}
                alt={`${stay.title} ${currentImageIndex + 1}`}
                className="max-h-full max-w-full object-contain"
              />
              <Button
                variant="ghost"
                className="absolute right-4 text-white"
                onClick={() => setCurrentImageIndex(prev => 
                  prev === stay.images.length - 1 ? 0 : prev + 1
                )}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Review popup */}
      <ReviewPopup
        review={selectedReview}
        isOpen={!!selectedReview}
        onClose={() => setSelectedReview(null)}
      />
    </div>
  );
};

export default StayDetailsPage;
