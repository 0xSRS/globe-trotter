import React, { useState } from 'react';
import Logo from '../components/Logo';
import heroBg from '../assets/hero-bg.png';
import { 
  MapPin, 
  Calendar, 
  Wallet, 
  Share2, 
  ArrowRight, 
  Sun, 
  Moon, 
  LogIn, 
  UserPlus, 
  Mail, 
  Phone, 
  Globe, 
  Sparkles, 
  Route, 
  Compass, 
  Heart 
} from 'lucide-react';

const Dashboard = ({ 
  onNavigateToLogin, 
  onNavigateToRegister, 
  onNavigateToPlanner 
}) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Smooth scroll handler for same-page section navigation
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [trips] = useState([
    {
      id: 1,
      title: "Alpine Explorer: Swiss & Italian Lakes",
      stops: 4,
      duration: "10 Days",
      budget: "$2,450",
      status: "Planned",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Nordic Fjord & Aurora Route",
      stops: 3,
      duration: "7 Days",
      budget: "$1,890",
      status: "Designing",
      image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80"
    }
  ]);

  return (
    <div className={`min-h-screen w-full transition-colors duration-500 font-sans selection:bg-teal-500 selection:text-white ${
      isDarkMode ? 'bg-[#090e15] text-slate-100' : 'bg-[#fbfcfc] text-slate-900'
    }`}>
      
      {/* 1. TOP NAVIGATION BAR */}
      <div className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-300 ${
        isDarkMode ? 'bg-[#0b121c]/90 border-slate-800' : 'bg-white/90 border-slate-200 shadow-xs'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand / Logo */}
          <div className="flex items-center gap-3.5 cursor-pointer group">
            <div className={`p-1.5 rounded-2xl border transition-all duration-300 flex items-center justify-center ${
              isDarkMode 
                ? 'bg-slate-900 border-slate-700/80 group-hover:border-[#EFE5D8]/40' 
                : 'bg-slate-900 border-slate-800'
            }`}>
              <Logo className="w-8 h-8 text-[#EFE5D8] transition-transform duration-500 group-hover:rotate-12" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-bold tracking-wider uppercase">GLOBETROTTER</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full border border-teal-500/30 text-teal-400 bg-teal-500/10 font-mono">v1.0</span>
              </div>
              <p className="text-[10px] uppercase font-mono tracking-widest text-slate-400">
                Lets Flip The Globe
              </p>
            </div>
          </div>

          {/* Center Smooth Scroll Links */}
          <div className="hidden md:flex items-center gap-8 text-xs sm:text-sm font-medium">
            <button
              onClick={() => scrollToSection('about-us')}
              className="text-slate-400 hover:text-teal-400 transition-colors cursor-pointer"
            >
              About Us
            </button>
            <button
              onClick={() => scrollToSection('active-expeditions')}
              className="text-slate-400 hover:text-teal-400 transition-colors cursor-pointer"
            >
              Expeditions
            </button>
            <button
              onClick={() => scrollToSection('contact-footer')}
              className="text-slate-400 hover:text-teal-400 transition-colors cursor-pointer"
            >
              Contact
            </button>
          </div>

          {/* Right Action Controls: Theme + Auth Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                isDarkMode 
                  ? 'bg-slate-800/80 border-slate-700 text-amber-300 hover:bg-slate-700' 
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 shadow-xs'
              }`}
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Login CTA */}
            <button
              onClick={onNavigateToLogin}
              className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                isDarkMode
                  ? 'border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 hover:text-white'
                  : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 shadow-xs'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Login</span>
            </button>

            {/* Register CTA */}
            <button
              onClick={onNavigateToRegister}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 active:scale-95 text-white font-medium text-xs sm:text-sm shadow-md shadow-teal-600/20 transition-all cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Register</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. HERO SECTION */}
      <div className="relative w-full min-h-[90vh] flex flex-col justify-center items-center text-center px-4 pt-20 pb-24 overflow-hidden">
        
        {/* Backdrop Image */}
        <div 
          className="absolute inset-0 bg-center bg-cover bg-no-repeat pointer-events-none transition-all duration-700"
          style={{
            backgroundImage: `url(${heroBg})`,
            opacity: isDarkMode ? 0.85 : 0.95,
          }}
        />

        {/* Ambient Gradient Overlay */}
        <div className={`absolute inset-0 pointer-events-none transition-colors duration-500 ${
          isDarkMode 
            ? 'bg-gradient-to-b from-[#090e15]/70 via-black/30 to-[#090e15]' 
            : 'bg-gradient-to-b from-black/40 via-transparent to-[#fbfcfc]'
        }`} />

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center px-4">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif tracking-wide uppercase leading-tight font-bold text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            Explore The World With <br />
            <span className="text-teal-300">Globetrotter</span>
          </h1>

          <p className="mt-5 text-sm sm:text-lg max-w-2xl font-light leading-relaxed text-slate-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Your gateway to international and domestic holiday packages awaits fellow globe trotters. 
            Discover travel opportunities as we explore the meaning of globe trotting together.
          </p>

          {/* Action CTA */}
          <div className="mt-8">
            <button 
              onClick={onNavigateToPlanner}
              className="px-8 py-3.5 rounded-xl border border-white/40 bg-slate-900/80 hover:bg-teal-600 hover:border-teal-500 text-white font-serif uppercase tracking-[0.2em] text-xs sm:text-sm font-semibold shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-3"
            >
              <span>Book Your Trip Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. ABOUT US SECTION */}
      <div id="about-us" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24">
        <div className={`p-8 sm:p-12 rounded-3xl border transition-all ${
          isDarkMode ? 'bg-[#0f1722]/70 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-500/30 text-teal-400 bg-teal-500/10 text-xs font-mono mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE GLOBETROTTER PHILOSOPHY</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight mb-4">
              Reinventing Multi-City Travel Planning
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-light">
              Globetrotter is an intelligent, collaborative platform designed to remove the friction from exploring multi-stop routes. 
              From automatic budget estimation to dynamic timeline generation and seamless itinerary sharing, we empower travelers to dream, 
              design, and coordinate journeys effortlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400">
                <Route className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Multi-City Routing</h4>
                <p className="text-xs text-slate-400 mt-1">Organize sequential destinations with realistic transit durations.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Automated Budgets</h4>
                <p className="text-xs text-slate-400 mt-1">Real-time dynamic cost approximations per city and activity.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Shared Collaboration</h4>
                <p className="text-xs text-slate-400 mt-1">Invite fellow travelers to co-create and edit trip timelines live.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. ACTIVE EXPEDITIONS */}
      <div id="active-expeditions" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-24">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold font-serif tracking-tight">Active Expeditions</h2>
            <p className="text-sm text-slate-400 mt-0.5">Manage and tweak your personalized multi-city itineraries</p>
          </div>
          <button className="text-sm text-teal-500 hover:underline cursor-pointer font-medium">
            View All Itineraries
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {trips.map((trip) => (
            <div 
              key={trip.id} 
              className={`rounded-3xl border overflow-hidden transition-all duration-300 hover:shadow-2xl group ${
                isDarkMode ? 'bg-[#0f1722]/80 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200'
              }`}
            >
              <div className="h-56 relative overflow-hidden">
                <img 
                  src={trip.image} 
                  alt={trip.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium bg-black/70 backdrop-blur-md text-white border border-white/20">
                  {trip.status}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold group-hover:text-teal-400 transition-colors">
                  {trip.title}
                </h3>
                
                <div className="flex items-center gap-4 mt-4 text-xs sm:text-sm text-slate-400 font-medium">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-teal-400" />
                    {trip.stops} Stops
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    {trip.duration}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Wallet className="w-4 h-4 text-emerald-400" />
                    {trip.budget}
                  </span>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/50 flex items-center justify-between">
                  <button className="text-sm text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer">
                    <span>Edit Stops</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. FOOTER & CONTACT SECTION */}
      <div id="contact-footer" className={`border-t mt-20 transition-colors duration-300 ${
        isDarkMode ? 'bg-[#060a0f] border-slate-800/80 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            
            {/* Column 1: Brand Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Logo className="w-8 h-8 text-[#EFE5D8]" />
                <span className="font-serif text-lg font-bold tracking-wider uppercase text-slate-100">GLOBETROTTER</span>
              </div>
              <p className="text-xs leading-relaxed max-w-sm">
                Empowering explorers to dream, design, and organize multi-city expeditions with ease and precision.
              </p>
              <div className="flex items-center gap-2 text-xs text-teal-400">
                <Compass className="w-4 h-4" />
                <span>Lets Flip The Globe Together</span>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-200 mb-4 font-mono">
                Explore
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <button onClick={() => scrollToSection('about-us')} className="hover:text-teal-400 transition-colors cursor-pointer">
                    About Us
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('active-expeditions')} className="hover:text-teal-400 transition-colors cursor-pointer">
                    Active Itineraries
                  </button>
                </li>
                <li>
                  <button onClick={onNavigateToPlanner} className="hover:text-teal-400 transition-colors cursor-pointer">
                    Trip Planner Studio
                  </button>
                </li>
                <li>
                  <button onClick={onNavigateToRegister} className="hover:text-teal-400 transition-colors cursor-pointer">
                    Join as Explorer
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact Details */}
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-200 mb-4 font-mono">
                Contact & Support
              </h4>
              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>support@globetrotter.travel</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>+1 (800) 456-GLOBE</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Global Expeditions HQ</span>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-12 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© 2026 Globetrotter Platform. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Built for the Hackathon with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;