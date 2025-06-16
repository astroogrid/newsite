
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const BlogFooter: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <h3 className="text-2xl font-bold mb-4">AstrooGrid Blog</h3>
              <p className="text-gray-400 mb-6">
                Where ideas come to life. Join our community of writers and readers.
              </p>
              <div className="flex space-x-4">
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white p-2">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white p-2">
                  <Github className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white p-2">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white p-2">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/blog-landing" className="text-gray-400 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">
                    Write
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Popular Topics</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/blog-landing" className="text-gray-400 hover:text-white transition-colors">
                    Technology
                  </Link>
                </li>
                <li>
                  <Link to="/blog-landing" className="text-gray-400 hover:text-white transition-colors">
                    Design
                  </Link>
                </li>
                <li>
                  <Link to="/blog-landing" className="text-gray-400 hover:text-white transition-colors">
                    Business
                  </Link>
                </li>
                <li>
                  <Link to="/blog-landing" className="text-gray-400 hover:text-white transition-colors">
                    Lifestyle
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
              <p className="text-gray-400 mb-4">
                Get the latest articles delivered to your inbox.
              </p>
              <div className="flex flex-col space-y-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
                <Button className="w-full bg-white text-black hover:bg-gray-100">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 AstrooGrid Blog. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default BlogFooter;
