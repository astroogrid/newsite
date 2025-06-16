
import React from 'react';
import { Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import EnhancedProductTable from '@/components/tables/EnhancedProductTable';
import SEO from '@/components/SEO';
import { useAuth } from '@/contexts/AuthContext';

const ProductListingPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  // Redirect to login if user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <SEO
        title="Product Listing Management"
        description="Manage your product inventory with comprehensive listing, editing, and deletion capabilities."
      />
      
      <main className="flex-grow container py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Product Listing</h1>
          <p className="text-muted-foreground">Manage your product inventory</p>
        </div>
        
        <EnhancedProductTable />
      </main>
    </div>
  );
};

export default ProductListingPage;
