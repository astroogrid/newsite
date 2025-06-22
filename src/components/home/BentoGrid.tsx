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
      image:"https://images.pexels.com/photos/4040638/pexels-photo-4040638.jpeg",
      hasCarousel: true,
      carouselItems: [
        {
          title: "Astrology Books",
          image:
            "https://gemglow.in/cdn/shop/files/Malachite3-Photoroom.jpg?v=1721844072&w=1200&q=80&auto=format",
          discount: "20% OFF",
        },
        {
          title: "Astrology Books",
          image:
            "https://gemglow.in/cdn/shop/files/4_5978a2ab-911d-4b22-832c-7d398244fc7f.png?v=1714715536&width=1100",
          discount: "70% OFF",
        },
        {
          title: "Numerology Guide",
          image:
            "https://gemglow.in/cdn/shop/files/1_57cfa3b4-dbd3-493c-9eb9-be985cc3e687.jpg?v=1710754834&width=1100",
          discount: "85% OFF",
        },
       
      ],
    },
    {
      id: 2,
      title: "Rosary 15% OFF",
      subtitle: "Limited Time Offer",
      bgColor: "bg-gradient-to-br from-pink-300/10 to-rose-400/10",
      textColor: "text-white",
      image:
        "https://5.imimg.com/data5/SELLER/Default/2024/9/452119150/LR/ND/EG/81129831/vastu-consultant-in-rohini-500x500.jpg",
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
        "https://images.pexels.com/photos/6806434/pexels-photo-6806434.jpeg",
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
          className={`lg:col-span-2 lg:row-span-2 col-span-6 ${gridItems[0].bgColor} ${gridItems[0].textColor} rounded-2xl relative overflow-hidden group cursor-pointer`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative z-10 h-full flex flex-col justify-between">
            {gridItems[0].hasCarousel && (
              <div className="hidden lg:block">
                <Carousel className="w-full h-full" opts={{ loop: true }}>
                  <CarouselContent>
                    {gridItems[0].carouselItems?.map((item, index) => (
                      <CarouselItem key={index}>
                        <div className="bg-white rounded-xl relative">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover z-0 rounded-xl"
                          />
                          <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/50 text-white flex flex-col gap-1 z-10">
                            <p className="font-semibold">{item.title}</p>
                            <p className="text-sm opacity-80">
                              {item.discount}
                            </p>
                          </div>
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
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg"
              alt={gridItems[1].title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative bg-black/30 backdrop-blur-sm rounded-lg w-fit px-4 py-2 ring-2 ring-gray-100/20 z-10 h-fit flex flex-col justify-between">
            <h3 className="text-lg text-white">Transform Your Space with Vastu</h3>
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
           <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/6944923/pexels-photo-6944923.jpeg"
              alt={gridItems[0].title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10">Small Box</div>
        </motion.div>

        {/* Numerology block */}
        <motion.div
          className={` hidden lg:block ${gridItems[2].bgColor} ${gridItems[2].textColor}  col-span-2 rounded-2xl p-6 relative overflow-hidden group cursor-pointer`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
        >
           <div className="absolute inset-0">
            <img
              src="https://astrala.imgix.net/7rwmicwpL6xw5rtT8zll6C/fb6eb68d337462430469ceb7b6abd0f1/master-numbers-numerology-11-22-33.jpg"
              alt={gridItems[0].title}
              className="w-full h-full object-cover"
            />
          </div>
           <div className="relative bg-black/10 backdrop-blur-sm rounded-lg w-fit p-4 ring-2 ring-gray-100/20 z-10 h-fit flex flex-col justify-between">
            <h3 className="text-lg text-white">Numerology</h3>
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
           <div className="absolute inset-0">
            <img
              src="https://goop-img.com/wp-content/uploads/1999/03/What-Astrology-Can-Teach-Us-about-Self-Acceptance_Yasmin-Imamura.jpg"
              alt={gridItems[0].title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="relative bg-white/40 backdrop-blur-sm rounded-lg w-fit p-4 ring-2 ring-gray-800/20 z-10 h-fit flex flex-col justify-between">
            <h3 className="text-lg text-black">Astrology</h3>
          </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BentoGrid;
