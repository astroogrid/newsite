
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, TrendingUp, BookOpen, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useBlog } from '@/hooks/useBlog';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import FeaturedArticles from '@/components/blog/FeaturedArticles';
import BlogCategories from '@/components/blog/BlogCategories';
import RecentPosts from '@/components/blog/RecentPosts';
import BlogFooter from '@/components/blog/BlogFooter';

const BlogLandingPage: React.FC = () => {
  const { posts, refreshPosts } = useBlog();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // We only want to refresh posts once when the component mounts
  useEffect(() => {
    refreshPosts();
    // We disable the exhaustive-deps lint rule because we intentionally want this to run only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get published posts only
  const publishedPosts = posts.filter(post => post.status === 'published');
  
  // Filter posts based on search and category
  const filteredPosts = publishedPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           post.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(publishedPosts.flatMap(post => post.categories)))];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEO 
        title="Cosmic Insights Blog"
        description="Discover profound astrological wisdom and cosmic insights from expert astrologers"
        keywords="astrology, cosmic insights, horoscope, zodiac, spiritual guidance"
        type="website"
      />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <Header />

        {/* Search and Categories */}
        <section className="border-b bg-gray-50/50">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search cosmic insights..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 border-2 focus:border-purple-500"
                  />
                </div>
                <Button size="lg" className="md:w-auto w-full bg-purple-600 hover:bg-purple-700">
                  Search
                </Button>
              </div>
              
              <div className="mt-10">
                <BlogCategories 
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Articles */}
        {/* <FeaturedArticles posts={publishedPosts.slice(0, 4)} /> */}

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                  <RecentPosts posts={filteredPosts} />
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="sticky top-20 space-y-8">
                    {/* Trending Topics */}
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <TrendingUp className="h-5 w-5 text-purple-600" />
                          <h3 className="font-semibold text-sm">Trending Topics</h3>
                        </div>
                        <div >
                          {categories.slice(1, 6).map((category, index) => (
                            <button
                              key={category}
                              onClick={() => setSelectedCategory(category)}
                              className="block w-full text-left p-2 hover:bg-purple-50 rounded-md transition-colors"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-sm capitalize">{category}</span>
                                <span className="text-xs text-gray-500">
                                  {publishedPosts.filter(p => p.categories.includes(category)).length}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Recommended Reading */}
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <BookOpen className="h-5 w-5 text-purple-600" />
                          <h3 className="font-semibold">Recommended Reading</h3>
                        </div>
                        <div className="space-y-4">
                          {publishedPosts.slice(0, 3).map((post) => (
                            <Link
                              key={post.id}
                              to={`/blog/${post.slug}`}
                              className="block group"
                            >
                              <h4 className="font-medium text-sm line-clamp-2 group-hover:text-purple-600 transition-colors">
                                {post.title}
                              </h4>
                              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                                <User className="h-3 w-3" />
                                <span>{post.author}</span>
                                <span>•</span>
                                <Clock className="h-3 w-3" />
                                <span>5 min read</span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <BlogFooter />
    </div>
  );
};

export default BlogLandingPage;
