
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/data/types/product';
import { products as initialProducts } from '@/data/products';
import { toast } from '@/components/ui/sonner';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (id: number, updates: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  getProductById: (id: number) => Product | undefined;
  categories: string[];
  brands: string[];
  refreshProducts: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  // Load products from localStorage or use initial data
  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      try {
        const parsedProducts = JSON.parse(savedProducts);
        setProducts(parsedProducts);
      } catch (error) {
        console.error('Failed to parse saved products:', error);
        setProducts(initialProducts);
      }
    } else {
      setProducts(initialProducts);
    }
  }, []);

  // Save products to localStorage whenever products change
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('products', JSON.stringify(products));
    }
  }, [products]);

  const addProduct = (productData: Omit<Product, 'id'>): Product => {
    const newId = Math.max(...products.map(p => p.id), 0) + 1;
    const newProduct: Product = {
      ...productData,
      id: newId,
      slug: productData.name.toLowerCase().replace(/\s+/g, '-'),
      rating: productData.rating || 0
    };

    setProducts(prev => [...prev, newProduct]);
    toast.success('Product added successfully!');
    return newProduct;
  };

  const updateProduct = (id: number, updates: Partial<Product>) => {
    setProducts(prev => prev.map(product => 
      product.id === id 
        ? { 
            ...product, 
            ...updates,
            slug: updates.name ? updates.name.toLowerCase().replace(/\s+/g, '-') : product.slug
          }
        : product
    ));
    toast.success('Product updated successfully!');
  };

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(product => product.id !== id));
    toast.success('Product deleted successfully!');
  };

  const getProductById = (id: number): Product | undefined => {
    return products.find(product => product.id === id);
  };

  const refreshProducts = () => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      try {
        const parsedProducts = JSON.parse(savedProducts);
        setProducts(parsedProducts);
      } catch (error) {
        console.error('Failed to refresh products:', error);
      }
    }
  };

  // Get unique categories and brands
  const categories = [...new Set(products.map(p => p.category))].filter(Boolean);
  const brands = [...new Set(products.map(p => p.brand))].filter(Boolean);

  return (
    <ProductContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      getProductById,
      categories,
      brands,
      refreshProducts
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
