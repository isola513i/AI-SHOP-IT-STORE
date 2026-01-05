import React from 'react';
import { GPUProduct, NotebookProduct, BestSellerProduct, StoreProduct } from '../types';
import { Heart, Star, Plus } from 'lucide-react';

interface GPUCardProps {
  product: GPUProduct;
}

export const GPUCard: React.FC<GPUCardProps> = ({ product }) => {
  return (
    <div className="flex flex-col shrink-0 w-[170px] snap-center group">
      <div className="relative w-full aspect-[4/5] bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden mb-3 shadow-sm">
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-gray-100 dark:bg-gray-800 text-[10px] font-bold px-2 py-1 rounded-md text-slate-800 dark:text-slate-200">
            {product.badge}
          </span>
        </div>
        {product.discount && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            {product.discount}
          </span>
        )}
        <div 
          className="w-full h-full bg-center bg-contain bg-no-repeat p-6 transition-transform duration-500 ease-out group-hover:scale-110" 
          style={{ backgroundImage: `url('${product.image}')` }}
        />
      </div>
      <div className="flex flex-col gap-1 px-1">
        <h3 className="text-sm font-medium text-slate-900 dark:text-white leading-tight">
          {product.title}
        </h3>
        <p className="text-base font-bold text-red-600 dark:text-red-500">
          ${product.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

interface NotebookCardProps {
  product: NotebookProduct;
}

export const NotebookCard: React.FC<NotebookCardProps> = ({ product }) => {
  return (
    <div className="flex flex-col shrink-0 w-[220px] snap-center group">
      <div className="relative w-full aspect-video bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden mb-3 shadow-sm">
        <div className="absolute top-3 left-3 z-10">
          <span className={`${product.chipColorClass} text-white backdrop-blur text-[10px] font-bold px-2 py-1 rounded-full`}>
            {product.chip}
          </span>
        </div>
        <div 
          className="w-full h-full bg-center bg-contain bg-no-repeat p-4 mix-blend-multiply dark:mix-blend-normal transition-transform duration-500 ease-out group-hover:scale-105" 
          style={{ backgroundImage: `url('${product.image}')` }}
        />
      </div>
      <div className="flex flex-col gap-1 px-1">
        <h3 className="text-sm font-medium text-slate-900 dark:text-white leading-tight">
          {product.title}
        </h3>
        <div className="flex items-baseline gap-2">
          <p className="text-base font-bold text-red-600 dark:text-red-500">
            ${product.price.toLocaleString()}
          </p>
          <span className="text-xs text-gray-500">{product.specs}</span>
        </div>
      </div>
    </div>
  );
};

interface BestSellerCardProps {
  product: BestSellerProduct;
}

export const BestSellerCard: React.FC<BestSellerCardProps> = ({ product }) => {
  return (
    <div className="flex flex-col shrink-0 w-[160px] snap-center">
      <div className="relative w-full aspect-square bg-white dark:bg-surface-dark rounded-xl overflow-hidden mb-3 border border-gray-100 dark:border-gray-800 group">
        {product.discount && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            {product.discount}
          </span>
        )}
        <div 
          className="w-full h-full bg-center bg-cover bg-no-repeat p-4 transition-transform duration-300 group-hover:scale-105" 
          style={{ backgroundImage: `url('${product.image}')` }}
        />
        <button className="absolute top-2 right-2 p-1.5 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 transition-colors">
          <Heart size={18} />
        </button>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-baseline gap-1">
          <span className="text-xs font-bold text-amber-500 flex items-center gap-0.5">
            <Star size={14} fill="currentColor" />
            {product.rating}
          </span>
          <span className="text-[10px] text-gray-500">({product.reviews.toLocaleString()})</span>
        </div>
        <h3 className="text-sm font-medium text-slate-900 dark:text-white line-clamp-2 h-[40px]">
          {product.title}
        </h3>
        <div className="flex items-center justify-between mt-1">
          <div className="flex flex-col leading-none">
            <p className="text-base font-bold text-red-600 dark:text-red-500">
              ${product.price.toLocaleString()}
            </p>
            {product.oldPrice && (
              <p className="text-[10px] text-gray-300 line-through">
                ${product.oldPrice.toLocaleString()}
              </p>
            )}
          </div>
          <button className="bg-primary hover:bg-blue-700 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors">
            <Plus size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

interface CatalogCardProps {
  product: StoreProduct;
}

export const CatalogCard: React.FC<CatalogCardProps> = ({ product }) => {
  return (
    <div className="group flex flex-col bg-white dark:bg-surface-dark rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative aspect-square w-full mb-3 overflow-hidden rounded-lg">
        <div 
          className="w-full h-full bg-center bg-contain bg-no-repeat group-hover:scale-105 transition-transform duration-500 ease-out" 
          style={{ backgroundImage: `url('${product.image}')` }}
        />
      </div>
      <div className="flex flex-col flex-1 gap-1">
        <h3 className="text-[13px] font-bold text-gray-900 dark:text-white leading-tight line-clamp-2">
          {product.title}
        </h3>
        <div className="mt-auto pt-2 flex items-end justify-between">
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-200">
            ${product.price.toLocaleString()}
          </span>
          <button className="flex items-center justify-center w-7 h-7 rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-primary dark:hover:bg-gray-200 transition-colors shadow-sm">
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};