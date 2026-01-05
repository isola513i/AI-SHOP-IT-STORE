import React from 'react';
import { Globe, Share2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-8 px-6 py-10 bg-footer-bg dark:bg-surface-dark border-t border-gray-200 dark:border-gray-800 text-slate-600 dark:text-slate-400 pb-24">
      <div className="grid grid-cols-2 gap-y-8 gap-x-4 mb-8">
        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Help Center</h4>
          <a className="text-xs hover:text-primary transition-colors" href="#">Customer Service</a>
          <a className="text-xs hover:text-primary transition-colors" href="#">Returns & Warranty</a>
          <a className="text-xs hover:text-primary transition-colors" href="#">Track Order</a>
          <a className="text-xs hover:text-primary transition-colors" href="#">Contact Us</a>
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">About Us</h4>
          <a className="text-xs hover:text-primary transition-colors" href="#">Our Story</a>
          <a className="text-xs hover:text-primary transition-colors" href="#">Careers</a>
          <a className="text-xs hover:text-primary transition-colors" href="#">Store Locations</a>
          <a className="text-xs hover:text-primary transition-colors" href="#">Blog</a>
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Policy</h4>
          <a className="text-xs hover:text-primary transition-colors" href="#">Privacy Policy</a>
          <a className="text-xs hover:text-primary transition-colors" href="#">Terms of Use</a>
          <a className="text-xs hover:text-primary transition-colors" href="#">Security</a>
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Follow Us</h4>
          <div className="flex gap-3">
            <a className="w-8 h-8 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-sm hover:text-primary transition-colors" href="#">
              <Globe size={18} />
            </a>
            <a className="w-8 h-8 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-sm hover:text-primary transition-colors" href="#">
              <Share2 size={18} />
            </a>
          </div>
        </div>
      </div>
      <div className="pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">AI-SHOP</h3>
        <p className="text-xs text-gray-500">© 2023 AI-SHOP Inc. All rights reserved.</p>
      </div>
    </footer>
  );
};