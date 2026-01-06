import React from 'react';
import { Home, Store, Scale, Heart, User } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onNavigate: (screen: string) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  activeTab, 
  onNavigate 
}) => {
  const renderTab = (name: string, Icon: React.ElementType) => {
    const isActive = activeTab === name;
    return (
      <button 
        onClick={() => onNavigate(name)}
        className={`group relative flex items-center justify-center w-12 h-12 transition-all duration-500 ease-out ${isActive ? '-translate-y-2' : ''}`}
      >
        <div className={`absolute inset-0 bg-blue-500/10 rounded-full scale-0 transition-transform duration-300 group-hover:scale-100 ${isActive ? 'scale-0' : ''}`} />
        
        <Icon 
          size={26} 
          strokeWidth={isActive ? 2.5 : 2}
          className={`relative z-10 transition-all duration-500 ${
            isActive 
              ? 'text-blue-500 scale-110 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]' 
              : 'text-gray-500 group-hover:text-gray-300'
          }`} 
        />
        
        {/* Active Indicator Dot */}
        <span 
          className={`absolute -bottom-1 w-1 h-1 bg-blue-500 rounded-full transition-all duration-500 ${
            isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`} 
        />
      </button>
    );
  };

  return (
    <nav className="w-full bg-neutral-900/95 backdrop-blur-xl rounded-t-[2.5rem] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.5)] h-[84px] fixed bottom-0 z-50 max-w-md left-1/2 -translate-x-1/2 px-6 pb-2 border-t border-white/5">
      <div className="flex items-center justify-between h-full w-full relative">
        
        {/* 1. Home */}
        {renderTab('home', Home)}
        
        {/* 2. Store */}
        {renderTab('store', Store)}
        
        {/* 3. Center Compare Button (Raised & Animated) */}
        <div className="relative -top-10 group cursor-pointer z-10">
           {/* Pulse Ring */}
           <div className={`absolute inset-0 rounded-full bg-blue-500 opacity-20 blur-xl transition-all duration-1000 ${activeTab === 'compare' ? 'scale-150 animate-pulse' : 'scale-100'}`} />
           
           <button 
            onClick={() => onNavigate('compare')}
            className={`relative w-[72px] h-[72px] rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(37,99,235,0.4)] border-[6px] border-neutral-900 transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) active:scale-90 ${
              activeTab === 'compare' 
                ? 'bg-blue-500 text-white -translate-y-2 shadow-[0_15px_30px_rgba(37,99,235,0.6)]' 
                : 'bg-blue-600 text-white hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(37,99,235,0.5)]'
            }`}
          >
            <Scale 
              size={32} 
              strokeWidth={2} 
              className={`transition-transform duration-500 ${activeTab === 'compare' ? 'rotate-[360deg] scale-110' : 'group-hover:scale-110'}`} 
            />
          </button>
        </div>
        
        {/* 4. Wishlist */}
        {renderTab('wishlist', Heart)}
        
        {/* 5. Profile */}
        {renderTab('profile', User)}
      </div>
    </nav>
  );
};