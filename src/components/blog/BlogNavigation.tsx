
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BlogPost } from '@/types/blog';
import { scrollToTop } from '@/hooks/useScrollToTop';

interface BlogNavigationProps {
  previousPost: BlogPost | null;
  nextPost: BlogPost | null;
}

const BlogNavigation: React.FC<BlogNavigationProps> = ({ previousPost, nextPost }) => {
  const handleNavigation = () => {
    scrollToTop(true);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
      {/* Previous Post */}
      <div className="md:col-span-1">
        {previousPost ? (
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <ChevronLeft className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-muted-foreground mb-1">Previous Article</p>
                  <h3 className="font-semibold line-clamp-2 mb-2">
                    <Link 
                      to={`/blog/${previousPost.slug}`}
                      onClick={handleNavigation}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {previousPost.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {previousPost.excerpt}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="h-full opacity-50">
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                <ChevronLeft className="h-8 w-8 mx-auto mb-2 opacity-30" />
                <p>No previous article</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Next Post */}
      <div className="md:col-span-1">
        {nextPost ? (
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-muted-foreground mb-1">Next Article</p>
                  <h3 className="font-semibold line-clamp-2 mb-2">
                    <Link 
                      to={`/blog/${nextPost.slug}`}
                      onClick={handleNavigation}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {nextPost.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {nextPost.excerpt}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="h-full opacity-50">
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                <ChevronRight className="h-8 w-8 mx-auto mb-2 opacity-30" />
                <p>No next article</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogNavigation;
