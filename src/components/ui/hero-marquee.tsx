import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, stagger, useAnimate } from "motion/react";
import { cn } from "@/lib/utils";
import Floating, { FloatingElement } from "@/components/ui/parallax-floating";

// Unsplash images: seafood, fish, ocean, shrimp, crab, sushi
const FLOATING_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?q=80&w=800&auto=format&fit=crop",
    alt: "Свежий лосось",
  },
  {
    url: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?q=80&w=800&auto=format&fit=crop",
    alt: "Креветки",
  },
  {
    url: "https://images.unsplash.com/photo-1510130113581-a4b2830e5b68?q=80&w=800&auto=format&fit=crop",
    alt: "Свежая рыба на льду",
  },
  {
    url: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?q=80&w=800&auto=format&fit=crop",
    alt: "Устрицы",
  },
  {
    url: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?q=80&w=800&auto=format&fit=crop",
    alt: "Краб",
  },
  {
    url: "https://images.unsplash.com/photo-1579631542720-3a87824fff86?q=80&w=800&auto=format&fit=crop",
    alt: "Морепродукты на тарелке",
  },
  {
    url: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=800&auto=format&fit=crop",
    alt: "Сашими",
  },
  {
    url: "https://images.unsplash.com/photo-1606850246029-926012507043?q=80&w=800&auto=format&fit=crop",
    alt: "Красная икра",
  },
  {
    url: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?q=80&w=800&auto=format&fit=crop",
    alt: "Тунец",
  },
  {
    url: "https://images.unsplash.com/photo-1448043552756-e747b7a2b2b8?q=80&w=800&auto=format&fit=crop",
    alt: "Морской набор",
  },
];

interface AnimatedMarqueeHeroProps {
  title: React.ReactNode;
  description: string;
  ctaText: string;
  ctaLink: string;
  className?: string;
}

export const AnimatedMarqueeHero: React.FC<AnimatedMarqueeHeroProps> = ({
  title,
  description,
  ctaText,
  ctaLink,
  className,
}) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      "img",
      { opacity: [0, 1] },
      { duration: 0.5, delay: stagger(0.15) },
    );
  }, [animate]);

  return (
    <section
      ref={scope}
      className={cn(
        "relative w-full min-h-[85svh] overflow-hidden bg-gradient-to-b from-bg-light to-white flex items-center justify-center text-center px-4 py-20 md:py-28",
        className,
      )}
    >
      {/* Mobile Background — grid of seafood images */}
      <div className="absolute inset-0 md:hidden">
        <div className="grid grid-cols-2 grid-rows-3 gap-2 p-3 h-full">
          {FLOATING_IMAGES.slice(0, 6).map((img, i) => (
            <motion.img
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              src={img.url}
              alt={img.alt}
              className="w-full h-full object-cover rounded-xl"
            />
          ))}
        </div>
        {/* Overlay to keep text readable */}
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]" />
      </div>

      {/* Floating Parallax Images — desktop only */}
      <Floating sensitivity={-1} className="overflow-hidden hidden md:block">
        {/* Top-left */}
        <FloatingElement depth={0.5} className="top-[4%] left-[5%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={FLOATING_IMAGES[0].url}
            alt={FLOATING_IMAGES[0].alt}
            className="w-36 h-36 lg:w-52 lg:h-52 rounded-2xl object-cover shadow-card hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>

        {/* Top-left inner */}
        <FloatingElement depth={1.5} className="top-[8%] left-[25%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={FLOATING_IMAGES[1].url}
            alt={FLOATING_IMAGES[1].alt}
            className="w-28 h-36 lg:w-36 lg:h-48 rounded-2xl object-cover shadow-card hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>

        {/* Top-right inner */}
        <FloatingElement depth={2} className="top-[5%] left-[68%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={FLOATING_IMAGES[2].url}
            alt={FLOATING_IMAGES[2].alt}
            className="w-32 h-40 lg:w-40 lg:h-52 rounded-2xl object-cover shadow-card hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>

        {/* Top-center */}
        <FloatingElement depth={1} className="top-[1%] left-[46%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={FLOATING_IMAGES[8].url}
            alt={FLOATING_IMAGES[8].alt}
            className="w-28 h-36 lg:w-36 lg:h-48 rounded-2xl object-cover shadow-card hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>

        {/* Top-right */}
        <FloatingElement depth={1} className="top-[3%] left-[85%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={FLOATING_IMAGES[3].url}
            alt={FLOATING_IMAGES[3].alt}
            className="w-32 h-32 lg:w-44 lg:h-44 rounded-2xl object-cover shadow-card hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>

        {/* Mid-left */}
        <FloatingElement depth={1.5} className="top-[50%] left-[3%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={FLOATING_IMAGES[4].url}
            alt={FLOATING_IMAGES[4].alt}
            className="w-36 h-36 lg:w-52 lg:h-52 rounded-2xl object-cover shadow-card hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>

        {/* Mid-right */}
        <FloatingElement depth={2} className="top-[48%] left-[78%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={FLOATING_IMAGES[5].url}
            alt={FLOATING_IMAGES[5].alt}
            className="w-36 h-44 lg:w-44 lg:h-56 rounded-2xl object-cover shadow-card hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>

        {/* Bottom-left */}
        <FloatingElement depth={3} className="top-[72%] left-[18%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={FLOATING_IMAGES[6].url}
            alt={FLOATING_IMAGES[6].alt}
            className="w-40 h-32 lg:w-52 lg:h-40 rounded-2xl object-cover shadow-card hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>

        {/* Bottom-right */}
        <FloatingElement depth={1} className="top-[76%] left-[62%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={FLOATING_IMAGES[7].url}
            alt={FLOATING_IMAGES[7].alt}
            className="w-32 h-32 lg:w-44 lg:h-44 rounded-2xl object-cover shadow-card hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>

        {/* Bottom-center */}
        <FloatingElement depth={2} className="top-[82%] left-[40%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={FLOATING_IMAGES[9].url}
            alt={FLOATING_IMAGES[9].alt}
            className="w-32 h-28 lg:w-44 lg:h-36 rounded-2xl object-cover shadow-card hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>
      </Floating>

      {/* Center Content */}
      <motion.div
        className="z-10 flex flex-col items-center max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.88, delay: 1.2 }}
      >
        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary font-heading leading-tight">
          {title}
        </h1>

        {/* Description */}
        <p className="mt-4 max-w-md text-base text-text-light leading-relaxed">
          {description}
        </p>

        {/* CTA Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to={ctaLink}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-heading font-semibold text-sm shadow-lg transition-colors hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            {ctaText}
            <span className="ml-1 transition-transform">→</span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};
