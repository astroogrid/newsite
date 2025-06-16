
import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BlogProvider } from '@/contexts/BlogContext';
import BlogPostsList from '@/components/blog/BlogPostsList';
import BlogPostForm from '@/components/blog/BlogPostForm';
import SEO from '@/components/SEO';

const BlogPage: React.FC = () => {
  return (
    <BlogProvider>
      <SEO 
        title="Blog CMS"
        description="Create, edit, and manage your blog posts with our comprehensive CMS"
        keywords="blog, cms, content management, seo, writing"
      />
      
      <div className="min-h-screen bg-gray-50/50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto py-8"
        >
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
              <TabsTrigger value="posts">All Posts</TabsTrigger>
              <TabsTrigger value="create">Create Post</TabsTrigger>
            </TabsList>
            
            <TabsContent value="posts">
              <BlogPostsList />
            </TabsContent>
            
            <TabsContent value="create">
              <BlogPostForm />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </BlogProvider>
  );
};

export default BlogPage;
