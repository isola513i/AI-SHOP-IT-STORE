import React, { useState } from 'react';
import { Search, SlidersHorizontal, MessageSquare, X, SearchX } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { FilterModal } from './FilterModal';
import { ALL_PRODUCTS } from '../data';
import { Product } from '../types';

interface StoreProps {
  onProductSelect?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  wishlistItems?: Product[];
  onToggleWishlist?: (product: Product) => void;
  // Props from App.tsx
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const categories = ['All', 'GPU', 'Notebook', 'Accessory'];

export const Store: React.FC<StoreProps> = ({ 
    onProductSelect, 
    onAddToCart,
    wishlistItems = [],
    onToggleWishlist,
    searchQuery,
    setSearchQuery
}) => {
  const [activeCategory, setActiveCategory] = useState('All');
  // Removed local searchQuery state in favor of props
  const [isFilterVisible, setFilterVisible] = useState(false);

  const filteredProducts = ALL_PRODUCTS.filter(p => {
    // 1. Category Filter
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    
    // 2. Search Query Filter (Case Insensitive)
    // Checking Title and Brand for better UX
    const query = searchQuery.toLowerCase();
    const matchesSearch = searchQuery === '' || 
                          p.title.toLowerCase().includes(query) || 
                          p.brand.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  const isProductWishlisted = (id: string) => {
    return wishlistItems.some(item => item.id === id);
  };
  
  const handleApplyFilters = (filters: any) => {
    console.log('Filters Applied:', filters);
    // In a real app, this would filter the ALL_PRODUCTS list further
  };

  return (
    <div className="flex-1 flex flex-col h-full pt-16 bg-[#f4f4f5] dark:bg-background-dark">
      {/* Sticky Search Header (Synchronized with Global Header via props) */}
      <div className="shrink-0 z-30 bg-[#f4f4f5]/95 dark:bg-background-dark/95 backdrop-blur-md px-5 py-2 pt-2 transition-colors">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-gray-400" size={20} />
            </div>
            <input 
              className="block w-full pl-10 pr-10 py-3 rounded-xl border-none bg-white dark:bg-gray-800 shadow-sm text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-600 transition-shadow" 
              placeholder="Search products..." 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery.length > 0 && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <button 
            onClick={() => setFilterVisible(true)}
            className="flex items-center justify-center w-[46px] h-[46px] shrink-0 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm hover:bg-gray-50 transition-colors"
          >
            <SlidersHorizontal size={22} />
          </button>
        </div>
        
        {/* Categories */}
        <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-6 py-2 rounded-full border text-xs font-bold tracking-wide uppercase active:scale-95 transition-transform ${
                activeCategory === cat 
                  ? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black' 
                  : 'border-transparent bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid or No Results */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-32 no-scrollbar">
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full pb-20 pt-10 text-center animate-in fade-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <SearchX size={40} className="text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">No results found</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[200px]">
              We couldn't find any items matching "{searchQuery}"
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 place-items-center">
            {filteredProducts.map((product) => (
              <div key={product.id} className="w-full flex justify-center">
                {/* ProductCard is wrapped to control its max width if needed, or let it fill */}
                <div className="w-full max-w-[180px]"> 
                  <ProductCard 
                    product={product} 
                    onPress={(p) => onProductSelect?.(p)}
                    onAddToCart={onAddToCart}
                    isWishlisted={isProductWishlisted(product.id)}
                    onToggleWishlist={onToggleWishlist}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Chat FAB */}
      <button className="fixed bottom-24 right-5 z-40 w-14 h-14 bg-black dark:bg-white text-white dark:text-black rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:scale-110 active:scale-95 transition-all flex items-center justify-center">
        <MessageSquare size={24} />
      </button>

      {/* Filter Modal */}
      <FilterModal 
        visible={isFilterVisible} 
        onClose={() => setFilterVisible(false)} 
        onApply={handleApplyFilters}
      />
    </div>
  );
};