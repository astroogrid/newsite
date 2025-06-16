
import React, { useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Tag, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useBlog } from '@/hooks/useBlog';
import SEO from '@/components/SEO';
import BlogNavigation from '@/components/blog/BlogNavigation';
import SocialShare from '@/components/blog/SocialShare';
import LazyImage from '@/components/LazyImage';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import Header from '@/components/Header';

// Simple header without mega menu for blog pages
const BlogHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-30 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex h-14 sm:h-16 items-center justify-between gap-2">
          <div className="flex items-center gap-3 sm:gap-6 flex-shrink-0 min-w-0">
            <Link to="/" className="text-xl font-bold text-purple-600 hover:text-purple-700 transition-colors">
              Cosmic Insights
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                Home
              </Link>
              <Link to="/blog-landing" className="text-purple-600 font-medium">
                Blog
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

const BlogArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { posts } = useBlog();
  const location = useLocation();
  
  // Scroll to top when route changes
  useScrollToTop();
  
  const post = posts.find(p => p.slug === slug);
  const currentIndex = posts.findIndex(p => p.slug === slug);
  const previousPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <BlogHeader />
        <div className="flex-grow container py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/blog">Back to Blog</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Related posts (same category or tag)
  const relatedPosts = posts
    .filter(p => p.id !== post.id && (
      p.categories.some(cat => post.categories.includes(cat)) ||
      p.tags.some(tag => post.tags.includes(tag))
    ))
    .slice(0, 3);

  const articleUrl = `${window.location.origin}/blog/${post.slug}`;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEO 
        title={post.seo.metaTitle || post.title}
        description={post.seo.metaDescription || post.excerpt}
        keywords={post.seo.keywords}
        url={post.seo.canonicalUrl}
        image={post.seo.ogImage}
        type="article"
      />
      
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Button variant="ghost" asChild className="mb-4 hover:bg-gray-50 transition-colors">
                <Link to="/blog-landing" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Articles
                </Link>
              </Button>
            </motion.div>

            {/* Featured Image */}
            {post.featuredImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mb-8 rounded-2xl max-h-48 hover:max-h-60 transition-all overflow-hidden shadow-sm"
              >
                <LazyImage
                  src={post.featuredImage}
                  alt={post.title}
                  aspectRatio="landscape"
                  className="hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            )}

            {/* Article Header */}
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-12"
            >
              <div className="flex flex-wrap gap-3 mb-6">
                {post.categories.map((category, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  >
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors">
                      {category}
                    </Badge>
                  </motion.div>
                ))}
              </div>

              <h1 className="text-xl font-medium mb-1 leading-tight text-gray-900">
                {post.title}
              </h1>

              <p className="text-lg  text-gray-600 mb-8">
                {post.excerpt}
              </p>

              <div className="hidden flex-wrap items-center gap-8 text-gray-500 pb-8 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{post.author}</div>
                    <div className="text-sm text-gray-500">Astrology Expert</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{new Date(post.publishDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  <span>5 min read</span>
                </div>
              </div>
            </motion.header>


            {/* Article Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Card className="mb-12 border-0 mainAricleCard">
                <CardContent className="p-0">
                  <div 
                    className="prose prose-lg max-w-none prose-headings:font-light prose-headings:text-gray-900 prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-p:leading-relaxed prose-p:text-gray-700 prose-p:font-light prose-a:text-purple-600 prose-a:no-underline hover:prose-a:underline prose-a:decoration-purple-500 prose-a:decoration-2 prose-a:underline-offset-4 prose-blockquote:border-l-4 prose-blockquote:border-purple-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:font-light prose-blockquote:text-gray-600 prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-img:rounded-lg prose-img:shadow-md prose-strong:text-gray-900 prose-strong:font-medium prose-ul:space-y-2 prose-ol:space-y-2 prose-li:text-gray-700"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </CardContent>
              </Card>
            </motion.div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mb-12"
              >
                <h3 className="text-xl font-light text-gray-900 mb-4">Topics</h3>
                <div className="flex flex-wrap gap-3">
                  {post.tags.map((tag, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                    >
                      <Badge variant="outline" className="hover:bg-purple-50 hover:border-purple-200 transition-colors cursor-pointer">
                        #{tag}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Social Share Bottom */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <Share2 className="h-5 w-5 text-gray-600" />
                <span className="text-lg font-light text-gray-900">Share this insight</span>
              </div>
              <SocialShare 
                url={articleUrl}
                title={post.title}
                description={post.excerpt}
              />
            </motion.div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="mb-16"
            >
              <BlogNavigation 
                previousPost={previousPost}
                nextPost={nextPost}
              />
            </motion.div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="pt-8 border-t border-gray-100"
              >
                <h2 className="text-xl font-light text-gray-900 mb-4">Related Insights</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {relatedPosts.map((relatedPost, index) => (
                    <motion.div
                      key={relatedPost.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.3 + index * 0.1 }}
                    >
                      <Card className="hover:shadow-lg transition-all duration-300 group border-1 border-gray-100 overflow-hidden">
                        <CardContent className="p-0">
                          {relatedPost.featuredImage && (
                            <div className="aspect-video overflow-hidden">
                              <LazyImage
                                src={relatedPost.featuredImage}
                                alt={relatedPost.title}
                                aspectRatio="video"
                                className="group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                          )}
                          <div className="p-3 bg-gray-50">
                            <h3 className="font-medium mb-3 line-clamp-2 text-gray-900 group-hover:text-purple-700 transition-colors">
                              <Link 
                                to={`/blog/${relatedPost.slug}`}
                                className="hover:underline decoration-purple-500"
                              >
                                {relatedPost.title}
                              </Link>
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-3 mb-4 font-light">
                              {relatedPost.excerpt}
                            </p>
                            <div className="text-xs text-gray-500">
                              {new Date(relatedPost.publishDate).toLocaleDateString()}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default BlogArticlePage;
