
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Globe, Menu, User, Star, Heart, UserRoundCheck } from 'lucide-react';
import categoriesData from '@/data/json/homeCategories.json';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Helmet } from 'react-helmet-async';
import { mockStays } from '@/data/airbnb';

const AirbnbHomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (stayId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(stayId)) {
      newFavorites.delete(stayId);
    } else {
      newFavorites.add(stayId);
    }
    setFavorites(newFavorites);
  };

  const iconMap = { Heart, Star, Globe, User, Menu, Search, UserRoundCheck };
  const categories = (categoriesData as Array<{ name: string; icon: keyof typeof iconMap }>).map(cat => ({
    name: cat.name,
    icon: React.createElement(iconMap[cat.icon])
  }));

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Category</title>
        <meta name="description" content="Find and book unique accommodations on Airbnb" />
      </Helmet>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <div className="text-2xl font-bold text-[#FF5A5F]">airbnb</div>
            </Link>

           

            {/* Right side */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded-full p-2">
                <Menu className="h-4 w-4 mr-2" />
                <User className="h-6 w-6 bg-gray-500 text-white rounded-full p-1" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Categories */}
      <div className="border-b border-gray-200">
        <div className=" container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8 py-4 overflow-x-auto">
            {categories.map((category, index) => (
              <button
                key={index}
                className="flex flex-col items-center min-w-fit gap-2 pb-2 border-b-2 border-transparent hover:border-gray-300 transition-colors"
              >
                <span className="text-2xl">{category.icon}</span>
                <span className="text-sm font-medium text-gray-600">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
       <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                {mockStays.map((stay) => (
                  <motion.div
                    key={stay.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="group"
                  >
                    <Card className="border-none shadow-none overflow-hidden">
                      <div className="relative rounded-xl overflow-hidden">
                        <Link to={`/stays/india/${stay.id}`}>
                          <img
                            src={stay.images[0]}
                            alt={stay.title}
                            className="w-full h-48 object-cover  group-hover:scale-105 transition-transform duration-300"
                          />
                        </Link>
                        <button
                          onClick={() => toggleFavorite(stay.id)}
                          className="absolute top-3 right-3 p-1 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
                        >
                          <Heart
                            className={`h-3 w-3 ${
                              favorites.has(stay.id) ? 'fill-red-500 text-red-500' : 'text-white'
                            }`}
                          />
                        </button>
                        {stay.host.isSuperhost && (
                          <Badge className="absolute top-3 left-3 bg-white text-black text-xs">
                            Superhost
                          </Badge>
                        )}
                      </div>
                      
                      <CardContent className="p-0 pt-3">
                        <Link to={`/stays/india/${stay.id}`}>
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-gray-900 truncate text-xs">{stay.location}</h3>
                            <div className="flex items-center gap-1">
                              <Star className="h-2 w-2 fill-gray-500" />
                              <span className="text-xs text-gray-500 font-medium">{stay.rating}</span>
                            </div>
                          </div>
                          <div className="hidden items-center gap-1 ">
                            <span className="font-semibold text-sm">₹{stay.price.toLocaleString()}</span>
                          </div>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:underline">Help Center</a></li>
                <li><a href="#" className="hover:underline">AirCover</a></li>
                <li><a href="#" className="hover:underline">Safety information</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:underline">Airbnb.org</a></li>
                <li><a href="#" className="hover:underline">Invite friends</a></li>
                <li><a href="#" className="hover:underline">Airbnb Newsroom</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Hosting</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:underline">Airbnb your home</a></li>
                <li><a href="#" className="hover:underline">Host an experience</a></li>
                <li><a href="#" className="hover:underline">Responsible hosting</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Airbnb</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:underline">Newsroom</a></li>
                <li><a href="#" className="hover:underline">New features</a></li>
                <li><a href="#" className="hover:underline">Careers</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AirbnbHomePage;
