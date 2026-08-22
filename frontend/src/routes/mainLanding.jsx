import React, { useState, useEffect } from 'react';
import Logo from '../components/Logo';
import { api } from '../services/api';
import { 
  Search, Layers, Filter, ArrowUpDown, Plus, 
  MapPin, Calendar, Wallet, Sparkles, Sun, Moon, LogOut, ChevronRight, User 
} from 'lucide-react';

const MainLanding = ({ 
  user = { name: "Explorer", avatar: null }, 
  onLogout, 
  onPlanTrip, 
  onNavigateToProfile 
}) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [groupBy, setGroupBy] = useState('Continent');
  const [sortBy, setSortBy] = useState('Date');
  const [recommendations, setRecommendations] = useState([]);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setLoading(true);
        const [recData, tripData] = await Promise.allSettled([
          api.trips.getRecommendations(),
          api.trips.getAll({ groupBy, sortBy })
        ]);

        if (recData.status === 'fulfilled' && Array.isArray(recData.value)) {
          setRecommendations(recData.value);
        }
        if (tripData.status === 'fulfilled' && Array.isArray(tripData.value)) {
          setTrips(tripData.value);
        }
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, [groupBy, sortBy]);

  return (
    <div className={`min-h-screen w-full transition-colors duration-500 font-sans ${
      isDarkMode ? 'bg-[#090e15] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>
      
      {/* Header */}
      <header className={`sticky top-0 z-50 border-b backdrop-blur-xl ${
        isDarkMode ? 'bg-[#0b121c]/90 border-slate-800/80' : 'bg-white/90 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-2xl border border-slate-700/80 bg-slate-900 flex items-center justify-center">
              <Logo className="w-7 h-7 text-[#EFE5D8]" />
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-wider uppercase">GlobalTrotter</span>
              <p className="text-[9px] uppercase font-mono tracking-widest text-slate-400">Explorer Suite</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2.5 rounded-xl border cursor-pointer ${
                isDarkMode ? 'bg-slate-800/80 border-slate-700 text-amber-300' : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={onNavigateToProfile}
              className={`relative w-10 h-10 rounded-full border-2 flex items-center justify-center overflow-hidden cursor-pointer ${
                isDarkMode ? 'border-teal-500/50 bg-slate-900' : 'border-teal-600/40 bg-white'
              }`}
            >
              {user.avatar ? (
                <img src={user.avatar} alt={user.name || "User"} className="w-full h-full object-cover" />
              ) : (
                <User className={`w-5 h-5 ${isDarkMode ? 'text-teal-400' : 'text-teal-600'}`} />
              )}
            </button>

            <button 
              onClick={onLogout}
              className="p-2.5 rounded-xl border border-slate-700/60 text-slate-400 hover:text-rose-400 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        
        {/* Banner */}
        <div className="relative w-full h-72 sm:h-80 md:h-96 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
          <div 
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1800&q=80')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-wide uppercase">
              Chart Your Next Crossing
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 font-light max-w-xl mt-2">
              Plan and coordinate multi-city expeditions, track budgets, and share itineraries.
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className={`relative flex-1 flex items-center rounded-2xl border w-full ${
            isDarkMode ? 'bg-[#0f1722]/80 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <Search className="w-4 h-4 ml-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-3 bg-transparent text-xs sm:text-sm outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setGroupBy(groupBy === 'Continent' ? 'Budget' : 'Continent')}
              className="px-4 py-3 rounded-2xl border border-slate-800 bg-slate-900 text-xs flex items-center gap-2 cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-teal-400" />
              <span>Group by: {groupBy}</span>
            </button>
            <button 
              onClick={() => setSortBy(sortBy === 'Date' ? 'Cost' : 'Date')}
              className="px-4 py-3 rounded-2xl border border-slate-800 bg-slate-900 text-xs flex items-center gap-2 cursor-pointer"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-indigo-400" />
              <span>Sort by: {sortBy}</span>
            </button>
          </div>
        </div>

        {/* Regional Selections */}
        <section className="space-y-4">
          <h2 className="text-xl font-serif font-bold">Top Regional Selections</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {(recommendations.length > 0 ? recommendations : [
              { id: 1, name: "Tokyo", country: "Japan", imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" },
              { id: 2, name: "Interlaken", country: "Switzerland", imageUrl: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=400&q=80" },
              { id: 3, name: "Kyoto", country: "Japan", imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80" },
              { id: 4, name: "Tromsø", country: "Norway", imageUrl: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=400&q=80" },
              { id: 5, name: "Marrakech", country: "Morocco", imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=400&q=80" },
            ]).map((city) => (
              <div key={city.id} className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-900/60 group cursor-pointer">
                <div className="h-32 w-full relative">
                  <img src={city.imageUrl || city.image} alt={city.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-bold truncate">{city.name}</h3>
                  <p className="text-[11px] text-slate-400">{city.country}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trips / Previous Expeditions */}
        <section className="space-y-4">
          <h2 className="text-xl font-serif font-bold">Your Expeditions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(trips.length > 0 ? trips : [
              { id: 1, name: "Highland Alpine Crossing", startDate: "2026-06-12", endDate: "2026-06-22", coverPhoto: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80" }
            ]).map((t) => (
              <div key={t.id} className="rounded-3xl border border-slate-800 overflow-hidden bg-[#0f1722]/80 p-5 space-y-3">
                <h3 className="text-base font-bold">{t.name}</h3>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t.startDate} - {t.endDate}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6 flex justify-end">
            <button
              onClick={onPlanTrip}
              className="px-7 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-medium text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Plan a trip</span>
            </button>
          </div>
        </section>

      </main>
    </div>
  );
};

export default MainLanding;