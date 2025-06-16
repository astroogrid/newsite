
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Clock, Share2 } from 'lucide-react';
import Header from '@/components/Header';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SocialShare from '@/components/blog/SocialShare';

const TemplateBlogPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Template content data
  const templateContent: Record<string, any> = {
    'sacred-temples': {
      title: "Sacred Temples: Divine Architecture Through the Ages",
      description: "Explore the magnificent architecture and spiritual significance of ancient Hindu temples",
      category: "Architecture",
      author: "Dr. Priya Sharma",
      readTime: "8 min read",
      publishDate: "December 15, 2024",
      image: "/lovable-uploads/3955319b-3505-4df3-a47c-7eb59ae20308.png",
      content: `
        <p>Hindu temples represent more than just places of worship—they are cosmic diagrams carved in stone, embodying the very essence of divine geometry and spiritual philosophy. Each temple is a microcosm of the universe, designed to facilitate the devotee's journey from the material to the spiritual realm.</p>
        
        <h2>Architectural Marvels</h2>
        <p>The towering gopurams (temple towers) that pierce the sky are not merely decorative elements but serve as beacons for both earthly pilgrims and celestial beings. These intricate structures, adorned with thousands of sculptures, tell stories of cosmic creation, divine intervention, and moral teachings.</p>
        
        <h2>Sacred Geometry</h2>
        <p>Every aspect of temple design follows precise mathematical principles rooted in ancient texts like the Vastu Shastra and Shilpa Shastra. The proportions, measurements, and spatial arrangements are calculated to create harmony between the human spirit and cosmic energies.</p>
        
        <h2>Spiritual Significance</h2>
        <p>The temple complex serves as a progressive spiritual journey. From the outer walls representing the material world to the inner sanctum (garbhagriha) symbolizing the divine consciousness, each step inward represents a deeper level of spiritual understanding.</p>
      `
    },
    'spiritual-rituals': {
      title: "Spiritual Rituals: Sacred Ceremonies and Their Meanings",
      description: "Understand the profound significance behind ancient spiritual practices and ceremonies",
      category: "Rituals",
      author: "Pandit Raj Kumar",
      readTime: "6 min read",
      publishDate: "December 14, 2024",
      image: "/lovable-uploads/3955319b-3505-4df3-a47c-7eb59ae20308.png",
      content: `
        <p>Spiritual rituals in Hindu tradition are not mere customs but profound practices designed to purify the mind, elevate consciousness, and establish a connection with the divine. Each ritual carries deep symbolic meaning and serves specific spiritual purposes.</p>
        
        <h2>The Science of Rituals</h2>
        <p>Ancient sages understood the psychological and physiological effects of ritualistic practices. The rhythmic chanting of mantras, the visual focus on sacred symbols, and the aromatic presence of incense work together to induce meditative states and promote inner peace.</p>
        
        <h2>Sacred Fire Ceremonies</h2>
        <p>Agni (fire) is considered the divine messenger, carrying prayers and offerings to higher realms. The havan or fire ceremony represents the transformation of the gross into the subtle, burning away impurities of mind and soul.</p>
        
        <h2>Daily Practices</h2>
        <p>From the morning prayers to evening aarti, daily rituals create a framework for mindful living. These practices serve as constant reminders of our spiritual nature and help maintain a connection with the divine throughout the day.</p>
      `
    },
    'temple-illumination': {
      title: "Temple Illumination: Divine Light in Sacred Spaces",
      description: "Discover how light transforms temples into ethereal realms of spiritual experience",
      category: "Photography",
      author: "Arjun Photography",
      readTime: "5 min read",
      publishDate: "December 13, 2024",
      image: "/lovable-uploads/3955319b-3505-4df3-a47c-7eb59ae20308.png",
      content: `
        <p>As darkness falls and artificial lights begin to illuminate ancient stones, temples transform into mystical realms where the divine and earthly merge. The play of light and shadow creates an atmosphere that transcends ordinary perception.</p>
        
        <h2>Symbolic Illumination</h2>
        <p>Light in Hindu philosophy represents knowledge, consciousness, and the divine presence. The illumination of temples during evening hours symbolizes the awakening of spiritual awareness and the dispelling of ignorance.</p>
        
        <h2>Architectural Enhancement</h2>
        <p>Carefully planned lighting reveals the intricate details of temple architecture that may be missed during daylight. Every carved pillar, sculptured deity, and architectural element comes alive under the gentle glow of traditional lamps and modern illumination.</p>
        
        <h2>Photography and Spirituality</h2>
        <p>Capturing temples in their illuminated glory requires not just technical skill but spiritual sensitivity. The photographer becomes a medium through which the divine beauty of these structures is shared with the world.</p>
      `
    },
    'ancient-wisdom': {
      title: "Ancient Wisdom: Timeless Teachings Carved in Stone",
      description: "Explore the philosophical teachings embedded in temple architecture and sculptures",
      category: "Philosophy",
      author: "Prof. Meera Gupta",
      readTime: "10 min read",
      publishDate: "December 12, 2024",
      image: "/lovable-uploads/3955319b-3505-4df3-a47c-7eb59ae20308.png",
      content: `
        <p>Hindu temples are libraries carved in stone, preserving ancient wisdom for future generations. Every sculpture, every relief, every architectural element carries philosophical teachings that have guided humanity for millennia.</p>
        
        <h2>Vedic Philosophy in Stone</h2>
        <p>The temple walls narrate stories from the Vedas, Puranas, and Epics, making complex philosophical concepts accessible to all. These visual representations serve as teaching tools, conveying profound truths through artistic expression.</p>
        
        <h2>The Cosmic Order</h2>
        <p>Temple architecture reflects the Hindu understanding of cosmic order (Rta). The vertical axis represents the connection between earth and heaven, while the horizontal plane symbolizes the material world and human experience.</p>
        
        <h2>Moral and Ethical Teachings</h2>
        <p>Sculptures depicting various deities and mythological scenes convey moral and ethical lessons. They illustrate the consequences of different actions and the path to righteous living.</p>
      `
    },
    'sacred-geometry': {
      title: "Sacred Geometry: Mathematical Perfection in Divine Design",
      description: "Understand the mathematical principles underlying temple architecture",
      category: "Design",
      author: "Dr. Vikram Architect",
      readTime: "7 min read",
      publishDate: "December 11, 2024",
      image: "/lovable-uploads/3955319b-3505-4df3-a47c-7eb59ae20308.png",
      content: `
        <p>Sacred geometry in Hindu temple architecture represents the mathematical foundation of creation itself. These geometric principles are believed to resonate with the fundamental structures of the universe.</p>
        
        <h2>The Golden Ratio</h2>
        <p>Many temple proportions follow the golden ratio (phi), creating structures that are naturally pleasing to the human eye and spirit. This ratio is found throughout nature and is considered the divine proportion.</p>
        
        <h2>Mandala Design</h2>
        <p>Temple floor plans are based on mandala principles, with the garbhagriha at the center representing the bindu (cosmic center). This design creates a sacred space that facilitates meditation and spiritual contemplation.</p>
        
        <h2>Vastu Principles</h2>
        <p>The ancient science of Vastu Shastra governs temple construction, ensuring harmony between the structure and natural forces. These principles create spaces that promote spiritual well-being and positive energy flow.</p>
      `
    },
    'temple-heritage': {
      title: "Temple Heritage: Preserving Millennia of Cultural Legacy",
      description: "Learn about the efforts to preserve and protect ancient temple heritage",
      category: "Heritage",
      author: "Heritage Foundation",
      readTime: "9 min read",
      publishDate: "December 10, 2024",
      image: "/lovable-uploads/3955319b-3505-4df3-a47c-7eb59ae20308.png",
      content: `
        <p>Hindu temples are not just religious structures but repositories of cultural heritage that span thousands of years. They represent the collective wisdom, artistic achievement, and spiritual aspirations of countless generations.</p>
        
        <h2>Historical Significance</h2>
        <p>Each temple tells a story of its time—the political climate, artistic preferences, technological capabilities, and spiritual understanding of the era. They serve as historical documents written in stone.</p>
        
        <h2>Conservation Challenges</h2>
        <p>Preserving ancient temples requires balancing respect for original construction techniques with modern conservation needs. Climate change, pollution, and human activity pose ongoing threats to these irreplaceable structures.</p>
        
        <h2>Cultural Continuity</h2>
        <p>Temples serve as living links between past and present, maintaining cultural traditions while adapting to contemporary needs. They continue to be centers of community life, education, and spiritual practice.</p>
      `
    }
  };

  const currentContent = templateContent[slug || ''] || templateContent['sacred-temples'];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEO 
        title={currentContent.title}
        description={currentContent.description}
        keywords={`${currentContent.category.toLowerCase()}, temples, astrology, spirituality`}
        type="article"
      />
      
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px] bg-gradient-to-r from-gray-900 to-gray-700 overflow-hidden">
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl text-white"
            >
              <Link 
                to="/template-landing" 
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Templates
              </Link>
              
              <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">
                {currentContent.category}
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {currentContent.title}
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl">
                {currentContent.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{currentContent.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{currentContent.publishDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{currentContent.readTime}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: currentContent.content }}
              />
              
              {/* Social Share */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-12"
              >
                <SocialShare
                  url={window.location.href}
                  title={currentContent.title}
                  description={currentContent.description}
                />
              </motion.div>
              
              {/* Navigation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-12 pt-8 border-t"
              >
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                  <Link to="/template-landing">
                    <Button variant="outline" className="flex items-center gap-2">
                      <ArrowLeft className="h-4 w-4" />
                      Back to Templates
                    </Button>
                  </Link>
                  
                  <Link to="/blog-landing">
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Explore More Articles
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TemplateBlogPage;
