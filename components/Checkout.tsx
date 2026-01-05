import React, { useState } from 'react';
import { ArrowLeft, MapPin, FileText, QrCode, Landmark, CreditCard, Wallet, Ticket, Check } from 'lucide-react';

interface CheckoutProps {
  totalAmount: number;
  onBack: () => void;
  onPlaceOrder: () => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ totalAmount, onBack, onPlaceOrder }) => {
  const [paymentMethod, setPaymentMethod] = useState('promptpay');
  const [taxInvoice, setTaxInvoice] = useState(false);

  return (
    <div className="flex flex-col h-full bg-neutral-900 text-white animate-in slide-in-from-right duration-300 relative">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-neutral-900 border-b border-gray-800">
        <div className="flex items-center justify-between p-4 h-16">
          <button 
            onClick={onBack}
            className="flex w-10 h-10 shrink-0 items-center justify-center rounded-full hover:bg-neutral-800 transition-colors text-white"
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">Checkout</h2>
        </div>
      </header>

      <main className="flex-1 flex flex-col gap-6 px-4 pt-6 pb-48 overflow-y-auto no-scrollbar">
        {/* Shipping Address */}
        <section>
          <h3 className="text-white text-lg font-bold leading-tight mb-3">Shipping Address</h3>
          <div className="bg-neutral-800 border border-gray-700 rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start gap-4">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-gray-400" />
                  <p className="text-white text-sm font-bold">Home</p>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed pl-7">
                  Somsak Jaidee<br/>
                  99/1 Sukhumvit Soi 55, Watthana<br/>
                  Bangkok 10110<br/>
                  +66 81 234 5678
                </p>
              </div>
              <button 
                onClick={() => alert('Edit Address\nOpen address form here...')}
                className="text-primary text-sm font-medium hover:underline shrink-0 px-2 py-1"
              >
                Edit
              </button>
            </div>
          </div>
        </section>

        {/* Tax Invoice Toggle */}
        <section>
          <div className="bg-neutral-800 border border-gray-700 rounded-lg overflow-hidden shadow-sm">
            <div className="flex items-center justify-between p-4 min-h-[3.5rem]">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center rounded-lg bg-blue-900/20 text-primary shrink-0 w-8 h-8">
                  <FileText size={20} />
                </div>
                <p className="text-white text-sm font-medium">Request Tax Invoice / E-Tax</p>
              </div>
              <button 
                onClick={() => setTaxInvoice(!taxInvoice)}
                className={`w-11 h-6 rounded-full relative transition-colors duration-200 ease-in-out ${taxInvoice ? 'bg-primary' : 'bg-gray-600'}`}
              >
                <div className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full shadow-sm transition-transform duration-200 ease-in-out ${taxInvoice ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        </section>

        {/* Payment Method */}
        <section>
          <h3 className="text-white text-lg font-bold leading-tight mb-3">Payment Method</h3>
          <div className="flex flex-col gap-3">
            {/* PromptPay */}
            <div 
              onClick={() => setPaymentMethod('promptpay')}
              className={`relative flex items-center p-4 bg-neutral-800 border rounded-lg cursor-pointer shadow-sm transition-all ${paymentMethod === 'promptpay' ? 'border-[#1a3a8f] ring-1 ring-[#1a3a8f]' : 'border-gray-700 hover:border-gray-600'}`}
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="bg-blue-900/20 p-2 rounded w-12 h-10 flex items-center justify-center shrink-0">
                  <QrCode size={24} className="text-[#5c7cfa]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white">Scan to Pay / PromptPay</span>
                  <span className="text-xs text-[#5c7cfa] font-medium">Free Fee</span>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'promptpay' ? 'border-[#1a3a8f] bg-[#1a3a8f]' : 'border-gray-600'}`}>
                {paymentMethod === 'promptpay' && <Check size={14} className="text-white" />}
              </div>
            </div>

            {/* Bank Transfer */}
            <div 
              onClick={() => setPaymentMethod('bank_transfer')}
              className={`relative flex items-center p-4 bg-neutral-800 border rounded-lg cursor-pointer shadow-sm transition-all ${paymentMethod === 'bank_transfer' ? 'border-primary ring-1 ring-primary' : 'border-gray-700 hover:border-gray-600'}`}
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="bg-gray-700/50 p-2 rounded w-12 h-10 flex items-center justify-center shrink-0">
                  <Landmark size={20} className="text-gray-400" />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex justify-between items-center w-full pr-4">
                    <span className="text-sm font-medium text-white">Bank Transfer</span>
                    <span className="text-xs text-primary font-medium underline">Upload Slip</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-3 h-3 rounded-full bg-[#00a950]"></div> 
                    <div className="w-3 h-3 rounded-full bg-[#4e2a84]"></div> 
                    <div className="w-3 h-3 rounded-full bg-[#1e90ff]"></div> 
                    <div className="w-3 h-3 rounded-full bg-gray-600 text-[8px] flex items-center justify-center text-gray-300">+2</div>
                  </div>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'bank_transfer' ? 'border-primary bg-primary' : 'border-gray-600'}`}>
                 {paymentMethod === 'bank_transfer' && <Check size={14} className="text-white" />}
              </div>
            </div>

            {/* Credit Card */}
            <div 
              onClick={() => setPaymentMethod('credit_card')}
              className={`relative flex items-center p-4 bg-neutral-800 border rounded-lg cursor-pointer shadow-sm transition-all ${paymentMethod === 'credit_card' ? 'border-primary ring-1 ring-primary' : 'border-gray-700 hover:border-gray-600'}`}
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="bg-gray-700/50 p-2 rounded w-12 h-10 flex items-center justify-center shrink-0">
                  <CreditCard size={20} className="text-gray-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white">Credit Card / Installment 0%</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-bold text-gray-400 bg-gray-700 px-1 rounded">VISA</span>
                    <span className="text-[10px] font-bold text-gray-400 bg-gray-700 px-1 rounded">MC</span>
                    <span className="text-[10px] text-gray-500">|</span>
                    <span className="text-[10px] text-gray-400">KBank, SCB, Citi</span>
                  </div>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'credit_card' ? 'border-primary bg-primary' : 'border-gray-600'}`}>
                {paymentMethod === 'credit_card' && <Check size={14} className="text-white" />}
              </div>
            </div>

            {/* TrueMoney */}
            <div 
              onClick={() => setPaymentMethod('truemoney')}
              className={`relative flex items-center p-4 bg-neutral-800 border rounded-lg cursor-pointer shadow-sm transition-all ${paymentMethod === 'truemoney' ? 'border-[#f58220] ring-1 ring-[#f58220]' : 'border-gray-700 hover:border-gray-600'}`}
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="bg-orange-900/20 p-2 rounded w-12 h-10 flex items-center justify-center shrink-0">
                  <Wallet size={20} className="text-[#f58220]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white">TrueMoney Wallet</span>
                  <span className="text-xs text-gray-500">Fast & Secure</span>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'truemoney' ? 'border-[#f58220] bg-[#f58220]' : 'border-gray-600'}`}>
                {paymentMethod === 'truemoney' && <Check size={14} className="text-white" />}
              </div>
            </div>
          </div>
        </section>

        {/* Voucher & Summary */}
        <section className="mb-4">
          <div className="flex gap-3 mb-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <Ticket size={18} className="text-gray-400" />
              </div>
              <input 
                className="block w-full p-3 ps-10 text-sm border rounded-lg bg-neutral-800 border-gray-600 placeholder-gray-400 text-white focus:ring-primary focus:border-primary" 
                placeholder="Enter Voucher Code" 
                type="text"
              />
            </div>
            <button className="px-4 py-2 text-sm font-medium text-primary bg-blue-900/30 hover:bg-blue-900/50 rounded-lg transition-colors">Apply</button>
          </div>
          
          <div className="py-4 border-t border-gray-700 mt-2 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Subtotal</span>
              <span className="font-medium text-white">${totalAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Shipping</span>
              <span className="font-medium text-white">Free</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">VAT (7%)</span>
              <span className="font-medium text-white">Included</span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 z-50 bg-neutral-900 border-t border-neutral-700 p-4 pb-8 shadow-[0_-4px_20px_rgba(0,0,0,0.4)]">
        <div className="w-full flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">Total Amount</span>
            <span className="text-2xl font-bold text-white tracking-tight">${totalAmount.toLocaleString()}</span>
          </div>
          <button 
            onClick={onPlaceOrder}
            className="flex-1 bg-primary hover:bg-blue-700 text-white font-bold h-12 rounded-lg shadow-lg shadow-blue-500/30 flex items-center justify-center transition-transform active:scale-[0.98]"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};