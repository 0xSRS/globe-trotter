import React, { useState } from 'react';
import Logo from '../components/Logo';
import heroBg from '../assets/hero-bg.png';
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sun, 
  Moon, 
  Loader2,
  Mountain
} from 'lucide-react';

const Login = ({ onLoginSuccess, onNavigateToRegister }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!username.trim() || !password.trim()) {
      setErrorMessage('Please provide both username and password.');
      return;
    }

    setIsLoading(true);

    try {
      // Replace with actual backend fetch when ready
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (onLoginSuccess) {
        onLoginSuccess('mock-token-123', { username });
      }
    } catch (err) {
      setErrorMessage(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden select-none font-sans transition-colors duration-500 ${
      isDarkMode ? 'bg-[#090e15] text-slate-100' : 'bg-[#fbfcfc] text-slate-900'
    }`}>
      
      {/* Backdrop Image */}
      <div 
        className="absolute inset-0 bg-center bg-cover bg-no-repeat pointer-events-none transition-all duration-700"
        style={{
          backgroundImage: `url(${heroBg})`,
          opacity: isDarkMode ? 0.45 : 0.85,
        }}
      />

      {/* Contrast Gradient Overlay */}
      <div className={`absolute inset-0 pointer-events-none transition-colors duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-b from-[#090e15]/85 via-[#090e15]/70 to-[#090e15]/95' 
          : 'bg-gradient-to-b from-black/50 via-slate-900/30 to-[#fbfcfc]'
      }`} />

      {/* Theme Toggle Button */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`absolute top-6 right-6 p-3 rounded-full border backdrop-blur-md transition-all duration-300 shadow-lg cursor-pointer z-30 ${
          isDarkMode 
            ? 'bg-slate-800/80 border-slate-700 text-amber-300 hover:bg-slate-700' 
            : 'bg-white/80 border-slate-200 text-slate-700 hover:bg-slate-100'
        }`}
        aria-label="Toggle Theme"
      >
        {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>

      {/* Outer Card Frame */}
      <div className={`relative w-full max-w-md rounded-[32px] border backdrop-blur-2xl p-7 sm:p-9 shadow-2xl transition-all duration-500 z-20 ${
        isDarkMode
          ? 'bg-[#0f1722]/80 border-slate-800 shadow-black/80'
          : 'bg-white/90 border-slate-200 shadow-slate-300/40 text-slate-900'
      }`}>
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-block px-4 py-1 rounded-full border border-teal-500/30 bg-teal-500/10 text-[11px] font-mono tracking-[0.3em] uppercase text-teal-400 backdrop-blur-md mb-3">
            GLOBETROTTER
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-serif tracking-tight font-bold drop-shadow-md">
            Begin Your Expedition
          </h1>
          <p className={`text-xs sm:text-sm mt-1 font-light tracking-wide ${
            isDarkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Sign in to access your routes, budgets, and saved itineraries.
          </p>
        </div>

        {/* Inner Card */}
        <div className={`rounded-2xl border p-6 backdrop-blur-md transition-all duration-300 ${
          isDarkMode 
            ? 'bg-slate-950/40 border-slate-800/60' 
            : 'bg-slate-50/80 border-slate-200/90'
        }`}>

          {/* Logo */}
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="p-2 rounded-2xl border border-slate-700 bg-slate-900 shadow-lg">
              <Logo className="w-10 h-10 text-[#EFE5D8]" />
            </div>
            <span className={`mt-2.5 text-[10px] font-mono tracking-[0.25em] uppercase ${
              isDarkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>
              EXPLORER ACCESS
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <div className="p-3 text-xs rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-center">
                {errorMessage}
              </div>
            )}

            {/* Username Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username or Traveler ID"
                disabled={isLoading}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm backdrop-blur-sm outline-none transition-all duration-200 disabled:opacity-50 ${
                  isDarkMode 
                    ? 'border-slate-700 bg-slate-900/90 text-white placeholder-slate-500 focus:border-teal-400' 
                    : 'border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:border-teal-600'
                }`}
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                disabled={isLoading}
                className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-sm backdrop-blur-sm outline-none transition-all duration-200 disabled:opacity-50 ${
                  isDarkMode 
                    ? 'border-slate-700 bg-slate-900/90 text-white placeholder-slate-500 focus:border-teal-400' 
                    : 'border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:border-teal-600'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-teal-400 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 active:scale-[0.98] text-white font-medium text-sm shadow-lg shadow-teal-600/25 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="tracking-wider text-xs uppercase font-mono">Signing in...</span>
                </>
              ) : (
                <>
                  <span className="tracking-wide">Explore Destinations</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Link to Register */}
        <div className="mt-5 text-center flex flex-col items-center gap-2">
          {onNavigateToRegister && (
            <button
              onClick={onNavigateToRegister}
              className="text-xs text-teal-400 hover:underline cursor-pointer"
            >
              Don't have an account? Register as Explorer
            </button>
          )}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-light mt-1">
            <Mountain className="w-3.5 h-3.5 opacity-70" />
            <span>Intelligent multi-stop journey planning</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;