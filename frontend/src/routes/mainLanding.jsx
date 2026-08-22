import React, { useState } from 'react';
import Logo from '../components/Logo';
import { 
  Search, 
  Layers, 
  Filter, 
  ArrowUpDown, 
  Plus, 
  MapPin, 
  Calendar, 
  Wallet, 
  Sparkles,
  Sun, 
  Moon, 
  LogOut,
  ChevronRight,
  User
} from 'lucide-react';

const MainLanding = ({ 
  user = { name: "User", avatar: null }, 
  onLogout, 
  onPlanTrip, 
  onNavigateToProfile 
}) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [groupBy, setGroupBy] = useState('Continent');
  const [sortBy, setSortBy] = useState('Date');

  // 1. Top Regional Selections (5 items as in the wireframe)
  const regionalSelections = [
    {
      id: 'r1',
      title: 'Swiss Alps',
      subtitle: 'Mountain Trails',
      count: '14 Routes',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'r2',
      title: 'Amalfi Coast',
      subtitle: 'Mediterranean',
      count: '9 Routes',
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'r3',
      title: 'Kyoto Trails',
      subtitle: 'East Asia',
      count: '12 Routes',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'r4',
      title: 'Nordic Fjords',
      subtitle: 'Scandinavia',
      count: '8 Routes',
      image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'r5',
      title: 'Sahara Dunes',
      subtitle: 'North Africa',
      count: '6 Routes',
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=400&q=80'
    }
  ];

  // 2. Previous Trips (3 tall vertical cards as in the wireframe)
  const previousTrips = [
    {
      id: 'p1',
      title: 'Highland Alpine Crossing',
      dates: 'Jun 12 - Jun 22, 2026',
      stops: 5,
      budget: '$2,850',
      status: 'Completed',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'p2',
      title: 'Adriatic Coastal Cruise & Road',
      dates: 'Apr 04 - Apr 15, 2026',
      stops: 4,
      budget: '$1,920',
      status: 'Completed',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'p3',
      title: 'Aurora & Fjord Winter Circuit',
      dates: 'Jan 10 - Jan 18, 2026',
      stops: 3,
      budget: '$2,150',
      status: 'Completed',
      image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <div className={`min-h-screen w-full transition-colors duration-500 font-sans ${
      isDarkMode ? 'bg-[#090e15] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>
      
      {/* 1. TOP HEADER (Screen 3 Top Nav) */}
      <header className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-colors ${
        isDarkMode ? 'bg-[#0b121c]/90 border-slate-800/80' : 'bg-white/90 border-slate-200 shadow-xs'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-2xl border border-slate-700/80 bg-slate-900 flex items-center justify-center">
              <Logo className="w-7 h-7 text-[#EFE5D8]" />
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-wider uppercase">GlobalTrotter</span>
              <p className="text-[9px] uppercase font-mono tracking-widest text-slate-400">Lets Flip The Globe</p>
            </div>
          </div>

          {/* Right Controls: Theme Toggle, User Profile Avatar Button, and Logout */}
          <div className="flex items-center gap-3">
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

            {/* Circular User Profile Button */}
<button
  onClick={onNavigateToProfile}
  className={`relative w-10 h-10 rounded-full border-2 transition-all duration-200 flex items-center justify-center overflow-hidden cursor-pointer hover:scale-105 active:scale-95 shadow-md ${
    isDarkMode 
      ? 'border-teal-500/50 bg-slate-900 hover:border-teal-400' 
      : 'border-teal-600/40 bg-white hover:border-teal-600'
  }`}
  title="Open User Profile"
>
  {user.avatar ? (
    <img 
      src={user.avatar} 
      alt={user.name || "User"} 
      className="w-full h-full object-cover" 
    />
  ) : (
    <User className={`w-5 h-5 ${isDarkMode ? 'text-teal-400' : 'text-teal-600'}`} />
  )}
  {/* Online status badge */}
  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-slate-900" />
</button>

            {/* Logout Quick Button */}
            <button 
              onClick={onLogout}
              title="Sign out"
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                isDarkMode 
                  ? 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/30' 
                  : 'bg-white border-slate-200 text-slate-400 hover:text-rose-500 hover:bg-rose-50'
              }`}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* MAIN BODY */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">

        {/* BANNER IMAGE CARD (Screen 3 Top Box) */}
        <div className={`relative w-full h-72 sm:h-80 md:h-96 rounded-3xl border overflow-hidden shadow-2xl transition-all ${
          isDarkMode ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <div 
            className="absolute inset-0 bg-center bg-cover bg-no-repeat transition-transform duration-1000 scale-105"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1800&q=80')`,
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-[10px] font-mono tracking-widest text-teal-300 uppercase w-fit mb-3">
              <Sparkles className="w-3 h-3" />
              <span>ACTIVE EXPEDITION PORTAL</span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-wide uppercase">
              Chart Your Next Crossing
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 font-light max-w-xl mt-2 leading-relaxed">
              Curate multi-city itineraries, synchronize team transit schedules, and discover regional routes.
            </p>
          </div>
        </div>

        {/* CONTROLS BAR: Search, Group by, Filter, Sort by */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          <div className={`relative flex-1 flex items-center rounded-2xl border transition-colors ${
            isDarkMode 
              ? 'bg-[#0f1722]/80 border-slate-800 focus-within:border-teal-400' 
              : 'bg-white border-slate-200 focus-within:border-teal-600 shadow-xs'
          }`}>
            <Search className="w-4 h-4 ml-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search destinations, stops, saved routes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-3 bg-transparent text-xs sm:text-sm outline-none placeholder-slate-400"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <button 
              onClick={() => setGroupBy(groupBy === 'Continent' ? 'Budget' : 'Continent')}
              className={`inline-flex items-center gap-2 px-4 py-3 rounded-2xl border text-xs font-medium backdrop-blur-md transition-all cursor-pointer shrink-0 ${
                isDarkMode 
                  ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-200' 
                  : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700 shadow-xs'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-teal-400" />
              <span>Group by: {groupBy}</span>
            </button>

            <button 
              className={`inline-flex items-center gap-2 px-4 py-3 rounded-2xl border text-xs font-medium backdrop-blur-md transition-all cursor-pointer shrink-0 ${
                isDarkMode 
                  ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-200' 
                  : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700 shadow-xs'
              }`}
            >
              <Filter className="w-3.5 h-3.5 text-amber-400" />
              <span>Filter</span>
            </button>

            <button 
              onClick={() => setSortBy(sortBy === 'Date' ? 'Cost' : 'Date')}
              className={`inline-flex items-center gap-2 px-4 py-3 rounded-2xl border text-xs font-medium backdrop-blur-md transition-all cursor-pointer shrink-0 ${
                isDarkMode 
                  ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-200' 
                  : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700 shadow-xs'
              }`}
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-indigo-400" />
              <span>Sort by: {sortBy}</span>
            </button>
          </div>

        </div>

        {/* TOP REGIONAL SELECTIONS (5 Cards) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight">
              Top Regional Selections
            </h2>
            <button className="text-xs text-teal-400 hover:underline cursor-pointer font-medium flex items-center gap-1">
              <span>Explore All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {regionalSelections.map((region) => (
              <div
                key={region.id}
                className={`group relative rounded-2xl border overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-xl cursor-pointer ${
                  isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                <div className="h-32 w-full relative overflow-hidden">
                  <img
                    src={region.image}
                    alt={region.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                    {region.count}
                  </span>
                </div>

                <div className="p-3">
                  <h3 className="text-sm font-bold truncate group-hover:text-teal-400 transition-colors">
                    {region.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">
                    {region.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PREVIOUS TRIPS & BOTTOM ACTION (3 Cards + "+ Plan a trip") */}
        <div className="space-y-4 pt-4 relative">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight">
              Previous Trips
            </h2>
            <button className="text-xs text-teal-400 hover:underline cursor-pointer font-medium flex items-center gap-1">
              <span>Full History</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {previousTrips.map((trip) => (
              <div
                key={trip.id}
                className={`rounded-3xl border overflow-hidden transition-all duration-300 hover:shadow-2xl group ${
                  isDarkMode 
                    ? 'bg-[#0f1722]/80 border-slate-800 hover:border-slate-700' 
                    : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="h-44 relative overflow-hidden">
                  <img
                    src={trip.image}
                    alt={trip.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full text-[10px] font-medium bg-black/70 backdrop-blur-md text-emerald-400 border border-emerald-400/30">
                    {trip.status}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="text-base font-bold group-hover:text-teal-400 transition-colors leading-snug">
                    {trip.title}
                  </h3>

                  <div className="space-y-1.5 text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      <span>{trip.dates}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-teal-400" />
                      <span>{trip.stops} Destinations Connected</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wallet className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{trip.budget} Total Spend</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between">
                    <button className="text-xs text-teal-400 hover:text-teal-300 font-medium cursor-pointer">
                      View Full Route Log
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Action: "+ Plan a trip" */}
          <div className="pt-6 flex justify-end">
            <button
              onClick={onPlanTrip}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-500 active:scale-95 text-white font-medium text-sm shadow-xl shadow-teal-600/30 transition-all cursor-pointer hover:shadow-teal-600/40"
            >
              <Plus className="w-4 h-4" />
              <span className="font-serif tracking-wider uppercase text-xs">Plan a trip</span>
            </button>
          </div>

        </div>

      </main>

    </div>
  );
};

export default MainLanding;