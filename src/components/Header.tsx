import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './header/Logo';
import DesktopNav from './header/DesktopNav';
import SearchForm from './header/SearchForm';
import FavoritesButton from './header/FavoritesButton';
import CartButton from './header/CartButton';
import ProfileMenu from './header/ProfileMenu';
import MobileMenu from './header/MobileMenu';
import MegaMenu from './MegaMenu';
import { useAuth } from '@/contexts/AuthContext';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  // Check if current page is a blog page
  const isBlogPage = location.pathname === '/blog' || location.pathname.startsWith('/blog/') || location.pathname === '/blog-landing' || location.pathname === '/temple';

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex h-14 sm:h-16 items-center justify-between gap-2">
          {/* Left section - Logo and Desktop Navigation */}
          <div className="flex items-center gap-3 sm:gap-6 flex-shrink-0 min-w-0">
            <Logo />
            {/* Hide desktop navigation on mobile to save space */}
            <div className="hidden lg:block">
              <DesktopNav />
            </div>
          </div>
          
          {/* Right section - Search, Actions, and Mobile Menu */}
          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 flex-shrink-0">
            {/* Search Form - Hidden on mobile, visible on sm+ */}
            <SearchForm />
            
            {/* Desktop Actions - Hidden on mobile and small tablets */}
            <div className="hidden lg:flex items-center space-x-2 sm:space-x-3">
              <FavoritesButton />
              <CartButton />
              <ProfileMenu />
            </div>
            
            {/* Mobile Menu - Only visible on mobile and small tablets */}
            <div className="block lg:hidden">
              <MobileMenu onSearch={handleSearch} />
            </div>
          </div>
        </div>
        
        {/* Mega Menu - Desktop only, hidden on blog pages */}
        {!isBlogPage && (
          <div className="hidden lg:block">
            <MegaMenu />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
