
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/sonner';

// Define types for our cart
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

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (id: number, size?: string, color?: string) => void;
  updateQuantity: (
    id: number,
    quantity: number,
    size?: string,
    color?: string
  ) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  lastAddedItem: CartItem | null;
  showNotification: boolean;
  hideNotification: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [lastAddedItem, setLastAddedItem] = useState<CartItem | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
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
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  
  const addToCart = (product: CartItem) => {
    setCart(prevCart => {
      // Check if product already exists in cart
      const existingItemIndex = prevCart.findIndex(item => 
        item.id === product.id && 
        item.size === product.size && 
        item.color === product.color
      );
      
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += product.quantity;
        
        // Show notification for updated item
        setLastAddedItem({
          ...updatedCart[existingItemIndex]
        });
        setShowNotification(true);
        
        toast.success('Cart updated!', {
          description: `${product.name} quantity updated in your cart.`,
        });
        return updatedCart;
      } else {
        // Add new item
        setLastAddedItem(product);
        setShowNotification(true);
        
        toast.success('Added to cart!', {
          description: `${product.name} added to your cart.`,
        });
        return [...prevCart, product];
      }
    });
  };
  
  const removeFromCart = (
    id: number,
    size?: string,
    color?: string
  ) => {
    setCart(prevCart => {
      const itemToRemove = prevCart.find(
        item =>
          item.id === id &&
          item.size === size &&
          item.color === color
      );
      if (itemToRemove) {
        toast.success('Item removed', {
          description: `${itemToRemove.name} removed from your cart.`,
        });
      }
      return prevCart.filter(
        item =>
          !(
            item.id === id &&
            item.size === size &&
            item.color === color
          )
      );
    });
  };
  
  const updateQuantity = (
    id: number,
    quantity: number,
    size?: string,
    color?: string
  ) => {
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
  
  // Calculate total items and price
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  return (
    <CartContext.Provider value={{ 
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
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
