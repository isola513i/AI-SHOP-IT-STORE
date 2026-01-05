import React, { useState, useEffect } from 'react';
import { Flame, ShoppingBag, Clock } from 'lucide-react';
import { Product } from '../types';

interface DailyDealProps {
  onPress?: (product: Product) => void;
}

// Mock Data for Flash Deals
const FLASH_DEALS: Product[] = [
  {
    id: 'flash-1',
    title: 'GeForce RTX 4090 OC',
    brand: 'NVIDIA',
    description: 'Ultimate GPU',
    price: 1499,
    originalPrice: 1799,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=500&q=80',
    category: 'GPU',
    rating: 4.9,
    reviews: 120
  },
  {
    id: 'flash-2',
    title: 'Razer Blade 14',
    brand: 'Razer',
    description: 'Ultra-thin Gaming Laptop',
    price: 1899,
    originalPrice: 2399,
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=500&q=80',
    category: 'Notebook',
    rating: 4.7,
    reviews: 85
  },
  {
    id: 'flash-3',
    title: 'Keychron Q1 Pro',
    brand: 'Keychron',
    description: 'Wireless Custom Mechanical',
    price: 179,
    originalPrice: 219,
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c4603e1?auto=format&fit=crop&w=500&q=80',
    category: 'Accessory',
    rating: 4.8,
    reviews: 210
  }
];

export const DailyDeal: React.FC<DailyDealProps> = ({ onPress }) => {
  // Countdown Timer State
  const [timeLeft, setTimeLeft] = useState(2 * 60 * 60 + 44 * 60 + 50);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <section className="mt-6 pb-6">
      {/* Section Header */}
      <div className="flex items-center justify-between px-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-red-500/10 p-1.5 rounded-lg">
             <Flame size={20} className="text-red-500 fill-red-500 animate-pulse" />
          </div>
          <div>
            <h2 className="text-[#111318] dark:text-white text-[18px] font-bold leading-none">
                Flash Sale
            </h2>
            <div className="flex items-center gap-1 mt-1">
                <Clock size={12} className="text-gray-500" />
                <span className="text-xs font-mono font-medium text-gray-500">Ends in <span className="text-red-500 font-bold">{formatTime(timeLeft)}</span></span>
            </div>
          </div>
        </div>
        <button className="text-xs font-bold text-gray-400 hover:text-primary transition-colors">See All</button>
      </div>

      {/* Horizontal List */}
      <div className="flex overflow-x-auto gap-4 px-4 pb-2 no-scrollbar snap-x snap-mandatory">
        {FLASH_DEALS.map((deal) => (
          <div 
            key={deal.id}
            onClick={() => onPress?.(deal)}
            className="shrink-0 w-[320px] snap-center bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden shadow-sm flex flex-row h-[160px] cursor-pointer group"
          >
             {/* Left Image - 40% width, no padding, transparent bg */}
             <div className="w-[40%] h-full bg-white/5 relative">
                 <img 
                    src={deal.image} 
                    alt={deal.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                 />
                 {/* Discount Badge */}
                 <div className="absolute top-0 left-0 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-br-xl z-10 shadow-sm">
                    -{Math.round(((deal.originalPrice! - deal.price) / deal.originalPrice!) * 100)}%
                 </div>
             </div>

             {/* Right Content */}
             <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">{deal.brand}</span>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-tight line-clamp-2 mb-1">
                        {deal.title}
                    </h3>
                </div>
                
                <div className="flex flex-col gap-3">
                     <div className="flex flex-col leading-none">
                         <span className="text-xs text-gray-400 line-through">${deal.originalPrice?.toLocaleString()}</span>
                         <span className="text-lg font-bold text-red-500">${deal.price.toLocaleString()}</span>
                     </div>
                     
                     {/* Compact Button */}
                     <button className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] font-bold py-2 rounded-lg shadow-lg shadow-orange-500/20 active:scale-95 transition-transform flex items-center justify-center gap-1.5">
                        Grab Deal <ShoppingBag size={12} />
                     </button>
                </div>
             </div>
          </div>
        ))}
      </div>
    </section>
  );
};