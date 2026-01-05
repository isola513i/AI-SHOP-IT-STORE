import React, { useState, useEffect } from 'react';
import { X, ChevronDown, Check } from 'lucide-react';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({ visible, onClose, onApply }) => {
  const [minPrice, setMinPrice] = useState('10000');
  const [maxPrice, setMaxPrice] = useState('50000');
  const [selectedBrands, setSelectedBrands] = useState<string[]>(['ASUS', 'Apple']);
  const [selectedCPUs, setSelectedCPUs] = useState<string[]>(['Intel Core i9']);
  const [openAccordions, setOpenAccordions] = useState<string[]>(['cpu']); // 'cpu' is open by default
  const [selectedRAM, setSelectedRAM] = useState<string | null>('16GB');
  const [selectedStorage, setSelectedStorage] = useState<string | null>('SSD');
  
  // Sort State
  const [sortBy, setSortBy] = useState('Recommended');
  const sortOptions = ['Recommended', 'Newest', 'Price: Low to High', 'Price: High to Low'];

  // Reset logic
  const handleReset = () => {
    setMinPrice('');
    setMaxPrice('');
    setSelectedBrands([]);
    setSelectedCPUs([]);
    setSelectedRAM(null);
    setSelectedStorage(null);
    setSortBy('Recommended');
  };

  const handleApply = () => {
    onApply({
      sortBy,
      minPrice,
      maxPrice,
      brands: selectedBrands,
      cpus: selectedCPUs,
      ram: selectedRAM,
      storage: selectedStorage
    });
    onClose();
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const toggleCPU = (cpu: string) => {
    setSelectedCPUs(prev => 
      prev.includes(cpu) ? prev.filter(c => c !== cpu) : [...prev, cpu]
    );
  };

  const toggleAccordion = (section: string) => {
    setOpenAccordions(prev => 
      prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
    );
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Container - Bottom Sheet Style */}
      <div className="relative w-full h-[92vh] bg-neutral-900 rounded-t-3xl flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300 border-t border-gray-800">
        
        {/* Drag Handle */}
        <div className="w-full flex justify-center pt-3 pb-1 shrink-0 bg-neutral-900 z-10">
            <div className="h-1.5 w-12 rounded-full bg-gray-700"></div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 shrink-0 bg-neutral-900 z-10">
            <h1 className="text-2xl font-bold tracking-tight text-white">Filter & Sort</h1>
            <button 
                onClick={handleReset}
                className="text-sm font-semibold text-primary hover:text-blue-400 transition-colors"
            >
                Reset All
            </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
            
            {/* Sort By Section - Added at Top */}
            <div className="px-6 py-6 border-b border-gray-800">
              <h3 className="text-lg font-bold text-white mb-4">Sort By</h3>
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                {sortOptions.map((option) => (
                   <button
                    key={option}
                    onClick={() => setSortBy(option)}
                    className={`shrink-0 px-5 py-2.5 rounded-full border text-sm font-medium transition-all whitespace-nowrap ${
                        sortBy === option
                            ? 'border-primary bg-primary text-white shadow-lg shadow-primary/20'
                            : 'border-gray-700 bg-neutral-800 text-gray-300 hover:border-gray-500'
                    }`}
                   >
                     {option}
                   </button>
                ))}
              </div>
            </div>

            {/* Price Range Section */}
            <div className="px-6 pt-8 pb-6 border-b border-gray-800">
                <h3 className="text-lg font-bold text-white mb-6">Price Range</h3>
                
                {/* Visual Slider Track */}
                <div className="relative w-full h-1 bg-gray-700 rounded-full mb-8 mt-2">
                    <div className="absolute left-[20%] right-[30%] h-full bg-primary rounded-full"></div>
                    {/* Left Thumb */}
                    <div className="absolute left-[20%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-white border-2 border-primary rounded-full shadow-md z-10 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    </div>
                    {/* Right Thumb */}
                    <div className="absolute right-[30%] top-1/2 -translate-y-1/2 translate-x-1/2 w-6 h-6 bg-white border-2 border-primary rounded-full shadow-md z-10 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    </div>
                </div>

                {/* Inputs */}
                <div className="flex items-center gap-4">
                    <div className="flex-1 relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">฿</span>
                        <input 
                            className="w-full pl-7 pr-3 py-2.5 bg-gray-800 border-none rounded-lg text-sm font-semibold text-white focus:ring-2 focus:ring-primary/50 placeholder-gray-500 text-center" 
                            type="text" 
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                        <label className="absolute -top-2 left-2 text-[10px] uppercase font-bold text-gray-400 tracking-wider bg-neutral-900 px-1">Min</label>
                    </div>
                    <div className="w-2 h-[2px] bg-gray-700"></div>
                    <div className="flex-1 relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">฿</span>
                        <input 
                            className="w-full pl-7 pr-3 py-2.5 bg-gray-800 border-none rounded-lg text-sm font-semibold text-white focus:ring-2 focus:ring-primary/50 placeholder-gray-500 text-center" 
                            type="text" 
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                        <label className="absolute -top-2 left-2 text-[10px] uppercase font-bold text-gray-400 tracking-wider bg-neutral-900 px-1">Max</label>
                    </div>
                </div>
            </div>

            {/* Brand Section */}
            <div className="px-6 py-8 border-b border-gray-800">
                <h3 className="text-lg font-bold text-white mb-4">Brand</h3>
                <div className="grid grid-cols-2 gap-4">
                    {['ASUS', 'MSI', 'Dell', 'Apple', 'Lenovo', 'HP'].map((brand) => {
                        const isSelected = selectedBrands.includes(brand);
                        return (
                            <label key={brand} className="flex items-center gap-3 cursor-pointer group" onClick={() => toggleBrand(brand)}>
                                <div className={`relative flex items-center justify-center w-5 h-5 rounded transition-all ${isSelected ? 'bg-primary border-primary border' : 'bg-gray-800 border-gray-600 border-2 group-hover:border-primary'}`}>
                                    {isSelected && <Check size={14} className="text-white font-bold" strokeWidth={4} />}
                                </div>
                                <span className={`text-sm font-medium transition-colors ${isSelected ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>{brand}</span>
                            </label>
                        );
                    })}
                </div>
            </div>

            {/* Accordion: Processor (CPU) */}
            <div className="border-b border-gray-800">
                <button 
                    className="w-full flex items-center justify-between px-6 py-6"
                    onClick={() => toggleAccordion('cpu')}
                >
                    <h3 className="text-lg font-bold text-white">Processor (CPU)</h3>
                    <ChevronDown size={24} className={`text-gray-500 transition-transform duration-300 ${openAccordions.includes('cpu') ? 'rotate-180' : ''}`} />
                </button>
                
                {openAccordions.includes('cpu') && (
                    <div className="px-6 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2">
                        {['Intel Core i9', 'Intel Core i7', 'Apple M2 / M3'].map((cpu) => {
                            const isSelected = selectedCPUs.includes(cpu);
                            return (
                                <div 
                                    key={cpu}
                                    onClick={() => toggleCPU(cpu)}
                                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer border transition-all ${isSelected ? 'bg-gray-800/50 border-transparent' : 'bg-neutral-900 border-gray-700 hover:border-primary'}`}
                                >
                                    <span className="text-sm font-medium text-gray-200">{cpu}</span>
                                    <div className={`relative flex items-center justify-center w-5 h-5 rounded ${isSelected ? 'bg-primary border-primary border' : 'bg-gray-800 border-gray-600 border-2'}`}>
                                        {isSelected && <Check size={14} className="text-white font-bold" strokeWidth={4} />}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Accordion: Graphics (GPU) */}
            <div className="border-b border-gray-800">
                <button 
                    className="w-full flex items-center justify-between px-6 py-6"
                    onClick={() => toggleAccordion('gpu')}
                >
                    <h3 className="text-lg font-bold text-white">Graphics (GPU)</h3>
                    <ChevronDown size={24} className={`text-gray-500 transition-transform duration-300 ${openAccordions.includes('gpu') ? 'rotate-180' : ''}`} />
                </button>
                
                {openAccordions.includes('gpu') && (
                    <div className="px-6 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2">
                         <div className="flex items-center gap-3">
                            <div className="relative flex items-center justify-center w-5 h-5 bg-gray-800 border-gray-600 border-2 rounded"></div>
                            <span className="text-sm text-gray-300">NVIDIA RTX 40 Series</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative flex items-center justify-center w-5 h-5 bg-gray-800 border-gray-600 border-2 rounded"></div>
                            <span className="text-sm text-gray-300">NVIDIA RTX 30 Series</span>
                        </div>
                    </div>
                )}
            </div>

            {/* RAM Section (Chips) */}
            <div className="px-6 pt-8 pb-4">
                <h3 className="text-lg font-bold text-white mb-4">RAM</h3>
                <div className="flex flex-wrap gap-3">
                    {['8GB', '16GB', '32GB', '64GB+'].map((ram) => (
                        <button
                            key={ram}
                            onClick={() => setSelectedRAM(ram)}
                            className={`px-5 py-2.5 rounded-full border text-sm font-medium transition-all ${
                                selectedRAM === ram 
                                    ? 'border-primary bg-primary/20 text-primary shadow-sm' 
                                    : 'border-gray-700 bg-gray-800 text-gray-300 hover:border-primary hover:text-primary'
                            }`}
                        >
                            {ram}
                        </button>
                    ))}
                </div>
            </div>

            {/* Storage Type (Chips) */}
            <div className="px-6 py-4">
                <h3 className="text-lg font-bold text-white mb-4">Storage Type</h3>
                <div className="flex flex-wrap gap-3">
                     {['SSD', 'HDD', 'M.2 NVMe'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setSelectedStorage(type)}
                            className={`px-5 py-2.5 rounded-full border text-sm font-medium transition-all ${
                                selectedStorage === type 
                                    ? 'border-primary bg-primary/20 text-primary shadow-sm' 
                                    : 'border-gray-700 bg-gray-800 text-gray-300 hover:border-primary hover:text-primary'
                            }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* Sticky Footer */}
        <div className="absolute bottom-0 left-0 w-full p-4 pb-8 bg-neutral-900 border-t border-gray-800 shadow-[0_-8px_30px_rgba(0,0,0,0.5)] z-20">
            <button 
                onClick={handleApply}
                className="w-full flex items-center justify-center bg-primary hover:bg-blue-600 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all"
            >
                Show 42 Results
            </button>
        </div>

      </div>
    </div>
  );
};