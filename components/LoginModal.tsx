import React, { useState, useEffect } from 'react';
import { X, Mail, User, Lock, Eye, EyeOff, ArrowRight, CheckCircle2 } from 'lucide-react';

interface LoginModalProps {
  visible: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ visible, onClose, onLoginSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  
  // Mock Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Reset state when modal opens
  useEffect(() => {
    if (visible) {
      setMode('login');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setShowPassword(false);
    }
  }, [visible]);

  if (!visible) return null;

  // Password Strength Logic
  const getPasswordStrength = (pass: string) => {
    if (pass.length === 0) return -1;
    if (pass.length < 6) return 0; // Weak
    // Check for number or special char
    const hasSpecial = /[0-9!@#$%^&*(),.?":{}|<>]/.test(pass);
    if (pass.length >= 8 && hasSpecial) return 2; // Strong
    return 1; // Medium
  };

  const strengthScore = getPasswordStrength(password);

  const handleRegister = () => {
    // Basic mock validation
    if (!name || !email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    // Success Action
    alert(`Account Created\n\nWelcome ${name}! Your account has been successfully registered.`);
    onLoginSuccess();
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    // Reset form state on switch
    setShowPassword(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Card */}
      <div className="relative w-full max-w-[375px] bg-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 border border-neutral-700 max-h-[90vh]">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-white hover:bg-neutral-700 rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className="flex flex-col px-8 pb-10 pt-10 overflow-y-auto no-scrollbar">
          
          {/* Header Section */}
          <div className="mb-6 text-center">
            <h1 className="text-white text-[24px] font-bold leading-tight tracking-tight">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-gray-400 text-sm mt-2">
              {mode === 'login' ? 'Sign in to continue to AI-SHOP' : 'Join us to get exclusive offers'}
            </p>
          </div>

          {/* MODE: LOGIN */}
          {mode === 'login' && (
            <div className="flex flex-col gap-3 animate-in slide-in-from-left-4 fade-in duration-300">
              {/* Google Button */}
              <button 
                onClick={onLoginSuccess}
                className="group flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-white px-4 text-[15px] font-bold text-[#1f2937] transition-all hover:bg-gray-100 active:scale-[0.98]"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* LINE Button */}
              <button 
                onClick={onLoginSuccess}
                className="group flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-[#06C755] px-4 text-[15px] font-bold text-white transition-all hover:bg-[#05b34c] active:scale-[0.98]"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.36 10.56a5.6 5.6 0 0 1-5.6 5.6c-.63 0-1.24-.11-1.81-.31-.57-.2-1.36-.08-2.03.26l-1.94 1a.57.57 0 0 1-.78-.66l.5-2.1c.14-.59-.05-1.19-.34-1.72A5.6 5.6 0 0 1 13.76 4.96c3.09 0 5.6 2.51 5.6 5.6z" fill="none" stroke="currentColor" strokeWidth="2"></path>
                  <path d="M21.5 10.5c0-4.14-3.8-7.5-8.5-7.5S4.5 6.36 4.5 10.5c0 3.68 2.94 6.74 6.94 7.33l-1.24 3.09c-.16.4.37.76.71.48l4.36-3.63c3.55-.89 6.23-3.82 6.23-7.27z" fill="white"></path>
                  <path d="M21.5 10.5c0-4.14-3.8-7.5-8.5-7.5S4.5 6.36 4.5 10.5c0 3.68 2.94 6.74 6.94 7.33l-1.24 3.09c-.16.4.37.76.71.48l4.36-3.63c3.55-.89 6.23-3.82 6.23-7.27z" fill="#06C755"></path>
                  <path d="M13 10.5c3.04 0 5.5-2.01 5.5-4.5S16.04 1.5 13 1.5s-5.5 2.01-5.5 4.5 2.46 4.5 5.5 4.5z" fill="none"></path>
                  <path d="M8.38 8.63h1.37v2.75h-1.37V8.63zm2.5 0h1.37v1.37h.69v-1.37h1.37v2.75h-1.37v-1.38h-.69v1.38h-1.37V8.63zm4.5 0h1.37v2.75h-1.37V8.63zm2.5 0h1.37v.69h-1.37v-.69zm0 1.03h1.37v.69h-1.37v-.69zm0 1.03h1.37v.69h-1.37v-.69z" fill="white"></path>
                  <path d="M12 2C6.48 2 2 5.92 2 10.75c0 2.67 1.36 5.06 3.55 6.64-.16.58-.6 2.1-1.32 2.87-.2.22-.05.58.26.58.94 0 2.59-.2 3.65-.95 1.15.32 2.37.49 3.62.49 5.52 0 10-3.92 10-8.75S17.52 2 12 2zm0 15c-4.41 0-8-3.13-8-7s3.59-7 8-7 8 3.13 8 7-3.59 7-8 7z" fill="currentColor"></path>
                </svg>
                <span>Continue with LINE</span>
              </button>

              {/* Facebook Button */}
              <button 
                onClick={onLoginSuccess}
                className="group flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-[#1877F2] px-4 text-[15px] font-bold text-white transition-all hover:bg-[#155ebb] active:scale-[0.98]"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                </svg>
                <span>Continue with Facebook</span>
              </button>

              {/* Divider */}
              <div className="relative flex py-4 items-center">
                <div className="flex-grow border-t border-gray-700"></div>
                <span className="flex-shrink-0 mx-4 text-gray-500 text-xs font-medium uppercase tracking-wide">or</span>
                <div className="flex-grow border-t border-gray-700"></div>
              </div>

              {/* Email Login */}
              <button 
                onClick={onLoginSuccess}
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-transparent border border-gray-600 px-4 text-[15px] font-bold text-white transition-all hover:bg-neutral-700 active:scale-[0.98]"
              >
                <Mail size={20} />
                <span>Log In with Email</span>
              </button>
            </div>
          )}

          {/* MODE: REGISTER */}
          {mode === 'register' && (
            <div className="flex flex-col gap-4 animate-in slide-in-from-right-4 fade-in duration-300">
               {/* Name Input */}
               <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 ml-1">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <User size={18} />
                    </div>
                    <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-neutral-700/50 border border-neutral-600 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="John Doe"
                    />
                  </div>
               </div>

               {/* Email Input */}
               <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 ml-1">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Mail size={18} />
                    </div>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-neutral-700/50 border border-neutral-600 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="john@example.com"
                    />
                  </div>
               </div>

               {/* Password Input */}
               <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 ml-1">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Lock size={18} />
                    </div>
                    <input 
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-neutral-700/50 border border-neutral-600 rounded-xl py-3 pl-10 pr-10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="Create a password"
                    />
                    <button 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  
                  {/* Real Strength Indicator */}
                   {password.length > 0 && (
                    <div className="mt-2.5">
                        <div className="flex gap-1.5 h-1.5 px-0.5 mb-1.5">
                            {/* Bar 1: Always colored */}
                            <div className={`flex-1 rounded-full transition-colors duration-300 ${
                                strengthScore >= 0 
                                    ? (strengthScore === 0 ? 'bg-red-500' : strengthScore === 1 ? 'bg-orange-500' : 'bg-green-500')
                                    : 'bg-neutral-700'
                            }`}></div>
                            
                            {/* Bar 2: Colored if >= Medium */}
                            <div className={`flex-1 rounded-full transition-colors duration-300 ${
                                strengthScore >= 1
                                    ? (strengthScore === 1 ? 'bg-orange-500' : 'bg-green-500')
                                    : 'bg-neutral-700'
                            }`}></div>
                            
                            {/* Bar 3: Colored if >= Strong */}
                            <div className={`flex-1 rounded-full transition-colors duration-300 ${
                                strengthScore >= 2
                                    ? 'bg-green-500'
                                    : 'bg-neutral-700'
                            }`}></div>
                        </div>
                        <p className={`text-[11px] font-bold text-right transition-colors ${
                            strengthScore === 0 ? 'text-red-500' : strengthScore === 1 ? 'text-orange-500' : 'text-green-500'
                        }`}>
                            {strengthScore === 0 ? 'Weak' : strengthScore === 1 ? 'Medium' : 'Strong'}
                        </p>
                    </div>
                   )}
               </div>

               {/* Confirm Password */}
               <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 ml-1">Confirm Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <CheckCircle2 size={18} />
                    </div>
                    <input 
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-neutral-700/50 border border-neutral-600 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="Repeat password"
                    />
                  </div>
               </div>

               {/* Create Account Button */}
               <button 
                onClick={handleRegister}
                className="mt-2 w-full bg-primary hover:bg-blue-600 active:bg-blue-700 text-white font-bold h-12 rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
              >
                <span>Create Account</span>
                <ArrowRight size={18} />
              </button>
            </div>
          )}

          {/* Footer Link - Added spacing with mt-8 */}
          <div className="mt-8 text-center pt-6 border-t border-gray-700 mb-2">
            <p className="text-[14px] text-gray-400 font-medium">
                {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
                <button 
                    onClick={toggleMode}
                    className="text-primary font-bold hover:underline ml-1.5 transition-colors focus:outline-none"
                >
                    {mode === 'login' ? 'Register' : 'Log In'}
                </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};