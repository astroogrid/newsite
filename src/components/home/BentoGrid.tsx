import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowRight, Clock, Star, Sparkles, BookOpen } from "lucide-react";

const BentoGrid = () => {
  const gridItems = [
    {
      id: 1,
      title: "Buy Astrology",
      subtitle: "At Lowest Price",
      description: "Astrology | Numerology | Vastu | Tantra Mantra | Veda",
      handle: "Astrology by Famous Authors",
      bgColor: "bg-gradient-to-br from-yellow-400 to-orange-400",
      textColor: "text-black",
      buttonColor: "bg-black text-white hover:bg-gray-800",
      icon: <BookOpen className="w-6 h-6" />,
      image:
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop",
      hasCarousel: true,
      carouselItems: [
        {
          title: "Astrology Books",
          image:
            "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop",
          discount: "20% OFF",
        },
        {
          title: "Astrology Books",
          image:
            "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop",
          discount: "70% OFF",
        },
        {
          title: "Numerology Guide",
          image:
            "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop",
          discount: "85% OFF",
        },
        {
          title: "Numerology Guide",
          image:
            "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop",
          discount: "95% OFF",
        },
        {
          title: "Numerology Guide",
          image:
            "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop",
          discount: "95% OFF",
        },
        {
          title: "Vastu Shastra",
          image:
            "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop",
          discount: "25% OFF",
        },
      ],
    },
    {
      id: 2,
      title: "Rosary 15% OFF",
      subtitle: "Limited Time Offer",
      bgColor: "bg-gradient-to-br from-pink-300 to-rose-400",
      textColor: "text-white",
      buttonColor: "bg-red-500 text-white hover:bg-red-600",
      icon: <Sparkles className="w-6 h-6" />,
      countdown: true,
      image:
        "https://images.unsplash.com/photo-1748783266580-a5b05c4e54b1?q=80&w=500",
    },
    {
      id: 3,
      title: "Puja Yantra",
      subtitle: "Fully Energized",
      bgColor: "bg-gradient-to-br from-orange-500 to-red-600",
      textColor: "text-white",
      buttonColor: "bg-white text-orange-600 hover:bg-gray-100",
      icon: <Star className="w-6 h-6" />,
      image:
        "https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Rudraksha",
      subtitle: "Ready to use",
      bgColor: "bg-gradient-to-br from-yellow-400 to-yellow-500",
      textColor: "text-black",
      buttonColor: "bg-black text-white hover:bg-gray-800",
      icon: <Sparkles className="w-6 h-6" />,
      image:
        "https://images.unsplash.com/photo-1516961742203-4b6025007809?q=80&w=1000&auto=format&fit=crop",
    },
  ];

  const CountdownTimer = () => {
    const [time, setTime] = React.useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });

    React.useEffect(() => {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const future = now + 2 * 24 * 60 * 60 * 1000; // 2 days from now
        const distance = future - now;

        setTime({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }, 1000);

      return () => clearInterval(interval);
    }, []);

    return (
      <div className="flex gap-2 my-4">
        {Object.entries(time).map(([unit, value]) => (
          <div
            key={unit}
            className="bg-white/20 backdrop-blur-sm rounded-lg p-2 min-w-[50px] text-center"
          >
            <div className="text-lg font-bold">
              {value.toString().padStart(2, "0")}
            </div>
            <div className="text-xs opacity-80">{unit.slice(0, 3)}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 h-[60vh] max-h-80 lg:h-[70vh] lg:max-h-96 2xl:h-[80vh] 2xl:max-h-[430px]">
        {/* Main large block with carousel */}
        <motion.div
          className={`lg:col-span-2 lg:row-span-2 col-span-6 ${gridItems[0].bgColor} ${gridItems[0].textColor} rounded-2xl p-2 relative overflow-hidden group cursor-pointer`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
        >
          

          <div className="relative z-10 h-full flex flex-col justify-between">
            {gridItems[0].hasCarousel && (
              <div>
                <Carousel className="w-full h-full" opts={{ loop: true }}>
                  <CarouselContent>
                    {gridItems[0].carouselItems?.map((item, index) => (
                      <CarouselItem key={index}>
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                          <p className="font-semibold">{item.title}</p>
                          <p className="text-sm opacity-80">{item.discount}</p>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                   
                    <CarouselPrevious className="left-2 bg-white/20 hover:bg-white/40 border-none text-current" />
                    <CarouselNext className="right-2 bg-white/20 hover:bg-white/40 border-none text-current" />
                </Carousel>
              </div>
            )}
          </div>
        </motion.div>

        {/* Countdown block */}
        <motion.div
          className={`2xl:col-span-3 lg:col-span-4 hidden lg:block ${gridItems[1].bgColor} ${gridItems[1].textColor} rounded-2xl p-6 relative overflow-hidden group cursor-pointer`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ scale: 1.02 }}
        >
           <div className="absolute inset-0 opacity-20">
            <img
              src={gridItems[0].image}
              alt={gridItems[0].title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10">
           
            <h3 className="text-2xl font-bold mb-2">{gridItems[1].title}</h3>

            <Button className={`${gridItems[1].buttonColor} mt-4`}>
              BUY NOW
            </Button>
          </div>
        </motion.div>

        {/* Small Countdown block */}
        <motion.div
          className={`md:col-span-1  hidden 2xl:block ${gridItems[1].bgColor} ${gridItems[1].textColor} rounded-2xl p-6 relative overflow-hidden group cursor-pointer`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative z-10"></div>
        </motion.div>

        {/* Puja Yantra block */}
        <motion.div
          className={` hidden lg:block ${gridItems[2].bgColor} ${gridItems[2].textColor}  col-span-2 rounded-2xl p-6 relative overflow-hidden group cursor-pointer`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="absolute top-4 right-4 opacity-30">
            <img
              src={gridItems[2].image}
              alt={gridItems[2].title}
              className="w-16 h-16 object-cover rounded"
            />
          </div>

          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {gridItems[2].icon}
              </div>
              <h3 className="text-xl font-bold mb-1">{gridItems[2].title}</h3>
              <p className="text-sm opacity-80">{gridItems[2].subtitle}</p>
            </div>

            <Button className={`${gridItems[2].buttonColor} w-fit mt-4`}>
              BUY NOW
            </Button>
          </div>
        </motion.div>

        {/* Rudraksha block */}
        <motion.div
          className={` hidden lg:block ${gridItems[3].bgColor} ${gridItems[3].textColor} col-span-2 rounded-2xl p-6 relative overflow-hidden group cursor-pointer`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="absolute top-4 right-4 opacity-30">
            <img
              src={gridItems[3].image}
              alt={gridItems[3].title}
              className="w-16 h-16 object-cover rounded-full"
            />
          </div>

          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {gridItems[3].icon}
              </div>
              <h3 className="text-xl font-bold mb-1">{gridItems[3].title}</h3>
              <p className="text-sm opacity-80">{gridItems[3].subtitle}</p>
            </div>

            <Button className={`${gridItems[3].buttonColor} w-fit mt-4`}>
              BUY NOW
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BentoGrid;
