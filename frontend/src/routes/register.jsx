import React, { useState } from 'react';
import Logo from '../components/Logo';
import heroBg from '../assets/hero-bg.png';
import { api } from '../services/api';
import { Eye, EyeOff, ArrowRight, Sun, Moon, Loader2 } from 'lucide-react';

const Register = ({ onRegisterSuccess, onNavigateToLogin }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    city: '',
    country: '',
    additionalInfo: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    // Front-end pre-validation check
    if (!formData.firstName.trim()) {
      setErrorMessage('First name is required.');
      return;
    }
    if (!formData.lastName.trim()) {
      setErrorMessage('Last Name is required.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@') || !formData.email.includes('.')) {
      setErrorMessage('Please enter a valid email address (e.g. alex@example.com).');
      return;
    }
    if (!formData.password || formData.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        phone: formData.phone.trim() || undefined,
        city: formData.city.trim() || undefined,
        country: formData.country.trim() || undefined,
        additionalInfo: formData.additionalInfo.trim() || undefined
      };

      const data = await api.auth.register(payload);
      
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      
      if (onRegisterSuccess) {
        onRegisterSuccess(data.user || payload);
      }
    } catch (err) {
      setErrorMessage(err.message || 'Registration failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`relative min-h-screen w-full flex items-center justify-center p-4 select-none font-sans transition-colors duration-500 ${
      isDarkMode ? 'bg-[#090e15] text-slate-100' : 'bg-[#fbfcfc] text-slate-900'
    }`}>
      {/* Background Graphic */}
      <div 
        className="absolute inset-0 bg-center bg-cover bg-no-repeat pointer-events-none transition-all duration-700"
        style={{ backgroundImage: `url(${heroBg})`, opacity: isDarkMode ? 0.35 : 0.75 }}
      />
      <div className={`absolute inset-0 pointer-events-none ${
        isDarkMode ? 'bg-gradient-to-b from-[#090e15]/85 via-[#090e15]/75 to-[#090e15]/95' : 'bg-gradient-to-b from-black/40 to-[#fbfcfc]'
      }`} />

      {/* Theme Switcher */}
      <button
        type="button"
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`absolute top-6 right-6 p-3 rounded-full border backdrop-blur-md cursor-pointer z-30 transition-all ${
          isDarkMode ? 'bg-slate-800/80 border-slate-700 text-amber-300 hover:bg-slate-700' : 'bg-white/80 border-slate-200 text-slate-700 hover:bg-slate-100'
        }`}
      >
        {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>

      {/* Form Container */}
      <div className={`relative w-full max-w-lg rounded-[32px] border backdrop-blur-2xl p-7 sm:p-9 shadow-2xl z-20 ${
        isDarkMode ? 'bg-[#0f1722]/85 border-slate-800 shadow-black/80' : 'bg-white/95 border-slate-200 shadow-slate-300/40'
      }`}>
        <div className="text-center mb-6">
          <div className="inline-block px-4 py-1 rounded-full border border-teal-500/30 bg-teal-500/10 text-[11px] font-mono tracking-[0.3em] uppercase text-teal-400 mb-3">
            GLOBETROTTER
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold">Create Explorer Account</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">Join the expedition platform to plan and share routes.</p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 text-xs rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-center font-mono">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">First Name *</label>
              <input
                type="text"
                name="firstName"
                placeholder="Alex"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900/90 text-sm outline-none focus:border-teal-400 text-white placeholder-slate-500"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">Last Name *</label>
              <input
                type="text"
                name="lastName"
                placeholder="Johnson"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900/90 text-sm outline-none focus:border-teal-400 text-white placeholder-slate-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">Email Address *</label>
              <input
                type="email"
                name="email"
                placeholder="alex@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900/90 text-sm outline-none focus:border-teal-400 text-white placeholder-slate-500"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">Phone Number (Optional)</label>
              <input
                type="tel"
                name="phone"
                placeholder="9999999999"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900/90 text-sm outline-none focus:border-teal-400 text-white placeholder-slate-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">Password * (Min 6 chars)</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="At least 6 characters"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-slate-700 bg-slate-900/90 text-sm outline-none focus:border-teal-400 text-white placeholder-slate-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-teal-400 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">City (Optional)</label>
              <input
                type="text"
                name="city"
                placeholder="Zurich"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900/90 text-sm outline-none focus:border-teal-400 text-white placeholder-slate-500"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">Country (Optional)</label>
              <input
                type="text"
                name="country"
                placeholder="Switzerland"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900/90 text-sm outline-none focus:border-teal-400 text-white placeholder-slate-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">Additional Information / Bio (Optional)</label>
            <textarea
              name="additionalInfo"
              placeholder="Alpine trekking, city explorer..."
              rows={2}
              value={formData.additionalInfo}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900/90 text-sm outline-none resize-none focus:border-teal-400 text-white placeholder-slate-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 active:scale-[0.98] text-white font-medium text-sm shadow-lg shadow-teal-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>Register Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-5 text-center">
          <button 
            type="button"
            onClick={onNavigateToLogin} 
            className="text-xs text-teal-400 hover:underline cursor-pointer"
          >
            Already have an account? Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;