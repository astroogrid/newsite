
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import ProductBreadcrumb from '@/components/ProductBreadcrumb';
import ProductReviews from '@/components/ProductReviews';
import RelatedProducts from '@/components/RelatedProducts';
import ProductContent from '@/components/product/ProductContent';
import PageFooter from '@/components/product/PageFooter';
import SEO from '@/components/SEO';
import { getProductById } from '@/data/products';
import { useProductRecommendations } from '@/hooks/useRecommendations';

const ProductPage: React.FC = () => {
  const { id, slug } = useParams<{ id: string, slug?: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const recommendedProducts = useProductRecommendations(product);

  // Scroll to top whenever the product ID changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);
  
  useEffect(() => {
    const fetchProduct = () => {
      setIsLoading(true);
      const productId = parseInt(id || '0', 10);
      const foundProduct = getProductById(productId);
      
      if (foundProduct) {
        setProduct(foundProduct);
        
        
        // If slug is missing or doesn't match the product slug, update URL for SEO
        if (!slug || slug !== foundProduct.slug) {
          navigate(`/product/${productId}/${foundProduct.slug}`, { replace: true });
        }
      } else {
        // If product not found, could redirect to a 404 page or catalog
        navigate('/catalog', { replace: true });
      }
      setIsLoading(false);
    };
    
    fetchProduct();
  }, [id, slug, navigate]);

  if (isLoading || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container py-8">
          <div className="flex items-center justify-center h-full">
            <div className="animate-pulse text-xl">Loading product details...</div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <SEO
        title={product.name}
        description={product.description}
        keywords={`${product.name}, camera, photography, ${product.category}`}
        image={product.image}
        type="product"
      />
      
      <main className="flex-grow">
        <div className="max-w-6xl mx-auto w-full px-4 py-4">
          <ProductBreadcrumb productName={product.name} categoryName={product.category} />
        </div>
        
        <div className="w-full">
          <ProductContent product={product} />
        </div>
        
        <div className="container max-w-5xl mx-auto py-8 px-4">
          <ProductReviews 
            reviews={product.reviews || []}
            averageRating={product.rating}
            totalReviews={product.reviews?.length || 0}
          />
          
          <RelatedProducts products={recommendedProducts} />
        </div>
      </main>
      
      <PageFooter />
    </div>
  );
};

export default ProductPage;
