
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ResizablePanelGroup, ResizablePanel } from '@/components/ui/resizable';
import Header from '@/components/Header';
import ProductHistorySidebar from '@/components/product-history/ProductHistorySidebar';
import ProductHistoryContent from '@/components/product-history/ProductHistoryContent';
import SEO from '@/components/SEO';
import PageFooter from '@/components/product/PageFooter';
import { getProductById, Product } from '@/data/products';
import { Button } from '@/components/ui/button';

const ProductHistoryPage: React.FC = () => {
  const { id, slug } = useParams<{ id: string; slug?: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const productId = parseInt(id, 10);
      const productData = getProductById(productId);
      
      if (productData) {
        setProduct(productData);
        
        // If slug is missing or doesn't match the product slug, update URL for SEO
        if (!slug || slug !== productData.slug) {
          navigate(`/product/${productId}/${productData.slug}/history`, { replace: true });
        }
      } else {
        // If product not found, redirect to catalog
        navigate('/catalog', { replace: true });
      }
      
      setIsLoading(false);
    }
  }, [id, slug, navigate]);

  if (isLoading || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container py-8">
          <div className="flex items-center justify-center h-full">
            <div className="animate-pulse text-xl">Loading product history...</div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <SEO
        title={`${product.name} - Product History`}
        description={`Learn about the history and development of ${product.name}`}
        keywords={`${product.name}, history, development, ${product.category}`}
        image={product.image}
        type="article"
      />

      <main className="flex-grow">
        <div className="container h-full py-6 px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="h-full flex flex-col"
          >
            <h1 className="text-lg font-bold">{product.name} - Product History</h1>
            <div className="flex justify-between items-center -ml-4">
              <Button variant='link'
                onClick={() => navigate(-1)}
              >
                ← Back
              </Button>
            </div>

            <div className="flex gap-6 flex-1">
              {/* Sticky Left Panel */}
              <div className="w-80 flex-shrink-0">
                <div className="sticky top-32 h-[calc(100vh-3rem)] overflow-hidden">
                  <ProductHistorySidebar product={product} />
                </div>
              </div>
              
              {/* Scrollable Content */}
              <div className="flex-1 min-w-0 pt-6">
                <ScrollArea className="h-full">
                  <div className="pr-4">
                    <ProductHistoryContent product={product} />
                  </div>
                </ScrollArea>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <PageFooter />
    </div>
  );
};

export default ProductHistoryPage;
