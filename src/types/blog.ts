
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  publishDate: string;
  lastModified: string;
  status: 'draft' | 'published' | 'archived';
  featuredImage?: string;
  tags: string[];
  categories: string[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
    canonicalUrl?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
  };
}

export interface BlogFormData {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  publishDate: string;
  status: 'draft' | 'published' | 'archived';
  featuredImage: string;
  tags: { value: string }[];
  categories: { value: string }[];
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}
