
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider, useCart } from "@/contexts/CartContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { RecentViewsProvider } from "@/contexts/RecentViewsContext";
import { ProductProvider } from "@/contexts/ProductContext";
import { EnhancedCartProvider } from "@/contexts/EnhancedCartContext";
import { BlogProvider } from "@/contexts/BlogContext";
import { HelmetProvider } from "react-helmet-async";
import CartNotificationPopover from "@/components/cart/CartNotificationPopover";
import TemplePage from "./pages/temple";
import TemplateLandingPage from "./pages/TemplateLandingPage";
import TemplateBlogPage from "./pages/TemplateBlogPage";

import Index from "./pages/Index";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FavoritesPage from "./pages/FavoritesPage";
import CatalogPage from "./pages/CatalogPage";
import ProductHistoryPage from "./pages/ProductHistoryPage";
import AccountPage from "./pages/AccountPage";
import OrdersPage from "./pages/OrdersPage";
import ProductFormPage from "./pages/ProductFormPage";
import ProductListingPage from "./pages/ProductListingPage";
import NotFound from "./pages/NotFound";
import CategoryPage from "./pages/CategoryPage";
import StayDetailsPage from "./pages/StayDetailsPage";
import BlogPage from "./pages/BlogPage";
import BlogArticlePage from "./pages/BlogArticlePage";
import BlogLandingPage from "./pages/BlogLandingPage";

// Create QueryClient with proper settings for performance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const AppContent = () => {
  const { lastAddedItem, showNotification, hideNotification } = useCart();
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/template-landing" element={<TemplateLandingPage />} />
        <Route path="/template-blog/:slug" element={
          <BlogProvider>
            <TemplateBlogPage />
          </BlogProvider>
        } />
        <Route path="/blog-landing" element={
          <BlogProvider>
            <BlogLandingPage />
          </BlogProvider>
        } />
        <Route path="/blog/:slug" element={
          <BlogProvider>
            <BlogArticlePage />
          </BlogProvider>
        } />
        <Route path="/blog" element={
          <ProtectedRoute>
            <BlogPage />
          </ProtectedRoute>
        } />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/stays/:location/:stayId" element={<StayDetailsPage />} />
        <Route path="/product/:id/:slug?" element={<ProductPage />} />
        <Route path="/product/:id/:slug/history" element={<ProductHistoryPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/temple" element={<TemplePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/search" element={<CatalogPage />} />
        <Route path="/category/:categorySlug" element={<CatalogPage />} />
        <Route path="/category/:categoryId/:page" element={<CatalogPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/product-form" element={<ProductFormPage />} />
        <Route path="/product-listing" element={<ProductListingPage />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      <CartNotificationPopover
        item={lastAddedItem}
        isVisible={showNotification}
        onClose={hideNotification}
      />
      
      <Toaster />
      <Sonner />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <AuthProvider>
        <ProductProvider>
          <FavoritesProvider>
            <RecentViewsProvider>
              <CartProvider>
                <EnhancedCartProvider>
                  <BrowserRouter>
                    <TooltipProvider>
                      <AppContent />
                    </TooltipProvider>
                  </BrowserRouter>
                </EnhancedCartProvider>
              </CartProvider>
            </RecentViewsProvider>
          </FavoritesProvider>
        </ProductProvider>
      </AuthProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
