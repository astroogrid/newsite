
import React from 'react';
import { Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import EnhancedProductForm from '@/components/forms/EnhancedProductForm';
import SEO from '@/components/SEO';
import { useAuth } from '@/contexts/AuthContext';

const ProductFormPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  // Redirect to login if user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <SEO
        title="Add New Product"
        description="Create and manage product listings with detailed information and specifications."
      />
      
      <main className="flex-grow container py-8 px-4">
        <EnhancedProductForm />
      </main>
    </div>
  );
};

export default ProductFormPage;
