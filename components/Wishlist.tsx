import React from 'react';
import { Trash2, Heart } from 'lucide-react';
import { Product } from '../types';
import { Header } from './Header';

interface WishlistProps {
  wishlistItems: Product[];
  onRemove: (id: string) => void;
  onAddToCart: (product: Product) => void;
  onNavigate: (screen: string) => void;
  onBack: () => void;
  cartItemCount: number;
  onCartPress: () => void;
  onProductPress: (product: Product) => void;
  onSearchPress: () => void;
  onMenuClick?: () => void;
}

export const Wishlist: React.FC<WishlistProps> = ({ 
  wishlistItems, 
  onRemove, 
  onAddToCart, 
  onNavigate,
  onBack,
  cartItemCount,
  onCartPress,
  onProductPress,
  onSearchPress,
  onMenuClick
}) => {
  
  // Helper to simulate stock status for demo purposes
  const getStockStatus = (id: string) => {
    // Deterministic pseudo-random based on ID char code
    const charCode = id.charCodeAt(id.length - 1);
    return charCode % 3 === 0 ? 'out' : 'in';
  };

  return (
    <div className="flex flex-col h-full bg-neutral-900 text-white animate-in slide-in-from-right duration-300 relative">
      {/* Reusable Header */}
      <Header 
        title="My Wishlist" 
        cartCount={cartItemCount} 
        onCartClick={onCartPress}
        onSearchClick={onSearchPress}
        onMenuClick={onMenuClick}
      />

      {/* Scrollable Content with padding for fixed Header and Bottom Nav */}
      <main className="flex-1 overflow-y-auto no-scrollbar pt-20 pb-32 flex flex-col px-4">
        {wishlistItems.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center text-center px-6 pb-20">
                <div className="w-20 h-20 bg-neutral-800 rounded-full flex items-center justify-center mb-6">
                    <Heart size={32} className="text-gray-600" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Your wishlist is empty</h3>
                <p className="text-gray-500 max-w-[200px] leading-relaxed">Save your favorite items here to check them out later.</p>
            </div>
        ) : (
            <div className="flex flex-col gap-4">
            {wishlistItems.map((item) => {
                const stockStatus = getStockStatus(item.id);
                return (
                    <div 
                        key={item.id} 
                        onClick={() => onProductPress(item)}
                        className="group relative flex gap-4 bg-neutral-800/50 rounded-2xl p-4 transition-colors hover:bg-neutral-800 cursor-pointer"
                    >
                        {/* Thumbnail */}
                        <div className="shrink-0">
                            <div 
                                className="bg-white/5 bg-center bg-no-repeat bg-contain rounded-xl w-24 h-24 sm:w-24 sm:h-24" 
                                style={{ backgroundImage: `url('${item.image}')` }}
                            ></div>
                        </div>

                        {/* Content */}
                        <div className="flex flex-1 flex-col justify-between">
                            <div className="flex justify-between items-start gap-2">
                                <div>
                                    <h3 className="text-base font-bold text-white leading-tight line-clamp-2 pr-2">{item.title}</h3>
                                    <p className="text-sm font-semibold mt-1 text-gray-400">${item.price.toLocaleString()}</p>
                                </div>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onRemove(item.id);
                                    }}
                                    className="text-gray-500 hover:text-red-500 transition-colors p-2 -mr-2 -mt-2 rounded-full hover:bg-white/5"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>

                            <div className="flex items-end justify-between gap-2 mt-3">
                                {stockStatus === 'in' ? (
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </span>
                                        <span className="text-xs font-medium text-gray-400">In Stock</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                        <span className="text-xs font-medium text-gray-500">Out of Stock</span>
                                    </div>
                                )}
                                
                                {stockStatus === 'in' ? (
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onAddToCart(item);
                                        }}
                                        className="flex-1 max-w-[120px] h-9 bg-primary hover:bg-blue-600 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm shadow-blue-900/20"
                                    >
                                        Add to Cart
                                    </button>
                                ) : (
                                    <button 
                                        onClick={(e) => e.stopPropagation()}
                                        className="flex-1 max-w-[120px] h-9 bg-transparent border border-gray-700 text-gray-400 text-xs font-semibold rounded-lg flex items-center justify-center transition-colors hover:bg-gray-800"
                                    >
                                        Notify Me
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
            </div>
        )}
      </main>
    </div>
  );
};