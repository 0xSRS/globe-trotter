import React, { useState } from 'react';
import Logo from '../components/Logo';
import heroBg from '../assets/hero-bg.png';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  FileText, 
  Camera, 
  Sun, 
  Moon, 
  Loader2, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

const Register = ({ onRegisterSuccess, onNavigateToLogin }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    city: '',
    country: '',
    additionalInfo: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPhotoPreview(imageUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    const { firstName, lastName, email, phoneNumber, city, country } = formData;
    if (!firstName || !lastName || !email || !phoneNumber || !city || !country) {
      setErrorMessage('Please complete all required fields.');
      return;
    }

    setIsLoading(true);

    try {
      // Backend integration placeholder
      /*
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, photo: photoPreview })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      onRegisterSuccess?.(data);
      */

      await new Promise((resolve) => setTimeout(resolve, 900));
      if (onRegisterSuccess) {
        onRegisterSuccess(formData);
      }
    } catch (err) {
      setErrorMessage(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 overflow-hidden select-none font-sans transition-colors duration-500 ${
      isDarkMode ? 'bg-[#090e15] text-slate-100' : 'bg-[#fbfcfc] text-slate-900'
    }`}>
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-center bg-cover bg-no-repeat pointer-events-none transition-all duration-700"
        style={{
          backgroundImage: `url(${heroBg})`,
          opacity: isDarkMode ? 0.45 : 0.85,
        }}
      />

      {/* Contrast Overlay */}
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
      <div className={`relative w-full max-w-2xl rounded-[32px] border backdrop-blur-2xl p-6 sm:p-9 shadow-2xl transition-all duration-500 z-20 ${
        isDarkMode
          ? 'bg-[#0f1722]/80 border-slate-800 shadow-black/80'
          : 'bg-white/90 border-slate-200 shadow-slate-300/40 text-slate-900'
      }`}>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-teal-500/30 bg-teal-500/10 text-[11px] font-mono tracking-[0.25em] uppercase text-teal-400 backdrop-blur-md mb-2">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>JOIN GLOBETROTTER</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif tracking-tight font-bold drop-shadow-md">
            Create Traveler Profile
          </h1>
          <p className={`text-xs sm:text-sm mt-1 font-light tracking-wide ${
            isDarkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Register your explorer credentials to sync multi-city itineraries.
          </p>
        </div>

        {/* Photo Upload Avatar */}
        <div className="flex flex-col items-center justify-center mb-6">
          <label className="relative group cursor-pointer">
            <div className={`w-20 h-20 rounded-full border-2 border-dashed flex items-center justify-center overflow-hidden transition-all duration-300 ${
              isDarkMode 
                ? 'border-slate-600 bg-slate-900/60 hover:border-teal-400' 
                : 'border-slate-300 bg-slate-50 hover:border-teal-600'
            }`}>
              {photoPreview ? (
                <img src={photoPreview} alt="Explorer Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-400 group-hover:text-teal-400 transition-colors">
                  <Camera className="w-6 h-6" />
                  <span className="text-[9px] font-mono mt-1 tracking-wider uppercase">Photo</span>
                </div>
              )}
            </div>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handlePhotoUpload} 
              className="hidden" 
            />
          </label>
        </div>

        {/* Inner Card */}
        <div className={`rounded-2xl border p-5 sm:p-6 backdrop-blur-md transition-all duration-300 mb-6 ${
          isDarkMode 
            ? 'bg-slate-950/40 border-slate-800/60' 
            : 'bg-slate-50/80 border-slate-200/90'
        }`}>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {errorMessage && (
              <div className="p-3 text-xs rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-center">
                {errorMessage}
              </div>
            )}

            {/* Row 1: First Name & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  disabled={isLoading}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm backdrop-blur-sm outline-none transition-all duration-200 ${
                    isDarkMode 
                      ? 'border-slate-700 bg-slate-900/90 text-white placeholder-slate-500 focus:border-teal-400' 
                      : 'border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:border-teal-600'
                  }`}
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  disabled={isLoading}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm backdrop-blur-sm outline-none transition-all duration-200 ${
                    isDarkMode 
                      ? 'border-slate-700 bg-slate-900/90 text-white placeholder-slate-500 focus:border-teal-400' 
                      : 'border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:border-teal-600'
                  }`}
                />
              </div>
            </div>

            {/* Row 2: Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  disabled={isLoading}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm backdrop-blur-sm outline-none transition-all duration-200 ${
                    isDarkMode 
                      ? 'border-slate-700 bg-slate-900/90 text-white placeholder-slate-500 focus:border-teal-400' 
                      : 'border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:border-teal-600'
                  }`}
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  disabled={isLoading}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm backdrop-blur-sm outline-none transition-all duration-200 ${
                    isDarkMode 
                      ? 'border-slate-700 bg-slate-900/90 text-white placeholder-slate-500 focus:border-teal-400' 
                      : 'border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:border-teal-600'
                  }`}
                />
              </div>
            </div>

            {/* Row 3: City & Country */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  disabled={isLoading}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm backdrop-blur-sm outline-none transition-all duration-200 ${
                    isDarkMode 
                      ? 'border-slate-700 bg-slate-900/90 text-white placeholder-slate-500 focus:border-teal-400' 
                      : 'border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:border-teal-600'
                  }`}
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Globe className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Country"
                  disabled={isLoading}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm backdrop-blur-sm outline-none transition-all duration-200 ${
                    isDarkMode 
                      ? 'border-slate-700 bg-slate-900/90 text-white placeholder-slate-500 focus:border-teal-400' 
                      : 'border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:border-teal-600'
                  }`}
                />
              </div>
            </div>

            {/* Row 4: Additional Information */}
            <div className="relative">
              <div className="absolute top-3 left-3.5 pointer-events-none text-slate-400">
                <FileText className="w-4 h-4" />
              </div>
              <textarea
                name="additionalInfo"
                rows={3}
                value={formData.additionalInfo}
                onChange={handleChange}
                placeholder="Additional Information (Travel preferences, bucket list destinations, dietary notes...)"
                disabled={isLoading}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm backdrop-blur-sm outline-none transition-all duration-200 resize-none ${
                  isDarkMode 
                    ? 'border-slate-700 bg-slate-900/90 text-white placeholder-slate-500 focus:border-teal-400' 
                    : 'border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:border-teal-600'
                }`}
              />
            </div>
          </form>

        </div>

        {/* Submit Action */}
        <div className="flex flex-col items-center justify-center">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full sm:w-2/3 py-3 px-6 rounded-xl bg-teal-600 hover:bg-teal-500 active:scale-[0.98] text-white font-medium text-sm shadow-lg shadow-teal-600/25 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="tracking-wider text-xs uppercase font-mono">Registering...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span className="tracking-wide">Register Users</span>
              </>
            )}
          </button>

          {onNavigateToLogin && (
            <button
              onClick={onNavigateToLogin}
              className="mt-3 text-xs text-teal-400 hover:underline transition-colors cursor-pointer"
            >
              Already an explorer? Sign In
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default Register;