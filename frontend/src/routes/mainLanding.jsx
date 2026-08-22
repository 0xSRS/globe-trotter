import React, { useState, useEffect } from 'react';
import Logo from '../components/Logo';
import { api } from '../services/api';
import { 
  Compass, 
  MapPin, 
  Search, 
  User, 
  LogOut, 
  Sun, 
  Moon, 
  Sparkles, 
  ArrowRight, 
  Loader2, 
  Users, 
  ShieldCheck, 
  FolderHeart,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Local asset imports
import newYorkImg from '../assets/New York.jpg';
import tokyoImg from '../assets/tokyo.jpg';
import berlinImg from '../assets/Berlin.jpg';
import dubaiImg from '../assets/Dubai.jpg';
import sanFransiscoImg from '../assets/San Fransisco.jpg';
import torontoImg from '../assets/Toronto.jpg';
import luxemburgImg from '../assets/luxemburg.jpg';

const ASSET_CITY_IMAGES = {
  'new york': newYorkImg,
  'tokyo': tokyoImg,
  'berlin': berlinImg,
  'dubai': dubaiImg,
  'san francisco': sanFransiscoImg,
  'san fransisco': sanFransiscoImg,
  'toronto': torontoImg,
  'luxembourg': luxemburgImg,
  'luxemburg': luxemburgImg,
  'paris': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
  'london': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
  'rome': 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80',
  'bali': 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80'
};

const DEFAULT_CITIES = [
  { id: 1, name: 'New York', country: 'United States' },
  { id: 2, name: 'Tokyo', country: 'Japan' },
  { id: 3, name: 'Berlin', country: 'Germany' },
  { id: 4, name: 'Dubai', country: 'United Arab Emirates' },
  { id: 5, name: 'San Francisco', country: 'United States' },
  { id: 6, name: 'Toronto', country: 'Canada' }
];

export default function MainLanding({ 
  user, 
  onLogout, 
  onPlanTrip, 
  onNavigateToProfile,
  onNavigateToTrips,
  onNavigateToSearch,
  onNavigateToCommunity,
  onNavigateToAdmin,
  onSelectTrip
}) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [cities, setCities] = useState(DEFAULT_CITIES);
  const [isLoading, setIsLoading] = useState(false);

  // Check admin authorization via email
  const isAdmin = user?.email?.toLowerCase().trim() === 'admin@gmail.com';

  // Embedded Calendar States
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date(2026, 7, 1));
  const [calendarTrips, setCalendarTrips] = useState([]);
  const [isCalendarLoading, setIsCalendarLoading] = useState(false);
  const [selectedDayTrips, setSelectedDayTrips] = useState([]);
  const [selectedDateStr, setSelectedDateStr] = useState('');

  useEffect(() => {
    async function loadPopularDestinations() {
      try {
        setIsLoading(true);
        const data = await api.trips.getRecommendations();
        if (Array.isArray(data) && data.length > 0) {
          const uniqueMap = new Map();
          for (const item of data) {
            const key = item.name?.toLowerCase().trim();
            if (!uniqueMap.has(key)) {
              uniqueMap.set(key, item);
            }
          }
          setCities(Array.from(uniqueMap.values()));
        }
      } catch (err) {
        console.warn('Using fallback destination assets:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadPopularDestinations();
  }, []);

  const currentYear = currentCalendarDate.getFullYear();
  const currentMonth = currentCalendarDate.getMonth();
  const monthName = currentCalendarDate.toLocaleString('default', { month: 'long' });

  useEffect(() => {
    async function fetchTripsForMonth() {
      try {
        setIsCalendarLoading(true);
        const data = await api.trips.getCalendar(currentMonth + 1, currentYear);
        if (Array.isArray(data) && data.length > 0) {
          setCalendarTrips(data);
        } else {
          const allTrips = await api.trips.getAll();
          setCalendarTrips(Array.isArray(allTrips) ? allTrips : []);
        }
      } catch (err) {
        try {
          const allTrips = await api.trips.getAll();
          setCalendarTrips(Array.isArray(allTrips) ? allTrips : []);
        } catch (e) {
          setCalendarTrips([]);
        }
      } finally {
        setIsCalendarLoading(false);
      }
    }
    fetchTripsForMonth();
  }, [currentMonth, currentYear]);

  const firstDayIndex = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const getTripsForDay = (dayNumber) => {
    const checkDate = new Date(currentYear, currentMonth, dayNumber);
    checkDate.setHours(0, 0, 0, 0);

    return calendarTrips.filter((trip) => {
      if (!trip.startDate || !trip.endDate) return false;
      const start = new Date(trip.startDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(trip.endDate);
      end.setHours(0, 0, 0, 0);
      return checkDate >= start && checkDate <= end;
    });
  };

  const handleDayClick = (dayNumber) => {
    const tripsOnDay = getTripsForDay(dayNumber);
    setSelectedDayTrips(tripsOnDay);
    setSelectedDateStr(`${monthName} ${dayNumber}, ${currentYear}`);
  };

  const getCityImage = (city) => {
    const key = city?.name?.toLowerCase().trim();
    if (ASSET_CITY_IMAGES[key]) return ASSET_CITY_IMAGES[key];
    if (city?.imageUrl) return city.imageUrl;
    return newYorkImg;
  };

  return (
    <div className={`min-h-screen w-full font-sans select-none transition-colors duration-500 ${
      isDarkMode ? 'bg-[#090e15] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>
      
      {/* Top Header */}
      <header className={`sticky top-0 z-50 border-b backdrop-blur-xl ${
        isDarkMode ? 'bg-[#0b121c]/90 border-slate-800/80' : 'bg-white/90 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-2xl border border-slate-700 bg-slate-900 flex items-center justify-center shadow-lg">
              <Logo className="w-7 h-7 text-[#EFE5D8]" />
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-wider uppercase">GlobalTrotter</span>
              <p className="text-[9px] uppercase font-mono tracking-widest text-slate-400">Expedition Hub</p>
            </div>
          </div>

          {/* Navigation Bar */}
          <nav className="hidden md:flex items-center gap-1.5 font-mono text-xs">
            <button
              type="button"
              onClick={onNavigateToSearch}
              className="px-3.5 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Search className="w-3.5 h-3.5 text-teal-400" />
              <span>Search</span>
            </button>

            <button
              type="button"
              onClick={onNavigateToTrips}
              className="px-3.5 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <FolderHeart className="w-3.5 h-3.5 text-amber-400" />
              <span>My Trips</span>
            </button>

            <button
              type="button"
              onClick={onNavigateToCommunity}
              className="px-3.5 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Users className="w-3.5 h-3.5 text-indigo-400" />
              <span>Community</span>
            </button>

            {/* Admin link visible exclusively for admin@gmail.com */}
            {isAdmin && (
              <button
                type="button"
                onClick={onNavigateToAdmin}
                className="px-3.5 py-2 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>
            )}
          </nav>

          {/* User Controls */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2.5 rounded-xl border cursor-pointer ${
                isDarkMode ? 'bg-slate-800/80 border-slate-700 text-amber-300' : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {user && (
              <button
                type="button"
                onClick={onNavigateToProfile}
                className="px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-900/80 hover:border-teal-500 text-xs font-mono flex items-center gap-2 text-slate-300 hover:text-white transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <User className="w-3.5 h-3.5 text-teal-400" />
                <span className="truncate max-w-[110px]">{user.name || 'Profile'}</span>
              </button>
            )}

            <button
              type="button"
              onClick={onLogout}
              className="p-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 cursor-pointer transition-all active:scale-95"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        
        {/* Hero Section */}
        <section className={`p-8 sm:p-12 rounded-[36px] border relative overflow-hidden ${
          isDarkMode ? 'bg-gradient-to-r from-teal-950/40 via-[#0f1722] to-[#0f1722] border-slate-800 shadow-2xl' : 'bg-gradient-to-r from-teal-100/60 to-white border-slate-200 shadow-sm'
        }`}>
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-teal-500/30 bg-teal-500/10 text-[10px] font-mono tracking-widest uppercase text-teal-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Intelligent Route Architecture</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight leading-tight">
              Where will your next expedition take you?
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
              Organize multi-stop itineraries, schedule activities, track real-time budgets, and share interactive route maps.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onPlanTrip && onPlanTrip()}
                className="px-6 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-mono font-bold flex items-center gap-2 shadow-xl shadow-teal-600/25 transition-all cursor-pointer active:scale-95"
              >
                <span>Initialize New Expedition</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onNavigateToSearch}
                className="px-5 py-3.5 rounded-2xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-300 text-xs font-mono transition-all cursor-pointer active:scale-95"
              >
                Explore Destinations
              </button>
            </div>
          </div>
        </section>

        {/* Quick Launch Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Search Catalog', desc: 'Find destinations & local tours', icon: Search, action: onNavigateToSearch, color: 'text-teal-400' },
            { label: 'Saved Expeditions', desc: 'Review & edit your route files', icon: FolderHeart, action: onNavigateToTrips, color: 'text-amber-400' },
            { label: 'Community Feed', desc: 'Exchange insights with explorers', icon: Users, action: onNavigateToCommunity, color: 'text-indigo-400' }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                onClick={item.action}
                className={`p-6 rounded-3xl border transition-all duration-200 cursor-pointer hover:scale-[1.02] ${
                  isDarkMode ? 'bg-[#0f1722]/80 border-slate-800 hover:border-slate-700 shadow-md' : 'bg-white border-slate-200 shadow-sm hover:border-slate-300'
                }`}
              >
                <Icon className={`w-6 h-6 ${item.color} mb-3`} />
                <h3 className="font-serif font-bold text-base">{item.label}</h3>
                <p className="text-xs text-slate-400 mt-1 font-light">{item.desc}</p>
              </div>
            );
          })}
        </section>

        {/* Top Regional Selections */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight">Top Regional Selections</h2>
              <p className="text-xs text-slate-400 mt-0.5">Explore featured destination hubs and start crafting itineraries.</p>
            </div>
            {isLoading && (
              <div className="flex items-center gap-2 text-xs font-mono text-teal-400">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Syncing Database...</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {cities.map((city) => {
              const imageSrc = getCityImage(city);

              return (
                <div
                  key={city.id || city.name}
                  onClick={() => onPlanTrip && onPlanTrip(city)}
                  className="group relative h-72 rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 cursor-pointer shadow-lg transition-all duration-300 hover:scale-[1.03] hover:border-teal-500/60"
                >
                  <img
                    src={imageSrc}
                    alt={city.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = newYorkImg;
                    }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/30 group-hover:from-slate-950/90 transition-all" />

                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-xs font-mono font-bold tracking-wider text-white drop-shadow-md">
                      {city.name}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <h3 className="text-base font-serif font-bold text-white drop-shadow-sm leading-tight">
                      {city.name}
                    </h3>
                    <p className="text-[11px] font-sans text-slate-300 drop-shadow-sm mt-0.5">
                      {city.country}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Integrated Monthly Expedition Calendar View */}
        <section className="space-y-6 pt-4 border-t border-slate-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-teal-500/30 bg-teal-500/10 text-[10px] font-mono tracking-widest uppercase text-teal-400 mb-2">
                <CalendarIcon className="w-3.5 h-3.5" />
                <span>Expedition Calendar</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight">
                Monthly Route Timeline
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Overview of scheduled expeditions, departure dates, and active legs.
              </p>
            </div>

            {/* Month Switcher Controls */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setCurrentCalendarDate(new Date(currentYear, currentMonth - 1, 1))}
                className="p-2.5 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer active:scale-95 shadow-xs"
                title="Previous Month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <span className="px-4 py-2 rounded-xl border border-slate-800 bg-slate-900/90 font-mono font-bold text-xs text-slate-200">
                {monthName} {currentYear}
              </span>

              <button
                type="button"
                onClick={() => setCurrentCalendarDate(new Date(currentYear, currentMonth + 1, 1))}
                className="p-2.5 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer active:scale-95 shadow-xs"
                title="Next Month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Calendar Grid */}
          <div className={`p-6 rounded-[32px] border shadow-2xl ${
            isDarkMode ? 'bg-[#0f1722]/80 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="grid grid-cols-7 gap-2 text-center pb-4 border-b border-slate-800/80">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((dayStr) => (
                <span key={dayStr} className="text-[11px] font-mono font-bold uppercase text-slate-400">
                  {dayStr}
                </span>
              ))}
            </div>

            {isCalendarLoading ? (
              <div className="p-16 flex flex-col items-center justify-center gap-3 font-mono text-xs text-teal-400">
                <Loader2 className="w-8 h-8 animate-spin" />
                <span>CALCULATING MONTHLY DATES...</span>
              </div>
            ) : (
              <div className="grid grid-cols-7 gap-2 pt-4">
                {Array.from({ length: firstDayIndex }).map((_, idx) => (
                  <div key={`empty-${idx}`} className="h-20 sm:h-24 rounded-2xl bg-slate-900/20 opacity-30" />
                ))}

                {daysArray.map((dayNum) => {
                  const dayTrips = getTripsForDay(dayNum);
                  const hasTrips = dayTrips.length > 0;

                  return (
                    <div
                      key={dayNum}
                      onClick={() => handleDayClick(dayNum)}
                      className={`h-20 sm:h-24 p-2 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                        hasTrips
                          ? 'border-teal-500/50 bg-teal-950/20 hover:border-teal-400 hover:bg-teal-950/40'
                          : 'border-slate-800/60 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/80'
                      }`}
                    >
                      <span className={`text-xs font-mono font-bold ${
                        hasTrips ? 'text-teal-400' : 'text-slate-400'
                      }`}>
                        {dayNum}
                      </span>

                      {hasTrips && (
                        <div className="space-y-1 overflow-hidden">
                          {dayTrips.slice(0, 2).map((t, tIdx) => (
                            <div 
                              key={t.id || tIdx}
                              className="px-1.5 py-0.5 rounded-md bg-teal-500/20 text-teal-300 font-mono text-[9px] truncate"
                            >
                              {t.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Selected Date Information Drawer */}
          {selectedDateStr && (
            <div className={`p-6 rounded-3xl border transition-all ${
              isDarkMode ? 'bg-[#0f1722] border-slate-800' : 'bg-white border-slate-200'
            } space-y-4`}>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                <h3 className="font-serif font-bold text-base text-slate-100">
                  Scheduled for {selectedDateStr}
                </h3>
                <button
                  type="button"
                  onClick={() => setSelectedDateStr('')}
                  className="text-xs font-mono text-slate-400 hover:text-white cursor-pointer"
                >
                  Close
                </button>
              </div>

              {selectedDayTrips.length > 0 ? (
                <div className="space-y-3">
                  {selectedDayTrips.map((trip) => (
                    <div
                      key={trip.id}
                      onClick={() => onSelectTrip && onSelectTrip(trip)}
                      className="p-4 rounded-2xl border border-slate-800 bg-slate-900/80 hover:border-teal-500/60 flex items-center justify-between cursor-pointer transition-all"
                    >
                      <div>
                        <h4 className="font-bold text-sm text-slate-200">{trip.name}</h4>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {new Date(trip.startDate).toLocaleDateString()} → {new Date(trip.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="text-xs font-mono text-teal-400 hover:underline">
                        View Itinerary →
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs font-mono text-slate-500">
                  No active journeys scheduled on this specific date.
                </p>
              )}
            </div>
          )}
        </section>

      </main>
    </div>
  );
}