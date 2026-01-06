import React from 'react';
import { X, ChevronRight, HelpCircle, FileText, Settings, Moon, Smartphone, Monitor, Cpu, Headphones } from 'lucide-react';

interface SideMenuProps {
  visible: boolean;
  onClose: () => void;
  onNavigate: (screen: string) => void;
  onCategorySelect: (category: string) => void;
}

export const SideMenu: React.FC<SideMenuProps> = ({ visible, onClose, onNavigate, onCategorySelect }) => {
  const handleNav = (screen: string) => {
    onNavigate(screen);
    onClose();
  };

  const handleCatClick = (category: string) => {
    onCategorySelect(category);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={`fixed inset-y-0 left-0 z-[70] w-[80%] max-w-[320px] bg-neutral-900 text-white shadow-2xl transform transition-transform duration-300 ease-out flex flex-col border-r border-gray-800 ${
          visible ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
          <span className="text-xl font-bold tracking-tight">Menu</span>
          <button 
            onClick={onClose}
            className="p-2 -mr-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar py-2">
          
          {/* Section 1: Categories */}
          <div className="px-4 py-4">
            <h3 className="px-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Shop by Category</h3>
            <div className="flex flex-col gap-1">
              <button onClick={() => handleCatClick('GPU')} className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-neutral-800 transition-colors group text-left">
                <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                  <Cpu size={20} />
                </div>
                <span className="font-medium text-gray-200 group-hover:text-white">GPUs & Components</span>
              </button>
              
              <button onClick={() => handleCatClick('Notebook')} className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-neutral-800 transition-colors group text-left">
                <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                  <Smartphone size={20} />
                </div>
                <span className="font-medium text-gray-200 group-hover:text-white">Laptops & Phones</span>
              </button>

              <button onClick={() => handleCatClick('All')} className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-neutral-800 transition-colors group text-left">
                <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                  <Monitor size={20} />
                </div>
                <span className="font-medium text-gray-200 group-hover:text-white">Monitors</span>
              </button>

              <button onClick={() => handleCatClick('Accessory')} className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-neutral-800 transition-colors group text-left">
                <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                  <Headphones size={20} />
                </div>
                <span className="font-medium text-gray-200 group-hover:text-white">Accessories</span>
              </button>
            </div>
          </div>

          <div className="h-px bg-gray-800 mx-6 my-2"></div>

          {/* Section 2: Support */}
          <div className="px-4 py-4">
            <h3 className="px-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Help & Support</h3>
            <div className="flex flex-col gap-1">
              <button className="flex items-center justify-between px-3 py-3 rounded-xl hover:bg-neutral-800 transition-colors group text-left w-full">
                <div className="flex items-center gap-3">
                  <HelpCircle size={18} className="text-gray-400 group-hover:text-white" />
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white">Contact Us</span>
                </div>
              </button>
              <button className="flex items-center justify-between px-3 py-3 rounded-xl hover:bg-neutral-800 transition-colors group text-left w-full">
                <div className="flex items-center gap-3">
                  <FileText size={18} className="text-gray-400 group-hover:text-white" />
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white">Terms of Service</span>
                </div>
              </button>
            </div>
          </div>

          <div className="h-px bg-gray-800 mx-6 my-2"></div>

          {/* Section 3: App */}
          <div className="px-4 py-4">
            <h3 className="px-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">App Settings</h3>
            <div className="flex flex-col gap-1">
              <button className="flex items-center justify-between px-3 py-3 rounded-xl hover:bg-neutral-800 transition-colors group text-left w-full">
                <div className="flex items-center gap-3">
                  <Settings size={18} className="text-gray-400 group-hover:text-white" />
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white">Settings</span>
                </div>
                <ChevronRight size={16} className="text-gray-600" />
              </button>
              
              {/* Fake Toggle */}
              <div className="flex items-center justify-between px-3 py-3 rounded-xl hover:bg-neutral-800 transition-colors">
                <div className="flex items-center gap-3">
                  <Moon size={18} className="text-gray-400" />
                  <span className="text-sm font-medium text-gray-300">Dark Mode</span>
                </div>
                <div className="w-10 h-6 bg-primary rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-800 bg-neutral-900">
           <p className="text-xs text-gray-500 font-mono">AI-SHOP v2.4.0</p>
        </div>
      </div>
    </>
  );
};