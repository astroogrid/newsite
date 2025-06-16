
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BlogPost } from '@/types/blog';
import LazyImage from '@/components/LazyImage';

interface FeaturedArticlesProps {
  posts: BlogPost[];
}

const FeaturedArticles: React.FC<FeaturedArticlesProps> = ({ posts }) => {
  if (posts.length === 0) return null;

  const [featuredPost, ...otherPosts] = posts;

  return (
    <section className="py-20 bg-gray-50/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Featured Article */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-8"
            >
              <Card className="group hover:shadow-md transition-all duration-500 overflow-hidden border-0 bg-white">
                <div className="relative overflow-hidden">
                  <LazyImage
                    src={featuredPost.featuredImage || ''}
                    alt={featuredPost.title}
                    aspectRatio="landscape"
                    className="group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-6 left-6">
                    <Badge className="bg-black/80 text-white backdrop-blur-sm">
                      Featured Story
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-8 lg:p-10">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredPost.categories.slice(0, 2).map((category, index) => (
                      <Badge key={index} variant="outline" className="text-xs font-medium">
                        {category}
                      </Badge>
                    ))}
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-light mb-4 leading-tight text-gray-900 group-hover:text-purple-700 transition-colors duration-300">
                    <Link to={`/blog/${featuredPost.slug}`} className="hover:underline decoration-purple-500">
                      {featuredPost.title}
                    </Link>
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed text-lg font-light line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span className="font-medium">{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{new Date(featuredPost.publishDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <Link
                      to={`/blog/${featuredPost.slug}`}
                      className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors group/link font-medium"
                    >
                      Read Article
                      <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Secondary Featured Articles */}
            <div className="lg:col-span-4 space-y-6">
              {otherPosts.slice(0, 3).map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                >
                  <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden border-0 bg-white">
                    <div className="flex h-full">
                      <div className="w-32 flex-shrink-0">
                        <LazyImage
                          src={post.featuredImage || ''}
                          alt={post.title}
                          aspectRatio="square"
                          className="group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      
                      <CardContent className="flex-1 p-6">
                        <div className="flex flex-wrap gap-1 mb-2">
                          {post.categories.slice(0, 1).map((category, catIndex) => (
                            <Badge key={catIndex} variant="outline" className="text-xs">
                              {category}
                            </Badge>
                          ))}
                        </div>
                        
                        <h3 className="font-medium mb-2 leading-tight text-gray-900 group-hover:text-purple-700 transition-colors duration-300 line-clamp-2">
                          <Link to={`/blog/${post.slug}`} className="hover:underline decoration-purple-500">
                            {post.title}
                          </Link>
                        </h3>
                        
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2 font-light">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>{post.author}</span>
                          </div>
                          <span>•</span>
                          <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedArticles;
