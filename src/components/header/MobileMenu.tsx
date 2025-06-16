
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search, User, ShoppingCart, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { mobileMenu } from '@/data/menu';
import MobileMegaMenu from '@/components/megamenu/MobileMegaMenu';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileMenuProps {
  onSearch: (query: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ onSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsOpen(false);
    }
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="min-h-[44px] min-w-[44px]">
          <Menu className="h-6 w-6 text-shop-dark-gray" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      
      <SheetContent side="right" className="w-full max-w-sm p-0 bg-white">
        <SheetHeader className="p-6 pb-0">
          <SheetTitle className="text-left text-shop-black">Menu</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full">
          {/* Search Section */}
          <div className="p-6 pb-4">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <Input
                  placeholder="Search products..."
                  className="pl-10 pr-4 h-11 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-shop-gray" />
                <button 
                  type="submit" 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-shop-blue hover:text-shop-dark-gray"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>

          <Separator />

          {/* Quick Actions */}
          <div className="p-6 py-4">
            <div className="grid grid-cols-3 gap-4">
              <Link 
                to="/cart" 
                className="flex flex-col items-center justify-center p-4 rounded-lg hover:bg-gray-50 transition-colors min-h-[60px] touch-manipulation"
                onClick={handleLinkClick}
              >
                <div className="relative mb-2">
                  <ShoppingCart className="h-6 w-6 text-shop-dark-gray" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 h-5 w-5 bg-shop-blue text-white text-xs rounded-full flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className="text-xs text-shop-dark-gray">Cart</span>
              </Link>
              
              <Link 
                to="/favorites" 
                className="flex flex-col items-center justify-center p-4 rounded-lg hover:bg-gray-50 transition-colors min-h-[60px] touch-manipulation"
                onClick={handleLinkClick}
              >
                <Heart className="h-6 w-6 text-shop-dark-gray mb-2" />
                <span className="text-xs text-shop-dark-gray">Favorites</span>
              </Link>
              
              <Link 
                to={user ? "/account" : "/login"} 
                className="flex flex-col items-center justify-center p-4 rounded-lg hover:bg-gray-50 transition-colors min-h-[60px] touch-manipulation"
                onClick={handleLinkClick}
              >
                <User className="h-6 w-6 text-shop-dark-gray mb-2" />
                <span className="text-xs text-shop-dark-gray">
                  {user ? "Account" : "Sign In"}
                </span>
              </Link>
            </div>
          </div>

          <Separator />

          {/* Categories Section */}
          <div className="p-6 py-4">
            <h3 className="text-sm font-semibold text-shop-dark-gray mb-3">Categories</h3>
            <MobileMegaMenu />
          </div>

          <Separator />

          {/* Main Navigation */}
          <div className="flex-1 p-6 py-4">
            <h3 className="text-sm font-semibold text-shop-dark-gray mb-3">Navigation</h3>
            <nav className="space-y-2">
              {mobileMenu.map(item => (
                <Link 
                  key={item.id}
                  to={item.link} 
                  className="block py-3 px-3 text-shop-dark-gray hover:bg-gray-50 rounded-lg transition-colors min-h-[44px] flex items-center touch-manipulation"
                  onClick={handleLinkClick}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* User Actions */}
          {user && (
            <>
              <Separator />
              <div className="p-6 pt-4">
                <Button 
                  variant="outline" 
                  className="w-full min-h-[44px]" 
                  onClick={() => {
                    logout();
                    handleLinkClick();
                  }}
                >
                  Sign Out
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
