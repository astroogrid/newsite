
import React, { useState } from 'react';
import { Helmet } from "react-helmet-async";
import { useScrollToTop } from '@/hooks/useScrollToTop';
import Header from "@/components/Header";
import CategoryFilter from "@/components/home/CategoryFilter";
import FilteredStays from "@/components/home/FilteredStays";
import HomeFooter from "@/components/home/HomeFooter";

const CategoryPage = () => {
  useScrollToTop();
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Category | AstrooGrid Astrology Predictions Store</title>
        <meta
          name="description"
          content="Browse our categories of spiritual and wellness products including horoscope, gemstones, rudraksha, and more."
        />
        <meta
          property="og:title"
          content="Category | AstrooGrid Astrology Predictions Store"
        />
        <meta
          property="og:description"
          content="Browse our categories of spiritual and wellness products including horoscope, gemstones, rudraksha, and more."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://AstrooGrid-store.com/category" />
      </Helmet>

      <Header />

      <main className="flex-grow">
        <CategoryFilter 
          activeCategory={activeCategory} 
          onCategoryChange={setActiveCategory} 
        />
        <FilteredStays activeCategory={activeCategory} />
      </main>

      <HomeFooter />
    </div>
  );
};

export default CategoryPage;
