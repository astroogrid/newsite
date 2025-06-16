
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Clock, ArrowRight, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BlogPost } from '@/types/blog';
import LazyImage from '@/components/LazyImage';

interface RecentPostsProps {
  posts: BlogPost[];
}

const RecentPosts: React.FC<RecentPostsProps> = ({ posts }) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <h3 className="text-2xl font-light text-gray-900 mb-4">No articles found</h3>
          <p className="text-gray-600 font-light">Try adjusting your search or category filter to discover cosmic insights</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
        {/* <div className="flex items-center justify-between">
          <h2 className="text-3xl font-light text-gray-900">Latest Insights</h2>
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>Updated daily</span>
          </div>
        </div> */}
      
      <div className="space-y-8">
        {posts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group"
          >
            <Card className="hover:shadow-xl transition-all duration-500 group border-0 bg-white overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row">
                  {post.featuredImage && (
                    <div className="lg:w-80 lg:flex-shrink-0">
                      <div className="relative overflow-hidden h-64 lg:h-full">
                        <LazyImage
                          src={post.featuredImage}
                          alt={post.title}
                          aspectRatio="landscape"
                          className="group-hover:scale-105 rounded-md overflow-hidden transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    </div>
                  )}
                  
                  <div className="flex-1 px-8 lg:px-10 flex flex-col justify-center">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.categories.slice(0, 2).map((category, catIndex) => (
                        <Badge key={catIndex} variant="outline" className="text-xs font-medium hover:bg-purple-50 hover:border-purple-200 transition-colors">
                          {category}
                        </Badge>
                      ))}
                    </div>
                    
                    <h3 className="text-lg font-light mb-4 leading-tight text-gray-900 group-hover:text-purple-700 transition-colors duration-300">
                      <Link to={`/blog/${post.slug}`} className="hover:underline decoration-purple-500 decoration-2 underline-offset-4">
                        {post.title}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed font-light line-clamp-3 text-md">
                      {post.excerpt}
                    </p>
                    
                    
                  </div>
                </div>
                <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        {/* <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-white" />
                          </div>
                          <span className="font-medium">{post.author}</span>
                        </div> */}
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{new Date(post.publishDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}</span>
                        </div>
                        <div className="hidden sm:flex items-center gap-1 text-purple-600">
                          <span>5 min read</span>
                        </div>
                      </div>
                      
                      <Link
                        to={`/blog/${post.slug}`}
                        className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors group/link font-medium px-4 py-2 rounded-full hover:bg-purple-50"
                      >
                        <span className="hidden sm:inline text-sm">Read Article</span>
                        <span className="sm:hidden">Read</span>
                        <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
              </CardContent>
            </Card>
          </motion.article>
        ))}
      </div>
      
      {posts.length > 10 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center pt-8"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-105 font-medium"
          >
            Explore More Articles
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default RecentPosts;
