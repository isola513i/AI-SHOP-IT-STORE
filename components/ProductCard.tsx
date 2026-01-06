import React from 'react';
import { Heart, Plus } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onPress, 
  onAddToCart,
  isWishlisted = false,
  onToggleWishlist
}) => {
  const isDiscounted = !!product.originalPrice;

  return (
    <div 
      onClick={() => onPress(product)}
      className="flex flex-col shrink-0 w-[180px] snap-center bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-sm cursor-pointer group hover:shadow-md transition-all duration-300 animate-in fade-in zoom-in-95"
    >
      {/* Image Section */}
      <div className="relative w-full h-[140px] bg-gray-50 dark:bg-neutral-900 overflow-hidden">
        {product.badge && (
          <span className="absolute top-2 left-2 z-10 bg-primary/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            {product.badge}
          </span>
        )}
        
        {/* Background Image Approach for better control */}
        <div 
          className="w-full h-full bg-center bg-cover bg-no-repeat transition-transform duration-500 group-hover:scale-110" 
          style={{ backgroundImage: `url('${product.image}')` }}
          role="img"
          aria-label={product.title}
        />
        
        {/* Wishlist Button - Top Right overlay */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist?.(product);
          }}
          className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-sm transition-colors shadow-sm ${
            isWishlisted 
              ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20' 
              : 'bg-white/80 dark:bg-black/40 text-gray-400 hover:text-red-500 hover:bg-white'
          }`}
        >
          <Heart 
            size={16} 
            fill={isWishlisted ? "currentColor" : "none"}
            strokeWidth={isWishlisted ? 0 : 2} 
            className={isWishlisted ? "scale-110" : ""}
          />
        </button>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-3 gap-1 relative">
        <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          {product.brand}
        </span>
        
        <h3 className="text-[13px] font-bold text-gray-900 dark:text-white leading-tight line-clamp-2 h-[34px]">
          {product.title}
        </h3>

        <div className="mt-auto pt-2 flex items-center justify-between">
          <div className="flex flex-col leading-none">
            <span className={`text-sm font-bold ${isDiscounted ? 'text-red-500' : 'text-primary'}`}>
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] text-gray-400 line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.(product);
            }}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-black dark:bg-neutral-700 text-white shadow-sm hover:opacity-80 active:scale-95 transition-all"
            aria-label="Add to cart"
          >
            <Plus size={16} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
};