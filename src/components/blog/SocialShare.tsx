
import React from 'react';
import { Facebook, Twitter, Linkedin, Link2, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface SocialShareProps {
  url: string;
  title: string;
  description: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ url, title, description }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`
  };

  const handleShare = (platform: string, shareUrl: string) => {
    if (platform === 'email') {
      window.location.href = shareUrl;
    } else {
      window.open(shareUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link copied!",
        description: "The article link has been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 p-6 bg-muted/30 rounded-lg border">
      <h3 className="text-lg font-semibold">Share this article</h3>
      
      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('facebook', shareLinks.facebook)}
          className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-200"
        >
          <Facebook className="h-4 w-4 text-blue-600" />
          Facebook
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('twitter', shareLinks.twitter)}
          className="flex items-center gap-2 hover:bg-sky-50 hover:border-sky-200"
        >
          <Twitter className="h-4 w-4 text-sky-500" />
          Twitter
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('linkedin', shareLinks.linkedin)}
          className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-200"
        >
          <Linkedin className="h-4 w-4 text-blue-700" />
          LinkedIn
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('email', shareLinks.email)}
          className="flex items-center gap-2 hover:bg-gray-50 hover:border-gray-200"
        >
          <Mail className="h-4 w-4 text-gray-600" />
          Email
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={copyToClipboard}
          className="flex items-center gap-2 hover:bg-gray-50 hover:border-gray-200"
        >
          <Link2 className="h-4 w-4 text-gray-600" />
          Copy Link
        </Button>
      </div>
    </div>
  );
};

export default SocialShare;
