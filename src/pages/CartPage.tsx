
import React from 'react';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { useCart, CartItem } from '@/contexts/CartContext';
import Header from '@/components/Header';
import SEO from '@/components/SEO';
import RelatedProducts from '@/components/RelatedProducts';
import RecentViewsSection from '@/components/cart/RecentViewsSection';
import EmptyCartView from '@/components/cart/EmptyCartView';
import CartHeader from '@/components/cart/CartHeader';
import CartItemsList from '@/components/cart/CartItemsList';
import OrderSummary from '@/components/cart/OrderSummary';
import { useProductRecommendations } from '@/hooks/useRecommendations';

const CartPage: React.FC = () => {
  useScrollToTop();
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems, clearCart } = useCart();
  const recommendedProducts = useProductRecommendations(cart);

  const handleQuantityChange = (item: CartItem, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(item.id, newQuantity, item.size, item.color);
    }
  };
  
  if (cart.length === 0) {
    return <EmptyCartView />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <SEO
        title="Your Shopping Cart"
        description="View and manage items in your shopping cart."
      />
      
      <main className="flex-grow container py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <CartHeader cartLength={cart.length} onClearCart={clearCart} />
          
          <div className="grid md:grid-cols-3 gap-8">
            <CartItemsList
              cart={cart}
              onQuantityChange={handleQuantityChange}
              onRemoveFromCart={removeFromCart}
            />
            
            <OrderSummary totalItems={totalItems} totalPrice={totalPrice} />
          </div>
        </div>
        <RecentViewsSection />
        <RelatedProducts products={recommendedProducts} />
      </main>
    </div>
  );
};

export default CartPage;
