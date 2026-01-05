import React, { useState, useEffect } from 'react';

interface HeroSlideData {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  tag: string;
  tagColor: string;
}

const HERO_SLIDES: HeroSlideData[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=800&q=80',
    title: 'Ultimate\nWorkstation',
    subtitle: 'Power your dreams with our custom high-performance setups.',
    tag: 'New Arrival',
    tagColor: 'bg-blue-600'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1661961110671-77b71b929d52?auto=format&fit=crop&w=800&q=80',
    title: 'Creative\nStudio',
    subtitle: 'Unleash your creativity with the latest pro tools.',
    tag: 'Best Seller',
    tagColor: 'bg-purple-600'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=800&q=80',
    title: 'Pure\nSound',
    subtitle: 'Immerse yourself in crystal clear audio.',
    tag: 'Featured',
    tagColor: 'bg-orange-500'
  }
];

interface HeroBannerProps {
  onShopNow?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onShopNow }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="w-full relative h-[60vh] overflow-hidden bg-gray-900 group">
      {/* Background Image with Transition */}
      <div 
        key={slide.id} // Key change triggers animation if configured, or just ensures react updates
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out transform scale-105 animate-in fade-in" 
        style={{ backgroundImage: `url('${slide.image}')` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30"></div>
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 p-8 flex flex-col items-start gap-4 mb-8 w-full z-10">
        <span className={`${slide.tagColor} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg`}>
          {slide.tag}
        </span>
        
        <h2 className="text-5xl font-bold text-white leading-[0.95] tracking-tight whitespace-pre-line drop-shadow-lg">
          {slide.title}
        </h2>
        
        <p className="text-gray-200 text-sm font-medium max-w-[80%] opacity-90 leading-relaxed">
          {slide.subtitle}
        </p>
        
        <button 
          onClick={onShopNow}
          className="bg-white text-black text-sm font-bold px-8 py-3.5 rounded-full hover:bg-gray-100 active:scale-95 transition-all mt-2 shadow-[0_4px_14px_0_rgba(255,255,255,0.39)]"
        >
          Shop Now
        </button>
      </div>

      {/* Pagination Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'bg-white w-6' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};