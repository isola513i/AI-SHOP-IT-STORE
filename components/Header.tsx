import React, { useState, useRef, useEffect } from 'react';
import { Menu, Search, ShoppingCart, ArrowLeft, X } from 'lucide-react';

interface HeaderProps {
  cartCount?: number;
  onCartClick?: () => void;
  title?: string;
  onMenuClick?: () => void;
  onLogoClick?: () => void;
  
  // Search Props
  onSearchSubmit?: (query: string) => void;
  initialQuery?: string;
  onSearchClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  cartCount = 0, 
  onCartClick, 
  title = "AI-SHOP",
  onMenuClick,
  onLogoClick,
  onSearchSubmit,
  initialQuery = '',
  onSearchClick
}) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchText, setSearchText] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSearchText(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    if (isSearchActive && inputRef.current) {
        // Small timeout to allow animation to start/render
        setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isSearchActive]);

  const handleSearchClick = () => {
    if (onSearchClick) {
      onSearchClick();
    } else {
      setIsSearchActive(true);
    }
  };

  const handleBackClick = () => {
    setIsSearchActive(false);
    setSearchText(''); 
    if (onSearchSubmit) onSearchSubmit(''); 
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchSubmit) {
        onSearchSubmit(searchText);
    }
  };

  const handleClearText = () => {
    setSearchText('');
    inputRef.current?.focus();
  };

  return (
    <header className="fixed top-0 w-full z-50 transition-colors max-w-md left-1/2 -translate-x-1/2 bg-transparent">
      <div className="relative h-[60px] flex items-center px-4 py-3 overflow-hidden">
        
        {/* Normal Header Content */}
        <div 
            className={`absolute inset-0 flex items-center px-4 transition-all duration-300 ease-in-out ${
                isSearchActive ? 'opacity-0 translate-y-[-10px] pointer-events-none' : 'opacity-100 translate-y-0'
            }`}
        >
            <button 
                onClick={onMenuClick}
                className="p-2 -ml-2 text-white hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm shrink-0"
            >
                <Menu size={28} />
            </button>
            
            {/* Centered Clickable Logo */}
            <button 
                onClick={onLogoClick}
                className="absolute left-1/2 -translate-x-1/2 text-xl font-bold tracking-tight text-white drop-shadow-md hover:opacity-80 active:scale-95 transition-all"
            >
                {title}
            </button>
            
            <div className="ml-auto flex items-center gap-1 shrink-0">
                <button 
                    onClick={handleSearchClick}
                    className="p-2 text-white hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm"
                >
                    <Search size={24} />
                </button>
                
                <button 
                    onClick={onCartClick}
                    className="p-2 relative text-white hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm"
                >
                    <ShoppingCart size={24} />
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-transparent shadow-sm pointer-events-none">
                            {cartCount}
                        </span>
                    )}
                </button>
            </div>
        </div>

        {/* Search Bar Content (Floating Capsule) */}
        <form 
            onSubmit={handleSubmit}
            className={`absolute inset-0 z-20 flex items-center w-full px-4 transition-all duration-300 ease-in-out ${
                isSearchActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[10px] pointer-events-none'
            }`}
        >
            {/* Back Button (Outside Capsule) */}
            <button 
                type="button"
                onClick={handleBackClick}
                className="p-2 -ml-2 text-gray-600 dark:text-white rounded-full transition-colors"
            >
                <ArrowLeft size={24} />
            </button>
            
            {/* The Capsule */}
            <div className="flex-1 flex items-center h-10 ml-2 bg-gray-100 dark:bg-neutral-800 rounded-full border border-gray-200 dark:border-neutral-700 px-4 shadow-lg">
                <Search size={18} className="text-gray-400 shrink-0" />
                
                <input 
                    ref={inputRef}
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search..."
                    className="flex-1 bg-transparent border-none outline-none text-sm font-medium text-gray-900 dark:text-white placeholder-gray-500 h-full ml-2"
                />
                
                {searchText.length > 0 && (
                    <button 
                        type="button"
                        onClick={handleClearText}
                        className="p-0.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full ml-1"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>
        </form>

      </div>
    </header>
  );
};