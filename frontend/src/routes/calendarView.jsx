import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import Logo from '../components/Logo';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  ArrowLeft, 
  Sun, 
  Moon, 
  Loader2,
  Compass
} from 'lucide-react';

export default function CalendarView({
  user,
  onBackToMain,
  onBack,
  onNavigateToProfile,
  onSelectTrip
}) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 1)); // August 2026
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDayTrips, setSelectedDayTrips] = useState([]);
  const [selectedDateStr, setSelectedDateStr] = useState('');

  const handleBack = onBackToMain || onBack;

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // 0-indexed

  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  // Load trips from backend API
  const fetchMonthTrips = async () => {
    try {
      setIsLoading(true);
      // Query month=1..12
      const data = await api.trips.getCalendar(currentMonth + 1, currentYear);
      if (Array.isArray(data) && data.length > 0) {
        setTrips(data);
      } else {
        // Fallback to all user trips if calendar-specific endpoint returns empty
        const allTrips = await api.trips.getAll();
        setTrips(Array.isArray(allTrips) ? allTrips : []);
      }
    } catch (err) {
      try {
        const allTrips = await api.trips.getAll();
        setTrips(Array.isArray(allTrips) ? allTrips : []);
      } catch (e) {
        setTrips([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMonthTrips();
  }, [currentMonth, currentYear]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  // Calendar Grid Calculation
  const firstDayIndex = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7; // Monday = 0
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Check which trips overlap on a given day
  const getTripsForDay = (dayNumber) => {
    const checkDate = new Date(currentYear, currentMonth, dayNumber);
    checkDate.setHours(0, 0, 0, 0);

    return trips.filter((trip) => {
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

  return (
    <div className={`min-h-screen w-full font-sans select-none transition-colors duration-500 ${
      isDarkMode ? 'bg-[#090e15] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 border-b backdrop-blur-xl ${
        isDarkMode ? 'bg-[#0b121c]/90 border-slate-800' : 'bg-white/90 border-slate-200'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              type="button"
              onClick={() => {
                if (handleBack) handleBack();
                else window.history.back();
              }}
              className="p-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer shadow-xs active:scale-95"
              title="Return to Main Landing"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="p-1.5 rounded-2xl border border-slate-700 bg-slate-900 flex items-center justify-center">
              <Logo className="w-7 h-7 text-[#EFE5D8]" />
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-wider uppercase">GlobeTrotter</span>
              <p className="text-[9px] uppercase font-mono tracking-widest text-slate-400">Monthly Timeline</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2.5 rounded-xl border cursor-pointer ${
              isDarkMode ? 'bg-slate-800/80 border-slate-700 text-amber-300' : 'bg-white border-slate-200 text-slate-700'
            }`}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        
        {/* Month Selector Bar */}
        <div className={`p-6 rounded-3xl border flex items-center justify-between shadow-xl ${
          isDarkMode ? 'bg-[#0f1722]/90 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <h2 className="font-serif font-bold text-xl sm:text-2xl text-slate-100">
              {monthName} {currentYear}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-2.5 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer shadow-xs active:scale-95"
              title="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-2.5 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer shadow-xs active:scale-95"
              title="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Calendar Interactive Grid */}
        <div className={`p-6 rounded-3xl border shadow-xl ${
          isDarkMode ? 'bg-[#0f1722]/80 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-2 text-center pb-4 border-b border-slate-800/80">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((dayStr) => (
              <span key={dayStr} className="text-xs font-mono font-bold uppercase text-slate-400">
                {dayStr}
              </span>
            ))}
          </div>

          {/* Month Day Cells */}
          {isLoading ? (
            <div className="p-16 flex flex-col items-center justify-center gap-3 font-mono text-xs text-teal-400">
              <Loader2 className="w-8 h-8 animate-spin" />
              <span>SYNCING TIMELINE EVENTS...</span>
            </div>
          ) : (
            <div className="grid grid-cols-7 gap-2 pt-4">
              {/* Empty leading offset days */}
              {Array.from({ length: firstDayIndex }).map((_, idx) => (
                <div key={`empty-${idx}`} className="h-20 sm:h-24 rounded-2xl bg-slate-900/20 opacity-30" />
              ))}

              {/* Real Days */}
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

        {/* Selected Day Expeditions Breakdown Drawer */}
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
                className="text-xs font-mono text-slate-400 hover:text-white"
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
                      View Route →
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

      </main>
    </div>
  );
}