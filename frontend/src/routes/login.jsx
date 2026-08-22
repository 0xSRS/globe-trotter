import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sun, 
  Moon, 
  Compass, 
  Loader2,
  Mountain
} from 'lucide-react';

const Login = ({ onLoginSuccess }) => {
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
      setErrorMessage('Please fill in your credentials.');
      return;
    }

    setIsLoading(true);

    try {
      // Mock API trigger
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (onLoginSuccess) {
        onLoginSuccess('mock-auth-token', { username });
      }
    } catch (err) {
      setErrorMessage(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden select-none font-sans">
      {/* Editorial Scenic Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 transform scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80')`,
        }}
      />

      {/* Atmospheric Vignette & Mood Overlay */}
      <div className={`absolute inset-0 transition-colors duration-700 ${
        isDarkMode 
          ? 'bg-gradient-to-b from-black/60 via-[#0a1215]/75 to-[#060c0e]/95' 
          : 'bg-gradient-to-b from-sky-950/30 via-slate-900/40 to-slate-900/80'
      }`} />

      {/* Subtle Mist Radial Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)]" />

      {/* Theme Toggle Button */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="absolute top-6 right-6 p-3 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300 shadow-lg cursor-pointer z-30"
        aria-label="Toggle Theme"
      >
        {isDarkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-sky-200" />}
      </button>

      {/* Outer Card (Wireframe Outer Box) */}
      <div className={`relative w-full max-w-md rounded-[32px] border backdrop-blur-2xl p-7 sm:p-9 shadow-2xl transition-all duration-500 z-20 ${
        isDarkMode
          ? 'bg-[#0f171c]/75 border-white/15 shadow-black/80'
          : 'bg-white/15 border-white/30 shadow-2xl text-white'
      }`}>
        
        {/* Editorial Top Capsule */}
        <div className="text-center mb-6">
          <div className="inline-block px-4 py-1 rounded-full border border-white/25 text-[11px] font-mono tracking-[0.3em] uppercase text-white/80 backdrop-blur-md mb-3">
            G L O B E T R O T T E R
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-serif tracking-tight text-white drop-shadow-md">
            Begin Your Expedition
          </h1>
          <p className="text-xs sm:text-sm mt-1 text-slate-300 font-light tracking-wide">
            Sign in to manage itineraries, budgets, and destinations.
          </p>
        </div>

        {/* Inner Card (Wireframe Inner Box) */}
        <div className={`rounded-2xl border p-6 backdrop-blur-md transition-all duration-300 ${
          isDarkMode 
            ? 'bg-black/35 border-white/10' 
            : 'bg-black/25 border-white/20'
        }`}>

          {/* Minimalist Compass Crest */}
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="relative group cursor-default">
              <div className="w-20 h-20 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-105">
                <Compass className="w-9 h-9 text-slate-200 animate-[spin_20s_linear_infinite]" />
              </div>
            </div>
            <span className="mt-2.5 text-[10px] font-mono tracking-[0.25em] uppercase text-slate-300">
              EXPLORER ID
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 text-xs rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-center backdrop-blur-sm">
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
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/15 bg-white/10 text-white placeholder-slate-400 text-sm backdrop-blur-sm outline-none focus:border-white/40 focus:ring-1 focus:ring-white/30 transition-all duration-200 disabled:opacity-50"
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
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-white/15 bg-white/10 text-white placeholder-slate-400 text-sm backdrop-blur-sm outline-none focus:border-white/40 focus:ring-1 focus:ring-white/30 transition-all duration-200 disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-4 rounded-xl border border-white/30 bg-white/20 hover:bg-white/30 active:scale-[0.98] text-white font-medium text-sm backdrop-blur-md shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="tracking-wider text-xs uppercase font-mono">Verifying...</span>
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

        {/* Minimalist Footnote */}
        <div className="mt-5 text-center flex items-center justify-center gap-2 text-[11px] text-slate-400 font-light">
          <Mountain className="w-3.5 h-3.5 opacity-70" />
          <span>Intelligent multi-stop journey planning</span>
        </div>

      </div>
    </div>
  );
};

export default Login;