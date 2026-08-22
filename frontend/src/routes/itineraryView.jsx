import React, { useState } from 'react';
import Logo from '../components/Logo';
import { 
  Search, 
  Layers, 
  Filter, 
  ArrowUpDown, 
  ArrowLeft, 
  Sun, 
  Moon, 
  User, 
  ArrowDown, 
  Clock, 
  MapPin, 
  Wallet,
  Sparkles,
  Share2
} from 'lucide-react';

const ItineraryView = ({ 
  placeName = "Interlaken & Jungfrau Region",
  user = { name: "Explorer", avatar: null },
  onBackToMain,
  onNavigateToProfile
}) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [groupBy, setGroupBy] = useState('Day');
  const [sortBy, setSortBy] = useState('Time');

  // Day-wise itinerary activities and individual expense nodes (Screen 9 wireframe)
  const itineraryDays = [
    {
      dayLabel: "Day 1",
      date: "Sep 11, 2026",
      activities: [
        {
          id: 'd1-a1',
          time: "09:00 AM",
          title: "Morning Tandem Paragliding over Höhematte Park",
          type: "Adventure / Aerial",
          location: "Beatenberg Launch Point",
          expense: "$180",
          category: "Activity"
        },
        {
          id: 'd1-a2',
          time: "01:30 PM",
          title: "Lake Brienz Turquoise Steamship Cruise & Lunch",
          type: "Scenic Transit / Dining",
          location: "Interlaken Ost Pier",
          expense: "$65",
          category: "Transit & Meal"
        },
        {
          id: 'd1-a3',
          time: "05:00 PM",
          title: "Harder Kulm Funicular Sunset Viewpoint & Dinner",
          type: "Panorama / Sightseeing",
          location: "Two Lakes Bridge",
          expense: "$85",
          category: "Sightseeing"
        }
      ]
    },
    {
      dayLabel: "Day 2",
      date: "Sep 12, 2026",
      activities: [
        {
          id: 'd2-a1',
          time: "08:30 AM",
          title: "Jungfraujoch Top of Europe Cogwheel Alpine Train",
          type: "High Mountain Transit",
          location: "Kleine Scheidegg",
          expense: "$220",
          category: "Transport"
        },
        {
          id: 'd2-a2',
          time: "01:00 PM",
          title: "Ice Palace Glacier Walk & Alpine Sensation Tour",
          type: "Glacier Exploration",
          location: "Jungfrau Summit",
          expense: "$45",
          category: "Activity"
        },
        {
          id: 'd2-a3',
          time: "06:00 PM",
          title: "Lauterbrunnen Valley Waterfalls Walk & Local Fondue",
          type: "Cultural Dinner & Walk",
          location: "Staubbach Falls",
          expense: "$70",
          category: "Meals & Tour"
        }
      ]
    }
  ];

  // Calculate total expense across all days
  const totalExpense = itineraryDays.reduce((sum, day) => {
    return sum + day.activities.reduce((dSum, act) => {
      const num = parseInt(act.expense.replace(/[^0-9]/g, '')) || 0;
      return dSum + num;
    }, 0);
  }, 0);

  return (
    <div className={`min-h-screen w-full transition-colors duration-500 font-sans ${
      isDarkMode ? 'bg-[#090e15] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>

      {/* 1. TOP HEADER (Screen 9 Header) */}
      <header className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-colors ${
        isDarkMode ? 'bg-[#0b121c]/90 border-slate-800/80' : 'bg-white/90 border-slate-200 shadow-xs'
      }`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
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
              <p className="text-[9px] uppercase font-mono tracking-widest text-slate-400">Screen 9 — Itinerary & Budget View</p>
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
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

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
              placeholder="Search schedule, activities, or expenses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-3 bg-transparent text-xs sm:text-sm outline-none placeholder-slate-400 font-medium"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <button 
              onClick={() => setGroupBy(groupBy === 'Day' ? 'Category' : 'Day')}
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
              onClick={() => setSortBy(sortBy === 'Time' ? 'Cost' : 'Time')}
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

        {/* 3. MAIN ITINERARY CANVAS (Screen 9 Card Outer Frame) */}
        <section className={`p-6 sm:p-10 rounded-3xl border backdrop-blur-xl transition-all duration-300 ${
          isDarkMode 
            ? 'bg-[#0f1722]/80 border-slate-800 shadow-2xl' 
            : 'bg-white border-slate-200 shadow-sm'
        }`}>

          {/* Section Main Title (Wireframe: Itinerary for a selected place) */}
          <div className="text-center pb-8 border-b border-slate-800/60">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-teal-500/30 bg-teal-500/10 text-[10px] font-mono tracking-widest text-teal-400 uppercase mb-2">
              <Sparkles className="w-3 h-3" />
              <span>TIMELINE & BUDGET AUDIT</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight">
              Itinerary for {placeName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-light mt-1">
              Step-by-step activity sequence synchronized with itemized section costs
            </p>
          </div>

          {/* Flowchart Column Labels */}
          <div className="grid grid-cols-12 gap-4 pt-6 pb-2 text-xs font-mono uppercase tracking-widest text-slate-400 border-b border-slate-800/40">
            <div className="col-span-3 sm:col-span-2">Day</div>
            <div className="col-span-6 sm:col-span-7">Physical Activity</div>
            <div className="col-span-3 text-right">Expense</div>
          </div>

          {/* Day Blocks */}
          <div className="space-y-12 mt-6">
            {itineraryDays.map((dayGroup) => (
              <div key={dayGroup.dayLabel} className="space-y-4">
                
                {/* Day Marker + Flowchart Items */}
                <div className="grid grid-cols-12 gap-4 items-start">
                  
                  {/* Left: Day Pill Badge (Wireframe: "Day 1", "Day 2") */}
                  <div className="col-span-12 sm:col-span-2 pt-2">
                    <div className="inline-flex flex-col items-start px-3 py-1.5 rounded-2xl border border-teal-500/40 bg-teal-500/10 text-teal-400 shadow-xs">
                      <span className="font-serif font-bold text-sm">{dayGroup.dayLabel}</span>
                      <span className="text-[10px] font-mono text-slate-400">{dayGroup.date}</span>
                    </div>
                  </div>

                  {/* Right: Flowchart Column with Down Arrows & Expense Badges */}
                  <div className="col-span-12 sm:col-span-10 space-y-3">
                    {dayGroup.activities.map((act, index) => (
                      <React.Fragment key={act.id}>
                        
                        {/* Activity Row: Activity Box (Left) + Expense Box (Right) */}
                        <div className="grid grid-cols-10 gap-3 items-center">
                          
                          {/* Physical Activity Box */}
                          <div className={`col-span-7 sm:col-span-8 p-4 rounded-2xl border transition-all duration-200 hover:scale-[1.01] ${
                            isDarkMode 
                              ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700' 
                              : 'bg-slate-50 border-slate-200 shadow-xs'
                          }`}>
                            <div className="flex items-center gap-2 text-[10px] font-mono text-amber-400 mb-1">
                              <Clock className="w-3 h-3" />
                              <span>{act.time}</span>
                              <span className="text-slate-500">•</span>
                              <span className="text-slate-400">{act.type}</span>
                            </div>
                            <h4 className="text-sm sm:text-base font-semibold leading-snug">
                              {act.title}
                            </h4>
                            <div className="flex items-center gap-1.5 mt-2 text-[11px] text-slate-400">
                              <MapPin className="w-3 h-3 text-teal-400 shrink-0" />
                              <span className="truncate">{act.location}</span>
                            </div>
                          </div>

                          {/* Expense Box */}
                          <div className={`col-span-3 sm:col-span-2 h-full min-h-[80px] flex flex-col justify-center items-center text-center p-3 rounded-2xl border transition-all ${
                            isDarkMode 
                              ? 'bg-slate-900/90 border-slate-800' 
                              : 'bg-slate-50 border-slate-200'
                          }`}>
                            <span className="text-[10px] font-mono text-slate-400 uppercase">Cost</span>
                            <span className="text-base sm:text-lg font-bold font-mono text-emerald-400 mt-0.5">
                              {act.expense}
                            </span>
                            <span className="text-[9px] font-mono text-slate-500 truncate max-w-full">
                              {act.category}
                            </span>
                          </div>

                        </div>

                        {/* Directional Down Arrow between activities (Wireframe Arrow Connector) */}
                        {index < dayGroup.activities.length - 1 && (
                          <div className="flex justify-center sm:justify-start sm:pl-32 py-1">
                            <div className="p-1 rounded-full bg-slate-800/80 text-teal-400 border border-slate-700/60 shadow-xs">
                              <ArrowDown className="w-3.5 h-3.5" />
                            </div>
                          </div>
                        )}

                      </React.Fragment>
                    ))}
                  </div>

                </div>

              </div>
            ))}
          </div>

          {/* Bottom Total Expense Bar */}
          <div className="mt-12 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Wallet className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-mono uppercase text-slate-400">Total Itinerary Spend</p>
                <h3 className="text-2xl font-bold font-mono text-emerald-400">${totalExpense.toLocaleString()}</h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => alert("Public Itinerary link copied to clipboard!")}
                className="px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-xs font-medium text-slate-300 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Route</span>
              </button>
              <button 
                onClick={onBackToMain}
                className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-serif uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-teal-600/25"
              >
                Return to Dashboard
              </button>
            </div>
          </div>

        </section>

      </main>

    </div>
  );
};

export default ItineraryView;