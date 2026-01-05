import React from 'react';
import { BRANDS } from '../data';

interface BrandsStripProps {
  onBrandSelect?: (brandName: string) => void;
}

export const BrandsStrip: React.FC<BrandsStripProps> = ({ onBrandSelect }) => {
  return (
    <section className="py-6">
      <div className="flex items-center justify-between px-4 pb-4">
        <h2 className="text-[#111318] dark:text-white text-[18px] font-bold tracking-tight">
          Featured Brands
        </h2>
      </div>
      <div className="flex items-center gap-4 px-4 overflow-x-auto no-scrollbar pb-2">
        {BRANDS.map((brand) => (
          <div 
            key={brand.id} 
            className="group flex flex-col items-center gap-2 shrink-0 cursor-pointer"
            onClick={() => onBrandSelect?.(brand.name)}
          >
            {/* White Circle Container for Logo */}
            <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-sm transition-all duration-300 group-hover:scale-110 group-active:scale-95">
              <img 
                src={brand.logo} 
                alt={brand.name}
                className="w-10 h-10 object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};