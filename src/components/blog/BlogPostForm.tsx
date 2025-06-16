import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Save, Eye, FileText, Plus, Trash2 } from 'lucide-react';
import { saveAs } from 'file-saver';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/sonner';
import { useBlog } from '@/hooks/useBlog';
import { BlogPost, BlogFormData } from '@/types/blog';

interface BlogPostFormProps {
  post?: BlogPost;
  onSave?: () => void;
}

const BlogPostForm: React.FC<BlogPostFormProps> = ({ post, onSave }) => {
  const { addPost, updatePost } = useBlog();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<BlogFormData>({
    defaultValues: {
      title: post?.title || '',
      slug: post?.slug || '',
      content: post?.content || '',
      excerpt: post?.excerpt || '',
      author: post?.author || '',
      publishDate: post?.publishDate || new Date().toISOString().split('T')[0],
      status: post?.status || 'draft',
      featuredImage: post?.featuredImage || '',
      tags: post?.tags.map(tag => ({ value: tag })) || [{ value: '' }],
      categories: post?.categories.map(cat => ({ value: cat })) || [{ value: '' }],
      metaTitle: post?.seo.metaTitle || '',
      metaDescription: post?.seo.metaDescription || '',
      keywords: post?.seo.keywords || '',
      canonicalUrl: post?.seo.canonicalUrl || '',
      ogTitle: post?.seo.ogTitle || '',
      ogDescription: post?.seo.ogDescription || '',
      ogImage: post?.seo.ogImage || '',
    }
  });

  const { fields: tagFields, append: appendTag, remove: removeTag } = useFieldArray({
    control: form.control,
    name: 'tags'
  });

  const { fields: categoryFields, append: appendCategory, remove: removeCategory } = useFieldArray({
    control: form.control,
    name: 'categories'
  });

  // Auto-generate slug from title
  const title = form.watch('title');
  useEffect(() => {
    if (title && !post) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .trim();
      form.setValue('slug', slug);
    }
  }, [title, form, post]);

  const onSubmit = async (data: BlogFormData) => {
    setIsSubmitting(true);
    
    try {
      const blogPost: BlogPost = {
        id: post?.id || Date.now().toString(),
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: data.excerpt,
        author: data.author,
        publishDate: data.publishDate,
        lastModified: new Date().toISOString(),
        status: data.status,
        featuredImage: data.featuredImage,
        tags: data.tags.filter(tag => tag.value.trim()).map(tag => tag.value.trim()),
        categories: data.categories.filter(cat => cat.value.trim()).map(cat => cat.value.trim()),
        seo: {
          metaTitle: data.metaTitle || data.title,
          metaDescription: data.metaDescription || data.excerpt,
          keywords: data.keywords,
          canonicalUrl: data.canonicalUrl,
          ogTitle: data.ogTitle || data.title,
          ogDescription: data.ogDescription || data.excerpt,
          ogImage: data.ogImage || data.featuredImage,
        }
      };

      if (post) {
        updatePost(post.id, blogPost);
        toast.success('Post updated successfully!');
      } else {
        addPost(blogPost);
        toast.success('Post created successfully!');
      }

      // Save to file
      const blob = new Blob([JSON.stringify(blogPost, null, 2)], { type: 'application/json' });
      saveAs(blob, `${blogPost.slug}.json`);

      onSave?.();
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error('Failed to save post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const exportAllData = () => {
    const formData = form.getValues();
    const blob = new Blob([JSON.stringify(formData, null, 2)], { type: 'application/json' });
    saveAs(blob, `blog-post-${formData.slug || 'draft'}.json`);
    toast.success('Blog post data exported successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {post ? 'Edit Post' : 'Create New Post'}
            </h1>
            <p className="text-muted-foreground">
              {post ? 'Update your blog post' : 'Write and publish your blog post'}
            </p>
          </div>
          <Button onClick={exportAllData} variant="outline" className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Export Data
          </Button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="title"
                    rules={{ required: 'Title is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter post title" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="slug"
                    rules={{ required: 'Slug is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="url-friendly-slug" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="excerpt"
                  rules={{ required: 'Excerpt is required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Excerpt</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Brief description of the post" rows={3} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  rules={{ required: 'Content is required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Write your blog post content..." rows={10} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="author"
                    rules={{ required: 'Author is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Author</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Author name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="publishDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Publish Date</FormLabel>
                        <FormControl>
                          <Input {...field} type="date" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="featuredImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Featured Image URL</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://example.com/image.jpg" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Categories and Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Categories & Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Tags */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <FormLabel>Tags</FormLabel>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => appendTag({ value: '' })}
                      className="flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add Tag
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {tagFields.map((field, index) => (
                      <div key={field.id} className="flex gap-2">
                        <FormField
                          control={form.control}
                          name={`tags.${index}.value`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input {...field} placeholder="Enter tag" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {tagFields.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeTag(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <FormLabel>Categories</FormLabel>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => appendCategory({ value: '' })}
                      className="flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add Category
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {categoryFields.map((field, index) => (
                      <div key={field.id} className="flex gap-2">
                        <FormField
                          control={form.control}
                          name={`categories.${index}.value`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input {...field} placeholder="Enter category" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {categoryFields.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeCategory(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SEO Section */}
            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Optimize your post for search engines and social media
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="metaTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meta Title</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="SEO title (60 chars max)" maxLength={60} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="keywords"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Keywords</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="keyword1, keyword2, keyword3" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="metaDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          placeholder="SEO description (160 chars max)" 
                          maxLength={160}
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="canonicalUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Canonical URL</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://yourdomain.com/canonical-url" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator />

                <h4 className="font-medium">Open Graph (Social Media)</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="ogTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>OG Title</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Social media title" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ogImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>OG Image URL</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://example.com/og-image.jpg" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="ogDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>OG Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Social media description" rows={3} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Submit Buttons */}
            <div className="flex justify-end gap-4">
              <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                {isSubmitting ? 'Saving...' : post ? 'Update Post' : 'Create Post'}
              </Button>
            </div>
          </form>
        </Form>
      </motion.div>
    </div>
  );
};

export default BlogPostForm;
