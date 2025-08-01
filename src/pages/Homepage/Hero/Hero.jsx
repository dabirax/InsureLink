import { useEffect, useState } from "react";
import SubHero1 from "./SubHero1";
import SubHero2 from "./SubHero2";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  // Array of slides
  const slides = [
    {
      id: 0,
      component: <SubHero1 />
    },
    {
      id: 1,
      component: <SubHero2 />
    }
  ]
  useEffect(() => {
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000); // Change every 2s
    return () => clearInterval(interval);
  }, [slides.length]);
  return (
    <div className="flex w-screen h-screen overflow-hidden font-poppins relative">
      {slides.map((slide) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentSlide === slide.id ? "opacity-100 z-20" : "opacity-0 z-10"
          }`}
        >
          {slide.component}
        </div>
      ))}
    </div>
  );
};

export default Hero;
