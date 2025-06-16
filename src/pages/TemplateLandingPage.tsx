
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';

const TemplateLandingPage: React.FC = () => {
  const templateItems = [
    {
      id: 1,
      title: "Sacred Temples",
      description: "Explore the divine architecture of ancient Hindu temples",
      slug: "sacred-temples",
      image: "/lovable-uploads/3955319b-3505-4df3-a47c-7eb59ae20308.png",
      category: "Architecture",
      bgColor: "bg-gradient-to-br from-cyan-400 to-blue-500"
    },
    {
      id: 2,
      title: "Spiritual Rituals",
      description: "Discover the profound meaning behind sacred ceremonies",
      slug: "spiritual-rituals",
      image: "/lovable-uploads/3955319b-3505-4df3-a47c-7eb59ae20308.png",
      category: "Rituals",
      bgColor: "bg-gradient-to-br from-orange-400 to-red-500"
    },
    {
      id: 3,
      title: "Temple Illumination",
      description: "Night time temple photography and spiritual ambiance",
      slug: "temple-illumination",
      image: "/lovable-uploads/3955319b-3505-4df3-a47c-7eb59ae20308.png",
      category: "Photography",
      bgColor: "bg-gradient-to-br from-purple-500 to-pink-500"
    },
    {
      id: 4,
      title: "Ancient Wisdom",
      description: "Timeless teachings carved in stone",
      slug: "ancient-wisdom",
      image: "/lovable-uploads/3955319b-3505-4df3-a47c-7eb59ae20308.png",
      category: "Philosophy",
      bgColor: "bg-gradient-to-br from-green-400 to-emerald-500"
    },
    {
      id: 5,
      title: "Sacred Geometry",
      description: "Mathematical perfection in temple design",
      slug: "sacred-geometry",
      image: "/lovable-uploads/3955319b-3505-4df3-a47c-7eb59ae20308.png",
      category: "Design",
      bgColor: "bg-gradient-to-br from-yellow-400 to-orange-400"
    },
    {
      id: 6,
      title: "Temple Heritage",
      description: "Preserving millennia of cultural legacy",
      slug: "temple-heritage",
      image: "/lovable-uploads/3955319b-3505-4df3-a47c-7eb59ae20308.png",
      category: "Heritage",
      bgColor: "bg-gradient-to-br from-indigo-500 to-purple-600"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Astro Temples - The Ultimate Guide to Sacred Spaces"
        description="Explore ancient temples, spiritual rituals, and sacred wisdom through our comprehensive guide to divine architecture and cultural heritage."
        keywords="temples, astrology, spirituality, ancient wisdom, sacred architecture"
      />
      
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Astro Temples
              </h1>
              <h2 className="text-xl md:text-2xl text-gray-700 mb-4">
                The Ultimate Guide to <span className="text-yellow-600 font-semibold">Sacred Spaces</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
                India being part of the world's oldest civilizations is a land of rich history, countless beliefs, traditions and legends 
                surrounding the religions. India takes pride in the country's rich cultural and religious history as it is the birth land 
                of the traditions of Hinduism, Jainism, Buddhism and Sikhism.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Bento Grid Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"
            >
              {/* Large featured item */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-2 lg:row-span-2"
              >
                <Link to={`/template-blog/${templateItems[0].slug}`}>
                  <div className={`${templateItems[0].bgColor} rounded-2xl p-8 h-full min-h-[400px] relative overflow-hidden group cursor-pointer transition-transform hover:scale-[1.02]`}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                    <div className="relative z-10 h-full flex flex-col justify-between text-white">
                      <div>
                        <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
                          {templateItems[0].category}
                        </span>
                        <h3 className="text-3xl md:text-4xl font-bold mb-4">{templateItems[0].title}</h3>
                        <p className="text-lg opacity-90 line-clamp-3">{templateItems[0].description}</p>
                      </div>
                      <Button className="bg-white text-black hover:bg-gray-100 w-fit mt-6">
                        Explore Now
                      </Button>
                    </div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 opacity-20">
                      <img 
                        src={templateItems[0].image} 
                        alt={templateItems[0].title}
                        className="w-full h-full object-cover rounded-tl-3xl"
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Medium items */}
              {templateItems.slice(1, 3).map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  className="lg:col-span-1"
                >
                  <Link to={`/template-blog/${item.slug}`}>
                    <div className={`${item.bgColor} rounded-2xl p-6 h-48 lg:h-full min-h-[180px] relative overflow-hidden group cursor-pointer transition-transform hover:scale-[1.02]`}>
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                      <div className="relative z-10 h-full flex flex-col justify-between text-white">
                        <div>
                          <span className="inline-block px-2 py-1 bg-white/20 rounded-full text-xs font-medium mb-3">
                            {item.category}
                          </span>
                          <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                          <p className="text-sm opacity-90 line-clamp-2">{item.description}</p>
                        </div>
                        <Button size="sm" className="bg-white text-black hover:bg-gray-100 w-fit mt-4">
                          Read More
                        </Button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}

              {/* Small items */}
              {templateItems.slice(3).map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="lg:col-span-1"
                >
                  <Link to={`/template-blog/${item.slug}`}>
                    <div className={`${item.bgColor} rounded-2xl p-6 h-48 relative overflow-hidden group cursor-pointer transition-transform hover:scale-[1.02]`}>
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                      <div className="relative z-10 h-full flex flex-col justify-between text-white">
                        <div>
                          <span className="inline-block px-2 py-1 bg-white/20 rounded-full text-xs font-medium mb-3">
                            {item.category}
                          </span>
                          <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                          <p className="text-sm opacity-90 line-clamp-2">{item.description}</p>
                        </div>
                        <Button size="sm" className="bg-white text-black hover:bg-gray-100 w-fit mt-4">
                          Discover
                        </Button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Begin Your Spiritual Journey
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Discover the profound wisdom and architectural marvels that have inspired humanity for millennia.
              </p>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Explore All Templates
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TemplateLandingPage;
