
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const ProfileMenu: React.FC = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <div className="relative">
      {user ? (
        <>
          <Button 
            variant="ghost" 
            size="sm"
            className="flex items-center gap-2 text-shop-dark-gray hover:text-shop-blue"
            onClick={toggleProfileMenu}
          >
            <User className="h-5 w-5" />
            <span className="hidden md:inline">{user.name}</span>
          </Button>
          
          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <Link 
                to="/account" 
                className="block px-4 py-2 text-sm text-shop-dark-gray hover:bg-gray-100"
                onClick={() => setIsProfileMenuOpen(false)}
              >
                Account
              </Link>
              <Link 
                to="/orders" 
                className="block px-4 py-2 text-sm text-shop-dark-gray hover:bg-gray-100"
                onClick={() => setIsProfileMenuOpen(false)}
              >
                Orders
              </Link>
              <Link 
                to="/blog-landing" 
                className="block px-4 py-2 text-sm text-shop-dark-gray hover:bg-gray-100"
                onClick={() => setIsProfileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                to="/blog" 
                className="block px-4 py-2 text-sm text-shop-dark-gray hover:bg-gray-100"
                onClick={() => setIsProfileMenuOpen(false)}
              >
                Blog CMS
              </Link>
              <Link 
                to="/product-form" 
                className="block px-4 py-2 text-sm text-shop-dark-gray hover:bg-gray-100"
                onClick={() => setIsProfileMenuOpen(false)}
              >
                Add Product
              </Link>
              <Link 
                to="/product-listing" 
                className="block px-4 py-2 text-sm text-shop-dark-gray hover:bg-gray-100"
                onClick={() => setIsProfileMenuOpen(false)}
              >
                Product Listing
              </Link>
              <button 
                onClick={() => {
                  logout();
                  setIsProfileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-shop-dark-gray hover:bg-gray-100"
              >
                Sign out
              </button>
            </div>
          )}
        </>
      ) : (
        <Button 
          variant="ghost" 
          size="sm"
          asChild
        >
          <Link to="/login" className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <span className="hidden md:inline">Sign In</span>
          </Link>
        </Button>
      )}
    </div>
  );
};

export default ProfileMenu;
