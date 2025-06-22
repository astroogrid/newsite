
import React, { useState } from 'react';
import { Helmet } from "react-helmet-async";
import { useScrollToTop } from '@/hooks/useScrollToTop';
import Header from "@/components/Header";
import BentoGrid from "@/components/home/BentoGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import ShopByCategory from "@/components/ShopByCategory";
import CategoryFilter from "@/components/home/CategoryFilter";
import FilteredStays from "@/components/home/FilteredStays";
import HomeFooter from "@/components/home/HomeFooter";

const Index = () => {
  useScrollToTop();
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>AstrooGrid | Astrology Predictions Store</title>
        <meta
          name="description"
          content="Professional grade equipment for photographers at every level. Shop cameras, lenses, and accessories."
        />
        <meta
          property="og:title"
          content="AstrooGrid | Astrology Predictions Store"
        />
        <meta
          property="og:description"
          content="Professional grade equipment for photographers at every level. Shop cameras, lenses, and accessories."
        />
        <meta
          property="og:image"
          content="https://images.unsplash.com/photo-1542038784456-1ea8e935640e"
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://AstrooGrid-store.com/" />
      </Helmet>

      <Header />

      <main className="flex-grow">
        <BentoGrid />
        <CategoryFilter 
          activeCategory={activeCategory} 
          onCategoryChange={setActiveCategory} 
        />
        <FilteredStays activeCategory={activeCategory} />
        <FeaturedProducts />
        <ShopByCategory />
      </main>

      <HomeFooter />
    </div>
  );
};

export default Index;
