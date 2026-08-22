import React, { useState } from 'react';
import Logo from '../components/Logo';
import { 
  Search, 
  Layers, 
  Filter, 
  ArrowUpDown, 
  MapPin, 
  Calendar, 
  Wallet, 
  ArrowLeft, 
  Sun, 
  Moon, 
  User, 
  Compass, 
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react';

const TripListing = ({ 
  user = { name: "Explorer", avatar: null },
  onBackToMain,
  onNavigateToProfile,
  onSelectTrip
}) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [groupBy, setGroupBy] = useState('Status');
  const [sortBy, setSortBy] = useState('Date');

  // Sample data structured by Ongoing, Upcoming, and Completed (Screen 6)
  const tripsData = {
    ongoing: [
      {
        id: 'trip-og-1',
        title: "Swiss Alpine Circuit & Italian Lakes",
        description: "Active trek traversing Lucerne, Interlaken, Grindelwald, and Lake Como with glacier railway passes.",
        startDate: "Aug 18, 2026",
        endDate: "Aug 28, 2026",
        stops: 4,
        budget: "$2,450",
        spent: "$1,120",
        status: "Ongoing",
        coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
      }
    ],
    upcoming: [
      {
        id: 'trip-up-1',
        title: "Nordic Fjord & Aurora Borealis Route",
        description: "Scheduled flight to Tromsø, Lofoten island road trip, and guided nocturnal arctic wildlife safari.",
        startDate: "Oct 12, 2026",
        endDate: "Oct 22, 2026",
        stops: 3,
        budget: "$3,200",
        spent: "$0",
        status: "Up-coming",
        coverImage: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80"
      }
    ],
    completed: [
      {
        id: 'trip-cp-1',
        title: "Kyoto Autumn Temples & Heritage Circuit",
        description: "Completed cultural exploration covering Gion traditional district, bamboo grove walks, and tea ceremonies.",
        startDate: "Apr 05, 2026",
        endDate: "Apr 15, 2026",
        stops: 5,
        budget: "$2,850",
        spent: "$2,790",
        status: "Completed",
        coverImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80"
      },
      {
        id: 'trip-cp-2',
        title: "Sahara Oasis & Marrakech Overland",
        description: "Atlas mountain crossings, camel trek through Erg Chebbi dunes, and historic Medina artisan tours.",
        startDate: "Jan 10, 2026",
        endDate: "Jan 18, 2026",
        stops: 4,
        budget: "$1,650",
        spent: "$1,580",
        status: "Completed",
        coverImage: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80"
      }
    ]
  };

  // Reusable Trip Card Component
  const TripCard = ({ trip, statusType }) => (
    <div
      onClick={() => onSelectTrip?.(trip)}
      className={`group relative rounded-3xl border overflow-hidden p-6 sm:p-7 transition-all duration-300 hover:shadow-2xl cursor-pointer ${
        isDarkMode 
          ? 'bg-[#0f1722]/80 border-slate-800 hover:border-slate-700' 
          : 'bg-white border-slate-200 shadow-sm'
      }`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        {/* Left Info */}
        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-3">
            <span className={`text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full border ${
              statusType === 'ongoing' 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                : statusType === 'upcoming' 
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' 
                  : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}>
              {trip.status}
            </span>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>{trip.startDate} — {trip.endDate}</span>
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-serif font-bold group-hover:text-teal-400 transition-colors">
            {trip.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed max-w-3xl">
            {trip.description}
          </p>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-teal-400" />
              {trip.stops} Stops Included
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Wallet className="w-3.5 h-3.5 text-emerald-400" />
              Budget: {trip.budget}
            </span>
            {trip.spent !== "$0" && (
              <>
                <span>•</span>
                <span className="text-slate-300">Spent: {trip.spent}</span>
              </>
            )}
          </div>
        </div>

        {/* Right Action CTA */}
        <div className="flex items-center justify-end">
          <button className="px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-900/60 group-hover:bg-teal-600 group-hover:border-teal-500 group-hover:text-white text-xs font-serif uppercase tracking-wider transition-all duration-300 flex items-center gap-2">
            <span>View Details</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );

  return (
    <div className={`min-h-screen w-full transition-colors duration-500 font-sans ${
      isDarkMode ? 'bg-[#090e15] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>

      {/* 1. TOP HEADER (GlobalTrotter + Circular Profile Avatar) */}
      <header className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-colors ${
        isDarkMode ? 'bg-[#0b121c]/90 border-slate-800/80' : 'bg-white/90 border-slate-200 shadow-xs'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
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
              <p className="text-[9px] uppercase font-mono tracking-widest text-slate-400">Screen 6 — User Trip Listing</p>
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">

        {/* 2. CONTROLS BAR: Search, Group by, Filter, Sort by */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Search Bar */}
          <div className={`relative flex-1 flex items-center rounded-2xl border transition-colors ${
            isDarkMode 
              ? 'bg-[#0f1722]/80 border-slate-800 focus-within:border-teal-400' 
              : 'bg-white border-slate-200 focus-within:border-teal-600 shadow-xs'
          }`}>
            <Search className="w-4 h-4 ml-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search across all ongoing, upcoming, or completed trips..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-3 bg-transparent text-xs sm:text-sm outline-none placeholder-slate-400"
            />
          </div>

          {/* Action Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <button 
              onClick={() => setGroupBy(groupBy === 'Status' ? 'Region' : 'Status')}
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
              onClick={() => setSortBy(sortBy === 'Date' ? 'Budget' : 'Date')}
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

        {/* 3. ONGOING TRIPS SECTION */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight">
                Ongoing
              </h2>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Active Expedition
            </span>
          </div>

          <div className="space-y-4">
            {tripsData.ongoing.map((trip) => (
              <TripCard key={trip.id} trip={trip} statusType="ongoing" />
            ))}
          </div>
        </section>

        {/* 4. UP-COMING TRIPS SECTION */}
        <section className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight">
                Up-coming
              </h2>
            </div>
            <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              1 Scheduled
            </span>
          </div>

          <div className="space-y-4">
            {tripsData.upcoming.map((trip) => (
              <TripCard key={trip.id} trip={trip} statusType="upcoming" />
            ))}
          </div>
        </section>

        {/* 5. COMPLETED TRIPS SECTION (2 Cards as in Wireframe) */}
        <section className="space-y-4 pt-2 pb-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-slate-400" />
              <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight">
                Completed
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400 bg-slate-800/60 px-3 py-1 rounded-full border border-slate-700">
              2 Archived
            </span>
          </div>

          <div className="space-y-4">
            {tripsData.completed.map((trip) => (
              <TripCard key={trip.id} trip={trip} statusType="completed" />
            ))}
          </div>
        </section>

      </main>

    </div>
  );
};

export default TripListing;