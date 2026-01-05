import React from 'react';
import { 
  Wallet, Package, Truck, MessageSquare, 
  Heart, Ticket, FileText, Settings, 
  LogOut, ChevronRight, ShieldCheck 
} from 'lucide-react';

interface ProfileProps {
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ onNavigate, onLogout }) => {
  return (
    <div className="flex flex-col h-full bg-neutral-900 text-white animate-in slide-in-from-right duration-300 relative">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-neutral-900 px-4 py-4">
        <h1 className="text-xl font-bold text-center">My Profile</h1>
      </header>

      {/* Increased bottom padding to 160px (pb-40) to ensure content clears bottom nav */}
      <main className="flex-1 overflow-y-auto no-scrollbar p-4 pb-40 flex flex-col gap-6">
        
        {/* User Info */}
        <div className="flex items-center gap-4 px-2">
          <div className="w-16 h-16 rounded-full bg-gray-700 overflow-hidden border-2 border-primary">
            <img 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold">Alex Johnson</h2>
            <div className="flex items-center gap-1.5 mt-1 bg-yellow-500/20 px-2 py-0.5 rounded-full w-fit">
              <ShieldCheck size={14} className="text-yellow-500" />
              <span className="text-xs font-bold text-yellow-500 uppercase tracking-wide">Gold Member</span>
            </div>
          </div>
        </div>

        {/* My Orders */}
        <section className="bg-neutral-800/50 rounded-2xl p-4">
          <div className="flex justify-between items-center mb-4 px-1">
            <h3 className="font-bold text-lg">My Orders</h3>
            <button 
              onClick={() => alert('My Orders\n\nNavigating to All Orders...')}
              className="text-xs text-gray-400 hover:text-white flex items-center gap-1"
            >
              View All <ChevronRight size={14} />
            </button>
          </div>
          <div className="flex justify-between items-start px-2">
             {/* To Pay */}
             <button 
                onClick={() => alert('My Orders\n\nNavigating to To Pay screen...')}
                className="flex flex-col items-center gap-2 group relative"
             >
                <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                  <Wallet size={24} />
                </div>
                <span className="text-xs font-medium text-gray-400 group-hover:text-white">To Pay</span>
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-neutral-800 shadow-sm">1</span>
             </button>

             {/* To Ship */}
             <button 
                onClick={() => alert('My Orders\n\nNavigating to To Ship screen...')}
                className="flex flex-col items-center gap-2 group"
             >
                <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                  <Package size={24} />
                </div>
                <span className="text-xs font-medium text-gray-400 group-hover:text-white">To Ship</span>
             </button>

             {/* To Receive */}
             <button 
                onClick={() => alert('My Orders\n\nNavigating to To Receive screen...')}
                className="flex flex-col items-center gap-2 group relative"
             >
                <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                  <Truck size={24} />
                </div>
                <span className="text-xs font-medium text-gray-400 group-hover:text-white">To Receive</span>
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-neutral-800 shadow-sm">2</span>
             </button>

             {/* Review */}
             <button 
                onClick={() => alert('My Orders\n\nNavigating to Review screen...')}
                className="flex flex-col items-center gap-2 group"
             >
                <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                  <MessageSquare size={24} />
                </div>
                <span className="text-xs font-medium text-gray-400 group-hover:text-white">Review</span>
             </button>
          </div>
        </section>

        {/* Menu List */}
        <section className="flex flex-col gap-2">
          <button 
            onClick={() => onNavigate('wishlist')}
            className="w-full flex items-center justify-between p-4 bg-neutral-800/50 rounded-2xl hover:bg-neutral-800 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                <Heart size={18} className="text-gray-400 group-hover:text-red-500 transition-colors" />
              </div>
              <span className="font-medium">My Wishlist</span>
            </div>
            <ChevronRight size={18} className="text-gray-500" />
          </button>

          <button className="w-full flex items-center justify-between p-4 bg-neutral-800/50 rounded-2xl hover:bg-neutral-800 transition-colors group">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center group-hover:bg-yellow-500/20 transition-colors">
                  <Ticket size={18} className="text-gray-400 group-hover:text-yellow-500 transition-colors" />
               </div>
              <span className="font-medium">My Coupons</span>
            </div>
            <ChevronRight size={18} className="text-gray-500" />
          </button>

          <button className="w-full flex items-center justify-between p-4 bg-neutral-800/50 rounded-2xl hover:bg-neutral-800 transition-colors group">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                  <FileText size={18} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
               </div>
              <span className="font-medium">Tax Invoice</span>
            </div>
            <ChevronRight size={18} className="text-gray-500" />
          </button>

          <button className="w-full flex items-center justify-between p-4 bg-neutral-800/50 rounded-2xl hover:bg-neutral-800 transition-colors group">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Settings size={18} className="text-gray-400 group-hover:text-white transition-colors" />
               </div>
              <span className="font-medium">Settings</span>
            </div>
            <ChevronRight size={18} className="text-gray-500" />
          </button>
        </section>

        {/* Logout */}
        <button 
          onClick={onLogout}
          className="w-full py-3.5 rounded-2xl bg-neutral-800/30 text-red-500 font-bold hover:bg-red-500/10 transition-colors flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          <LogOut size={18} />
          Log Out
        </button>

        <p className="text-center text-[10px] text-gray-600 font-mono mt-2">v2.4.0 (Build 20231027)</p>
      </main>
    </div>
  );
};