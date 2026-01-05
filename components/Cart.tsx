import React from 'react';
import { ArrowLeft, Trash2, Plus, Minus, Ticket, ShoppingBag, LogIn, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onRemoveItem: (id: string) => void;
  onBack: () => void;
  onCheckoutPress: () => void;
  onItemPress: (item: CartItem) => void;
  isLoggedIn: boolean;
}

export const Cart: React.FC<CartProps> = ({ 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onBack, 
  onCheckoutPress,
  onItemPress,
  isLoggedIn
}) => {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0; // Free shipping logic
  const total = subtotal + shipping;
  const isEmpty = cartItems.length === 0;

  return (
    <div className="flex flex-col h-full bg-neutral-900 text-white animate-in slide-in-from-right duration-300 relative">
      {/* Header */}
      <header className="flex-none flex items-center justify-between bg-neutral-900/95 backdrop-blur-md px-4 py-5 z-20">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="flex items-center justify-center p-1 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold tracking-tight text-white">
            My Cart
          </h1>
        </div>
      </header>

      {/* Cart Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center h-full px-6 text-center pb-20">
            <ShoppingBag size={80} className="text-neutral-700 mb-6" />
            
            <h2 className="text-2xl font-bold text-white mb-2">Your Cart is Empty</h2>
            <p className="text-gray-500 mb-8 max-w-[240px] leading-relaxed">
              Looks like you haven't made your choice yet.
            </p>
            
            <button 
              onClick={onBack}
              className="bg-primary hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg shadow-blue-900/20 active:scale-95"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col pb-48 gap-4 pt-2">
            {cartItems.map((item) => (
              <div 
                key={item.id} 
                onClick={() => onItemPress(item)}
                className="group flex flex-col p-4 bg-neutral-800/50 rounded-2xl cursor-pointer hover:bg-neutral-800 transition-colors"
              >
                <div className="flex gap-4">
                  {/* Image */}
                  <div className="shrink-0 relative h-[84px] w-[84px] overflow-hidden rounded-xl bg-neutral-800">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" 
                      style={{ backgroundImage: `url('${item.image}')` }}
                    />
                  </div>
                  
                  {/* Details */}
                  <div className="flex flex-1 flex-col justify-between py-0.5">
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="font-bold text-white text-[15px] leading-snug line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="font-bold text-white text-[15px] tracking-tight whitespace-nowrap">
                          ${item.price.toLocaleString()}
                        </p>
                      </div>
                      <button className="w-fit flex items-center gap-1 text-[13px] font-medium text-gray-400 hover:text-primary transition-colors group/warranty">
                        <span>Warranty: Standard 1 Year</span>
                      </button>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center mt-3 justify-between">
                      <div className="flex items-center gap-4" onClick={(e) => e.stopPropagation()}>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className={`flex h-7 w-7 items-center justify-center rounded-full border border-gray-700 transition-colors active:scale-95 ${item.quantity === 1 ? 'text-red-500 border-red-900/50 hover:bg-red-900/20' : 'text-gray-300 hover:border-primary hover:text-primary'}`}
                        >
                          {item.quantity === 1 ? <Trash2 size={14} /> : <Minus size={16} />}
                        </button>
                        <span className="text-[15px] font-semibold text-white w-3 text-center">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-700 text-gray-300 hover:border-primary hover:text-primary transition-colors active:scale-95"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Promo Code */}
            <div className="mt-2">
              <div className="flex items-center gap-3">
                <div className="relative flex-1 group/input">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within/input:text-primary transition-colors">
                    <Ticket size={20} />
                  </span>
                  <input 
                    className="w-full bg-neutral-800 rounded-lg py-3.5 pl-10 pr-4 text-[15px] font-medium text-white placeholder-gray-500 focus:ring-1 focus:ring-primary focus:bg-neutral-800 transition-all outline-none" 
                    placeholder="Enter promo code" 
                    type="text"
                  />
                </div>
                <button className="shrink-0 h-[46px] px-5 bg-transparent border border-transparent text-[15px] font-bold text-primary hover:bg-primary/10 rounded-lg transition-colors">
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer / Summary - ONLY Show when cart is NOT empty */}
      {!isEmpty && (
        <div className="absolute bottom-0 left-0 right-0 z-50 bg-neutral-900 border-t border-neutral-800 p-6 pt-4 pb-8 shadow-[0_-4px_20px_rgba(0,0,0,0.4)]">
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex justify-between items-center text-[15px]">
              <span className="text-gray-400 font-medium">Subtotal</span>
              <span className="font-bold text-white">${subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-[15px]">
              <span className="text-gray-400 font-medium">Shipping</span>
              <span className="font-bold text-primary">Free</span>
            </div>
            <div className="flex justify-between items-center mt-2 pt-3 border-t border-gray-800 border-dashed">
              <span className="text-lg font-bold text-white">Total</span>
              <span className="text-2xl font-black text-white tracking-tight">${total.toLocaleString()}</span>
            </div>
          </div>
          <button 
            onClick={onCheckoutPress}
            className="w-full bg-primary hover:bg-blue-600 active:bg-blue-700 text-white font-bold text-[16px] py-4 rounded-xl shadow-lg shadow-primary/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group/btn"
          >
            {isLoggedIn ? (
              <>
                <span>Proceed to Checkout</span>
                <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
              </>
            ) : (
              <>
                <span>Login to Checkout</span>
                <LogIn size={20} />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};