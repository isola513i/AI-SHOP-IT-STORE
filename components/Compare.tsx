import React, { useState, useEffect } from 'react';
import { ArrowLeft, ShoppingCart, Plus, Scale, X, Check, Search } from 'lucide-react';
import { Product } from '../types';
import { Header } from './Header';

interface CompareProps {
  productA?: Product | null;
  productB?: Product | null;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
  cartItemCount: number;
  onCartClick: () => void;
  allProducts: Product[];
  onMenuClick?: () => void;
  onLogoClick?: () => void;
}

export const Compare: React.FC<CompareProps> = ({ 
  productA, 
  productB, 
  onBack, 
  onAddToCart,
  cartItemCount,
  onCartClick,
  allProducts,
  onMenuClick,
  onLogoClick
}) => {
  const [slot1, setSlot1] = useState<Product | null>(productA || null);
  const [slot2, setSlot2] = useState<Product | null>(productB || null);
  const [selectingSlot, setSelectingSlot] = useState<'slot1' | 'slot2' | null>(null);

  // Sync props if they change (mainly for initial load from Detail view)
  useEffect(() => {
    if (productA) setSlot1(productA);
    if (productB) setSlot2(productB);
  }, [productA, productB]);

  const handleSelectProduct = (product: Product) => {
    if (selectingSlot === 'slot1') {
      setSlot1(product);
      // Reset Slot 2 if Slot 1 changes to ensure fair comparison / category match
      setSlot2(null);
    } else {
      setSlot2(product);
    }
    setSelectingSlot(null);
  };

  const getSelectableProducts = () => {
    if (selectingSlot === 'slot1') {
      return allProducts;
    }
    if (selectingSlot === 'slot2' && slot1) {
      // Category Locking: Only show items of same category
      return allProducts.filter(p => p.category === slot1.category && p.id !== slot1.id);
    }
    return [];
  };

  const selectableProducts = getSelectableProducts();

  // Helper to determine specific specs based on category
  const renderSpecs = () => {
    const isGPU = slot1?.category === 'GPU';
    
    const displaySpecs = isGPU ? [
      {
        category: 'Performance',
        rows: [
          { label: 'CUDA Cores', valueA: '3584', valueB: '3072' },
          { label: 'Boost Clock', valueA: '1.78 GHz', valueB: '2.46 GHz' },
          { label: 'Base Clock', valueA: '1.32 GHz', valueB: '1.83 GHz' },
        ]
      },
      {
        category: 'Memory',
        rows: [
          { label: 'Capacity', valueA: '12GB GDDR6', valueB: '8GB GDDR6' },
          { label: 'Bus Width', valueA: '192-bit', valueB: '128-bit' },
          { label: 'Bandwidth', valueA: '360 GB/s', valueB: '272 GB/s' },
        ]
      },
      {
        category: 'Power & Build',
        rows: [
          { label: 'Consumption', valueA: '170 W', valueB: '115 W', badgeB: 'Efficient' },
          { label: 'Slot Size', valueA: '2-Slot', valueB: '2-Slot' },
          { label: 'Length', valueA: '242 mm', valueB: '240 mm' },
        ]
      }
    ] : [
       {
        category: 'General',
        rows: [
          { label: 'Brand', valueA: slot1?.brand, valueB: slot2?.brand },
          { label: 'Category', valueA: slot1?.category, valueB: slot2?.category },
          { label: 'Rating', valueA: slot1?.rating, valueB: slot2?.rating },
        ]
      },
      {
        category: 'Pricing',
        rows: [
           { label: 'Price', valueA: `$${slot1?.price.toLocaleString()}`, valueB: `$${slot2?.price.toLocaleString()}` },
           { label: 'Savings', valueA: slot1?.originalPrice ? `$${(slot1.originalPrice - slot1.price)}` : '-', valueB: slot2?.originalPrice ? `$${(slot2.originalPrice - slot2.price)}` : '-' },
        ]
      }
    ];

    return (
      <div className="flex flex-col w-full pb-8">
        {displaySpecs.map((section, idx) => (
          <div key={idx} className="w-full mt-2 first:mt-0">
            <div className="px-4 py-3 bg-neutral-900 border-b border-gray-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">{section.category}</h3>
            </div>
            {section.rows.map((row, rIdx) => (
              <div 
                key={rIdx} 
                className={`grid grid-cols-2 relative py-4 px-2 ${rIdx % 2 === 0 ? 'bg-neutral-900' : 'bg-neutral-800'}`}
              >
                <span 
                  className={`absolute top-1 left-1/2 -translate-x-1/2 text-[10px] uppercase font-medium text-gray-400 tracking-wide px-2 rounded ${rIdx % 2 === 0 ? 'bg-neutral-900' : 'bg-neutral-800'}`}
                >
                  {row.label}
                </span>
                <div className="text-center text-sm font-bold text-white flex items-center justify-center gap-1">
                  {row.valueA}
                </div>
                <div className="text-center text-sm font-bold text-white flex items-center justify-center gap-1">
                  {row.valueB}
                  {/* @ts-ignore */}
                  {row.badgeB && (
                      /* @ts-ignore */
                     <span className="text-[10px] bg-green-900 text-green-300 px-1 rounded ml-1">{row.badgeB}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  // Selection Overlay
  if (selectingSlot) {
    return (
      <div className="flex flex-col h-full bg-neutral-900 text-white animate-in slide-in-from-bottom duration-300 z-[60] absolute inset-0">
        <div className="p-4 flex items-center gap-3 border-b border-gray-800 bg-neutral-900 sticky top-0 z-10">
           <button onClick={() => setSelectingSlot(null)} className="p-2 -ml-2 rounded-full hover:bg-neutral-800">
             <ArrowLeft size={24} />
           </button>
           <h2 className="font-bold text-lg">Select {selectingSlot === 'slot1' ? 'First Product' : 'Opponent'}</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4 pb-32 no-scrollbar">
           {selectableProducts.map(p => (
             <div 
               key={p.id} 
               onClick={() => handleSelectProduct(p)} 
               className="flex gap-4 p-4 mb-3 border border-gray-800 bg-neutral-800/50 cursor-pointer hover:bg-neutral-800 rounded-xl transition-colors"
             >
                <div className="w-20 h-20 bg-white rounded-lg p-2 shrink-0">
                   <img src={p.image} alt={p.title} className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col justify-center">
                   <h3 className="font-bold text-sm leading-tight mb-1">{p.title}</h3>
                   <p className="text-primary font-bold">${p.price.toLocaleString()}</p>
                   <span className="text-[10px] uppercase font-bold text-gray-500 bg-gray-800 px-2 py-1 rounded w-fit mt-2">{p.category}</span>
                </div>
             </div>
           ))}
           {selectableProducts.length === 0 && (
             <div className="flex flex-col items-center justify-center pt-20 text-gray-500">
               <Scale size={48} className="mb-4 opacity-50" />
               <p className="text-center px-8">No compatible products found in this category.</p>
               {selectingSlot === 'slot2' && (
                 <button onClick={() => setSelectingSlot(null)} className="mt-4 text-primary font-bold">Go Back</button>
               )}
             </div>
           )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-neutral-900 text-white animate-in slide-in-from-right duration-300 relative">
      {/* 1. Navigation Header */}
      <Header 
        cartCount={cartItemCount} 
        onCartClick={onCartClick} 
        onMenuClick={onMenuClick}
        onLogoClick={onLogoClick}
      />
      
      {/* Spacer for Fixed Header */}
      <div className="h-[60px] shrink-0"></div>

      {/* 2. Compare Slots (Dotted Cards) */}
      <div className="sticky top-[58px] z-30 bg-neutral-900/95 backdrop-blur-md shadow-sm border-b border-gray-800 pb-4 pt-2">
        <div className="grid grid-cols-2 gap-3 px-4 relative">
            {/* VS Badge */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-white text-neutral-900 text-[10px] font-bold px-2 py-1 rounded-full shadow-lg border border-gray-200">
                VS
            </div>

            {/* Slot 1 */}
            <div 
                onClick={() => setSelectingSlot('slot1')}
                className={`relative h-44 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 overflow-hidden group ${slot1 ? 'border-gray-700 bg-neutral-800' : 'border-dashed border-gray-700 hover:border-gray-500 hover:bg-neutral-800/50'}`}
            >
                {slot1 ? (
                    <>
                        <div className="h-24 w-full p-2 flex items-center justify-center">
                             <img src={slot1.image} alt={slot1.title} className="max-h-full max-w-full object-contain drop-shadow-lg" />
                        </div>
                        <div className="w-full px-3 text-center bg-neutral-900/50 py-2 flex-1 flex flex-col justify-center">
                            <p className="text-[11px] font-bold leading-tight line-clamp-2">{slot1.title}</p>
                            <p className="text-[10px] text-gray-400 mt-0.5">{slot1.brand}</p>
                        </div>
                        <button 
                            onClick={(e) => { e.stopPropagation(); setSlot1(null); setSlot2(null); }}
                            className="absolute top-2 right-2 p-1 bg-black/50 hover:bg-red-500/80 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X size={12} />
                        </button>
                    </>
                ) : (
                    <>
                        <div className="w-12 h-12 rounded-full bg-neutral-800 group-hover:bg-neutral-700 flex items-center justify-center transition-colors">
                            <Plus size={24} className="text-gray-400 group-hover:text-white" />
                        </div>
                        <span className="text-xs font-bold text-gray-500 group-hover:text-gray-300">Select Product 1</span>
                    </>
                )}
            </div>

            {/* Slot 2 */}
            <div 
                onClick={() => {
                    if (!slot1) {
                         // Must select slot 1 first to establish category
                         setSelectingSlot('slot1');
                    } else {
                         setSelectingSlot('slot2');
                    }
                }}
                className={`relative h-44 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 overflow-hidden group ${slot2 ? 'border-gray-700 bg-neutral-800' : 'border-dashed border-gray-700 hover:border-gray-500 hover:bg-neutral-800/50'}`}
            >
                {slot2 ? (
                    <>
                        <div className="h-24 w-full p-2 flex items-center justify-center">
                             <img src={slot2.image} alt={slot2.title} className="max-h-full max-w-full object-contain drop-shadow-lg" />
                        </div>
                        <div className="w-full px-3 text-center bg-neutral-900/50 py-2 flex-1 flex flex-col justify-center">
                            <p className="text-[11px] font-bold leading-tight line-clamp-2">{slot2.title}</p>
                            <p className="text-[10px] text-gray-400 mt-0.5">{slot2.brand}</p>
                        </div>
                        <button 
                            onClick={(e) => { e.stopPropagation(); setSlot2(null); }}
                            className="absolute top-2 right-2 p-1 bg-black/50 hover:bg-red-500/80 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X size={12} />
                        </button>
                    </>
                ) : (
                    <>
                         <div className="w-12 h-12 rounded-full bg-neutral-800 group-hover:bg-neutral-700 flex items-center justify-center transition-colors">
                            <Plus size={24} className="text-gray-400 group-hover:text-white" />
                        </div>
                        <span className="text-xs font-bold text-gray-500 group-hover:text-gray-300">Select Product 2</span>
                        {!slot1 && <span className="text-[9px] text-gray-600">(Select Left First)</span>}
                    </>
                )}
            </div>
        </div>
      </div>

      {/* 3. Main Content Grid */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-[180px]">
        {slot1 && slot2 ? renderSpecs() : (
           <div className="flex flex-col items-center justify-center py-12 text-gray-600 dark:text-gray-500 gap-4 px-10 text-center animate-in fade-in duration-500">
             <p className="text-sm font-medium leading-relaxed max-w-[200px] opacity-50">
               Fill both slots to view detailed comparison
             </p>
           </div>
        )}
      </div>

      {/* 4. Improved Footer */}
      <div className="fixed bottom-[64px] left-0 w-full bg-neutral-900/95 backdrop-blur border-t border-gray-800 py-4 z-40 max-w-md mx-auto transform -translate-x-1/2 left-1/2 shadow-[0_-4px_20px_rgba(0,0,0,0.4)]">
        <div className="grid grid-cols-2 gap-4 px-4">
             {/* Left Actions */}
             <div className="flex flex-col gap-2">
                <div className="flex flex-col px-1 h-10 justify-center">
                    {slot1 ? (
                        <>
                           <span className="text-[10px] text-gray-400 font-bold uppercase">Price</span>
                           <span className="text-lg font-bold text-white">${slot1.price.toLocaleString()}</span>
                        </>
                    ) : (
                        <span className="text-sm text-gray-600 font-medium">--</span>
                    )}
                </div>
                <button 
                    onClick={() => slot1 && onAddToCart(slot1)}
                    disabled={!slot1}
                    className={`flex items-center justify-center gap-2 h-11 rounded-xl text-xs font-bold uppercase transition-all ${slot1 ? 'bg-neutral-800 hover:bg-neutral-700 text-white' : 'bg-neutral-800/30 text-gray-600 cursor-not-allowed'}`}
                >
                    <ShoppingCart size={16} />
                    Add to Cart
                </button>
             </div>

             {/* Right Actions */}
             <div className="flex flex-col gap-2">
                <div className="flex flex-col px-1 h-10 justify-center">
                    {slot2 ? (
                        <>
                           <span className="text-[10px] text-gray-400 font-bold uppercase">Price</span>
                           <span className="text-lg font-bold text-white">${slot2.price.toLocaleString()}</span>
                        </>
                    ) : (
                        <span className="text-sm text-gray-600 font-medium">--</span>
                    )}
                </div>
                <button 
                    onClick={() => slot2 && onAddToCart(slot2)}
                    disabled={!slot2}
                    className={`flex items-center justify-center gap-2 h-11 rounded-xl text-xs font-bold uppercase transition-all ${slot2 ? 'bg-primary hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-neutral-800/30 text-gray-600 cursor-not-allowed'}`}
                >
                    <ShoppingCart size={16} />
                    Add to Cart
                </button>
             </div>
        </div>
      </div>
    </div>
  );
};