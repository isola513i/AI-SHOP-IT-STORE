import React, { useState } from 'react';
import { ArrowLeft, Share2, Heart, Star, ShoppingBag, ShoppingCart, Scale } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product | any;
  onBack: () => void;
  onAddToCart?: (product: Product) => void;
  cartItemCount?: number;
  onCartPress?: () => void;
  onComparePress?: () => void;
  isWishlisted?: boolean;
  onToggleWishlist?: () => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ 
  product, 
  onBack, 
  onAddToCart,
  cartItemCount = 0,
  onCartPress,
  onComparePress,
  isWishlisted = false,
  onToggleWishlist
}) => {
  const [selectedRam, setSelectedRam] = useState('16GB');
  const [selectedStorage, setSelectedStorage] = useState('1TB');

  // Fallback values
  const title = product?.title || 'Product Title';
  const price = product?.price || 0;
  const originalPrice = product?.originalPrice;
  const image = product?.image || '';
  const rating = product?.rating || 0;
  const reviews = product?.reviews || 0;
  
  const isDiscounted = !!originalPrice;
  const discountPercent = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  const handleAddToCart = () => {
    if (product && onAddToCart) {
      onAddToCart(product);
      alert('Success: Item added to your cart');
    }
  };

  return (
    <div className="flex flex-col h-full bg-neutral-900 text-white relative z-50 animate-in slide-in-from-right duration-300">
      
      {/* Floating Header - Absolute Positioned */}
      <header className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-4 py-4 pointer-events-none">
        <button 
          onClick={onBack} 
          className="flex items-center justify-center w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-colors pointer-events-auto shadow-lg"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center gap-3 pointer-events-auto">
          <button className="flex items-center justify-center w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-colors shadow-lg">
            <Share2 size={20} />
          </button>
          <button 
            onClick={onToggleWishlist}
            className={`flex items-center justify-center w-10 h-10 rounded-full backdrop-blur-md transition-colors shadow-lg ${
              isWishlisted 
                ? 'bg-red-500 text-white' 
                : 'bg-black/40 text-white hover:bg-black/60'
            }`}
          >
            <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} strokeWidth={isWishlisted ? 0 : 2} />
          </button>
          <button 
            onClick={onCartPress}
            className="flex relative items-center justify-center w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-colors shadow-lg"
          >
            <ShoppingCart size={20} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-transparent shadow-sm pointer-events-none">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto pb-32 no-scrollbar">
        {/* Immersive Hero Image */}
        <section className="relative w-full h-[50vh] bg-neutral-900 overflow-hidden">
          <div 
            className="w-full h-full bg-center bg-cover bg-no-repeat" 
            style={{ backgroundImage: `url('${image}')` }}
          />
          {/* Subtle Bottom Fade */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-neutral-900 to-transparent pointer-events-none"></div>
        </section>

        {/* Overlapping Content Sheet */}
        <div className="relative -mt-10 bg-neutral-900 rounded-t-[2.5rem] px-6 pt-10 flex flex-col gap-8 min-h-[50vh] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.5)] z-10 border-t border-white/5">
          
          {/* Handle Bar */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-gray-700 rounded-full opacity-50"></div>

          {/* Title, Price, Rating */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-start gap-2">
                <h1 className="text-2xl font-bold tracking-tight leading-tight flex-1 text-white">{title}</h1>
                <button 
                    onClick={onComparePress} 
                    className="shrink-0 p-2.5 bg-neutral-800 rounded-full text-white hover:bg-primary transition-colors border border-gray-700"
                >
                    <Scale size={20} />
                </button>
            </div>
            
            <div className="flex items-center gap-3">
              <span className={`text-3xl font-bold ${isDiscounted ? 'text-red-500' : 'text-primary'}`}>
                ${price.toLocaleString()}
              </span>
              {isDiscounted && (
                 <div className="flex items-center gap-3">
                    <span className="text-lg text-gray-500 line-through">${originalPrice.toLocaleString()}</span>
                    <span className="text-xs font-bold text-red-500 bg-red-500/10 px-2.5 py-1 rounded-full border border-red-500/20">
                        -{discountPercent}%
                    </span>
                 </div>
              )}
            </div>

            <div className="flex items-center gap-2 mt-1">
              <div className="flex text-amber-500">
                {[1,2,3,4,5].map(i => <Star key={i} size={16} className="fill-current" />)}
              </div>
              <span className="font-bold text-base text-white">{rating}</span>
              <span className="text-gray-500 text-sm">({reviews} reviews)</span>
            </div>
          </div>

          <div className="h-px w-full bg-gray-800"></div>

          {/* Configuration */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs uppercase tracking-wider font-bold text-gray-500">Configuration</h3>
            <div className="flex flex-col gap-5">
              <div>
                <p className="text-sm font-semibold mb-3 text-gray-300">Memory (RAM)</p>
                <div className="flex flex-wrap gap-3">
                  {['16GB DDR5', '32GB DDR5'].map((ram) => (
                    <button
                      key={ram}
                      onClick={() => setSelectedRam(ram.split(' ')[0])}
                      className={`px-6 py-3 rounded-xl border font-medium text-sm transition-all ${
                        selectedRam === ram.split(' ')[0]
                          ? 'border-white bg-white text-black shadow-sm'
                          : 'border-gray-700 bg-transparent text-gray-400 hover:border-gray-500'
                      }`}
                    >
                      {ram}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold mb-3 text-gray-300">Storage</p>
                <div className="flex flex-wrap gap-3">
                  {['512GB SSD', '1TB SSD'].map((storage) => (
                    <button
                      key={storage}
                      onClick={() => setSelectedStorage(storage.split(' ')[0])}
                      className={`px-6 py-3 rounded-xl border font-medium text-sm transition-all ${
                        selectedStorage === storage.split(' ')[0]
                          ? 'border-white bg-white text-black shadow-sm'
                          : 'border-gray-700 bg-transparent text-gray-400 hover:border-gray-500'
                      }`}
                    >
                      {storage}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-gray-800"></div>

          {/* Description */}
          <div className="flex flex-col gap-3">
             <h3 className="text-xs uppercase tracking-wider font-bold text-gray-500">Description</h3>
             <p className="text-gray-300 leading-relaxed text-sm">
                {product?.description || "Experience uncompromising speed and efficiency with this flagship workstation component."}
             </p>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 z-40 w-full bg-neutral-900 border-t border-gray-800 p-4 pb-8 shadow-[0_-4px_30px_rgba(0,0,0,0.5)] max-w-md mx-auto transform -translate-x-1/2 left-1/2">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">Total Price</span>
            <span className={`text-2xl font-bold leading-none ${isDiscounted ? 'text-red-500' : 'text-primary'}`}>
              ${price.toLocaleString()}
            </span>
          </div>
          <button 
            onClick={handleAddToCart}
            className="flex-1 h-12 bg-primary hover:bg-blue-600 active:bg-blue-700 text-white rounded-xl font-bold text-base tracking-wide shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
          >
            Add to Cart
            <ShoppingBag size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};