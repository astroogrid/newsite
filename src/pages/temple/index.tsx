import React from 'react';
import Header from '@/components/Header';
import SEO from '@/components/SEO';

const TemplePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <SEO
        title="Temple"
        description="Explore temple details and information"
      />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold">Temple Page</h1>
        </div>
      </main>
    </div>
  )
}

export default TemplePage;
