
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/components/ui/sonner';
import { useProducts } from './ProductContext';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
  tags?: string[];
}

interface EnhancedCartContextType {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (id: number, size?: string, color?: string) => void;
  updateQuantity: (id: number, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  lastAddedItem: CartItem | null;
  showNotification: boolean;
  hideNotification: () => void;
}

const EnhancedCartContext = createContext<EnhancedCartContextType | undefined>(undefined);

export const EnhancedCartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [lastAddedItem, setLastAddedItem] = useState<CartItem | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const { products, getProductById } = useProducts();

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('enhancedCart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart from localStorage:', e);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('enhancedCart', JSON.stringify(cart));
  }, [cart]);

  // Auto-update cart items when products change
  useEffect(() => {
    setCart(prevCart => {
      return prevCart.map(cartItem => {
        const updatedProduct = getProductById(cartItem.id);
        if (updatedProduct) {
          return {
            ...cartItem,
            name: updatedProduct.name,
            price: updatedProduct.price,
            image: updatedProduct.image
          };
        }
        return cartItem;
      }).filter(cartItem => {
        // Remove items from cart if product no longer exists
        const productExists = getProductById(cartItem.id);
        if (!productExists) {
          toast.info(`${cartItem.name} was removed from your cart as it's no longer available.`);
          return false;
        }
        return true;
      });
    });
  }, [products, getProductById]);

  const addToCart = (product: CartItem) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => 
        item.id === product.id && 
        item.size === product.size && 
        item.color === product.color
      );
      
      if (existingItemIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += product.quantity;
        
        setLastAddedItem({
          ...updatedCart[existingItemIndex]
        });
        setShowNotification(true);
        
        toast.success('Cart updated!', {
          description: `${product.name} quantity updated in your cart.`,
        });
        return updatedCart;
      } else {
        setLastAddedItem(product);
        setShowNotification(true);
        
        toast.success('Added to cart!', {
          description: `${product.name} added to your cart.`,
        });
        return [...prevCart, product];
      }
    });
  };

  const removeFromCart = (id: number, size?: string, color?: string) => {
    setCart(prevCart => {
      const itemToRemove = prevCart.find(
        item => item.id === id && item.size === size && item.color === color
      );
      if (itemToRemove) {
        toast.success('Item removed', {
          description: `${itemToRemove.name} removed from your cart.`,
        });
      }
      return prevCart.filter(
        item => !(item.id === id && item.size === size && item.color === color)
      );
    });
  };

  const updateQuantity = (id: number, quantity: number, size?: string, color?: string) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id && item.size === size && item.color === color
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast.success('Cart cleared', {
      description: 'All items have been removed from your cart.',
    });
  };

  const hideNotification = () => {
    setShowNotification(false);
    setLastAddedItem(null);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <EnhancedCartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      lastAddedItem,
      showNotification,
      hideNotification
    }}>
      {children}
    </EnhancedCartContext.Provider>
  );
};

export const useEnhancedCart = () => {
  const context = useContext(EnhancedCartContext);
  if (context === undefined) {
    throw new Error('useEnhancedCart must be used within an EnhancedCartProvider');
  }
  return context;
};
