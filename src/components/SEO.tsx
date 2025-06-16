
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = '',
  image = 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
  url = window.location.href,
  type = 'website'
}) => {
  const siteName = 'MOMENT';
  
  return (
    <Helmet>
      {/* Basic metadata */}
      <title>{`${title} | ${siteName}`}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Canonical */}
      <link rel="canonical" href={url} />
      
      {/* JSON-LD structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": type === 'product' ? "Product" : "WebPage",
          "name": title,
          "description": description,
          "image": image,
          ...(type === 'product' && {
            "offers": {
              "@type": "Offer",
              "availability": "https://schema.org/InStock",
              "price": "599.99",
              "priceCurrency": "USD"
            }
          })
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
