import React, { useState } from 'react';
import Logo from '../components/Logo';
import { 
  Search, 
  Layers, 
  Filter, 
  ArrowUpDown, 
  ChevronLeft, 
  ChevronRight, 
  ArrowLeft, 
  Sun, 
  Moon, 
  User, 
  Calendar as CalendarIcon,
  Sparkles,
  MapPin,
  Clock
} from 'lucide-react';

const CalendarView = ({ 
  user = { name: "Explorer", avatar: null },
  onBackToMain,
  onNavigateToProfile,
  onSelectTrip
}) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [groupBy, setGroupBy] = useState('Month');
  const [sortBy, setSortBy] = useState('Date');
  const [currentMonthIndex, setCurrentMonthIndex] = useState(8); // September 2026

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const year = 2026;

  // Calendar Scheduled Trips (Matching Screen 11 Wireframe style: Paris Trip, NYC Getaway, Japan Adventure)
  const scheduledTrips = [
    {
      id: 'cal-1',
      name: "PARIS TRIP",
      startDay: 4,
      endDay: 6,
      color: "bg-teal-500/20 border-teal-500/50 text-teal-300",
      solidColor: "bg-teal-500",
      location: "Paris, France"
    },
    {
      id: 'cal-2',
      name: "NYC – GETAWAY",
      startDay: 13,
      endDay: 16,
      color: "bg-amber-500/20 border-amber-500/50 text-amber-300",
      solidColor: "bg-amber-500",
      location: "New York, USA"
    },
    {
      id: 'cal-3',
      name: "JAPAN ADVENTURE",
      startDay: 18,
      endDay: 23,
      color: "bg-indigo-500/20 border-indigo-500/50 text-indigo-300",
      solidColor: "bg-indigo-500",
      location: "Tokyo & Kyoto, Japan"
    },
    {
      id: 'cal-4',
      name: "ALPINE CROSSING",
      startDay: 26,
      endDay: 29,
      color: "bg-rose-500/20 border-rose-500/50 text-rose-300",
      solidColor: "bg-rose-500",
      location: "Interlaken, Switzerland"
    }
  ];

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // 35-day grid setup for current view
  const daysInGrid = Array.from({ length: 35 }, (_, i) => {
    const dayNumber = i - 1; // offset start
    return dayNumber > 0 && dayNumber <= 30 ? dayNumber : null;
  });

  return (
    <div className={`min-h-screen w-full transition-colors duration-500 font-sans ${
      isDarkMode ? 'bg-[#090e15] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>

      {/* 1. TOP HEADER (Screen 11 Header) */}
      <header className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-colors ${
        isDarkMode ? 'bg-[#0b121c]/90 border-slate-800/80' : 'bg-white/90 border-slate-200 shadow-xs'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <button 
              onClick={onBackToMain}
              className={`p-2 rounded-xl border transition-all cursor-pointer mr-1 ${
                isDarkMode 
                  ? 'bg-slate-800/70 border-slate-700 hover:bg-slate-700 text-slate-300' 
                  : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-700'
              }`}
              title="Back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="p-1.5 rounded-2xl border border-slate-700/80 bg-slate-900 flex items-center justify-center">
              <Logo className="w-7 h-7 text-[#EFE5D8]" />
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-wider uppercase">GlobalTrotter</span>
              <p className="text-[9px] uppercase font-mono tracking-widest text-slate-400">Screen 11 — Calendar Timeline</p>
            </div>
          </div>

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

            {/* Circular Profile Button */}
            <button
              onClick={onNavigateToProfile}
              className={`relative w-10 h-10 rounded-full border-2 transition-all duration-200 flex items-center justify-center overflow-hidden cursor-pointer hover:scale-105 active:scale-95 shadow-md ${
                isDarkMode 
                  ? 'border-teal-500/50 bg-slate-900 hover:border-teal-400' 
                  : 'border-teal-600/40 bg-white hover:border-teal-600'
              }`}
              title="Open Profile"
            >
              {user.avatar ? (
                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className={`w-5 h-5 ${isDarkMode ? 'text-teal-400' : 'text-teal-600'}`} />
              )}
            </button>
          </div>

        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* 2. CONTROLS BAR: Search, Group by, Filter, Sort by */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          <div className={`relative flex-1 flex items-center rounded-2xl border transition-colors ${
            isDarkMode 
              ? 'bg-[#0f1722]/80 border-slate-800 focus-within:border-teal-400' 
              : 'bg-white border-slate-200 focus-within:border-teal-600 shadow-xs'
          }`}>
            <Search className="w-4 h-4 ml-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search scheduled calendar milestones or trips..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-3 bg-transparent text-xs sm:text-sm outline-none placeholder-slate-400 font-medium"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <button 
              onClick={() => setGroupBy(groupBy === 'Month' ? 'Year' : 'Month')}
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
              onClick={() => setSortBy(sortBy === 'Date' ? 'Duration' : 'Date')}
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

        {/* 3. CALENDAR VIEW CONTAINER (Screen 11 Main White/Dark Frame) */}
        <section className={`p-6 sm:p-10 rounded-3xl border backdrop-blur-xl transition-all duration-300 ${
          isDarkMode 
            ? 'bg-[#0f1722]/80 border-slate-800 shadow-2xl' 
            : 'bg-white border-slate-200 shadow-sm'
        }`}>

          {/* Section Header */}
          <div className="text-center pb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-teal-500/30 bg-teal-500/10 text-[10px] font-mono tracking-widest text-teal-400 uppercase mb-2">
              <Sparkles className="w-3 h-3" />
              <span>SYNCHRONIZED EXPEDITIONS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
              Calendar View
            </h1>
          </div>

          {/* Calendar Inner Board (Wireframe Box) */}
          <div className={`rounded-3xl border overflow-hidden transition-all ${
            isDarkMode ? 'bg-[#0b121c] border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>

            {/* Month Header with Navigation Arrows (Wireframe ← Month Year →) */}
            <div className={`flex items-center justify-between px-6 py-5 border-b ${
              isDarkMode ? 'border-slate-800/80 bg-slate-900/40' : 'border-slate-200 bg-white'
            }`}>
              <button 
                onClick={() => setCurrentMonthIndex((prev) => (prev > 0 ? prev - 1 : 11))}
                className="p-2 rounded-xl hover:bg-slate-800/60 transition-colors cursor-pointer text-slate-400 hover:text-white"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-wide">
                {months[currentMonthIndex]} {year}
              </h2>

              <button 
                onClick={() => setCurrentMonthIndex((prev) => (prev < 11 ? prev + 1 : 0))}
                className="p-2 rounded-xl hover:bg-slate-800/60 transition-colors cursor-pointer text-slate-400 hover:text-white"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Weekdays Row */}
            <div className={`grid grid-cols-7 border-b text-center py-3 text-xs font-mono font-bold tracking-wider ${
              isDarkMode ? 'border-slate-800/80 text-slate-400 bg-slate-950/40' : 'border-slate-200 text-slate-600 bg-slate-100'
            }`}>
              {daysOfWeek.map((day, idx) => (
                <div key={idx}>{day}</div>
              ))}
            </div>

            {/* Calendar Days Matrix Grid */}
            <div className="grid grid-cols-7 auto-rows-[80px_sm:auto-rows-[100px]] divide-x divide-y divide-slate-800/40">
              {daysInGrid.map((dayNum, idx) => {
                if (!dayNum) {
                  return (
                    <div 
                      key={idx} 
                      className={`min-h-[85px] sm:min-h-[100px] p-2 ${
                        isDarkMode ? 'bg-slate-950/20' : 'bg-slate-100/50'
                      }`} 
                    />
                  );
                }

                // Check if any trip overlaps this day
                const activeTripsForDay = scheduledTrips.filter(
                  (t) => dayNum >= t.startDay && dayNum <= t.endDay
                );

                return (
                  <div
                    key={idx}
                    className={`min-h-[85px] sm:min-h-[100px] p-2 flex flex-col justify-between transition-colors relative ${
                      isDarkMode ? 'hover:bg-slate-800/20' : 'hover:bg-slate-100/80'
                    }`}
                  >
                    {/* Day Number */}
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-mono font-bold ${
                        dayNum === 22 ? 'text-teal-400' : 'text-slate-400'
                      }`}>
                        {dayNum}
                      </span>
                      {dayNum === 22 && (
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 ring-2 ring-teal-400/30" />
                      )}
                    </div>

                    {/* Trip Badges Overlay inside the day box (Screen 11 Banner style) */}
                    <div className="space-y-1 mt-1">
                      {activeTripsForDay.map((trip) => (
                        <div
                          key={trip.id}
                          onClick={() => onSelectTrip?.(trip)}
                          className={`text-[9px] sm:text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md border truncate cursor-pointer shadow-xs transition-transform hover:scale-[1.02] ${trip.color}`}
                          title={`${trip.name} (${trip.location})`}
                        >
                          {dayNum === trip.startDay ? trip.name : `• ${trip.name}`}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* 4. UPCOMING EXPEDITION DRAWER / LEGEND */}
          <div className="mt-8 pt-6 border-t border-slate-800/60 space-y-4">
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400">
              Active Expedition Timelines for {months[currentMonthIndex]} {year}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {scheduledTrips.map((trip) => (
                <div
                  key={trip.id}
                  onClick={() => onSelectTrip?.(trip)}
                  className={`p-4 rounded-2xl border transition-all hover:scale-[1.02] cursor-pointer ${
                    isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${trip.solidColor}`} />
                    <h4 className="text-xs font-bold font-serif">{trip.name}</h4>
                  </div>
                  <div className="space-y-1 text-[11px] font-mono text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <CalendarIcon className="w-3 h-3 text-amber-400" />
                      <span>Sep {trip.startDay} – Sep {trip.endDay}, {year}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-teal-400" />
                      <span className="truncate">{trip.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>

      </main>

    </div>
  );
};

export default CalendarView;