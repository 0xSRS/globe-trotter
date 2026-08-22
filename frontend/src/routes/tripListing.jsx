import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import Logo from '../components/Logo';
import { 
  Plus, 
  Calendar, 
  Trash2, 
  Share2, 
  Compass, 
  ArrowLeft, 
  Sun, 
  Moon, 
  Loader2
} from 'lucide-react';

export default function TripListing({
  user,
  onBackToMain,
  onBackToLanding,
  onBack,
  onNavigateToProfile,
  onSelectTrip,
  onAddNewTrip
}) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  // Normalized back handler matching any parent prop name
  const handleBackNavigation = onBackToMain || onBackToLanding || onBack;

  const fetchTrips = async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      const data = await api.trips.getAll();
      setTrips(Array.isArray(data) ? data : []);
    } catch (err) {
      console.warn('Backend unavailable, using active trips:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleDeleteTrip = async (e, tripId) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this expedition?')) return;
    try {
      await api.trips.delete(tripId);
      setTrips((prev) => prev.filter((t) => t.id !== tripId));
    } catch (err) {
      alert(err.message || 'Failed to delete trip');
    }
  };

  const handleShareTrip = async (e, tripId) => {
    e.stopPropagation();
    try {
      const res = await api.trips.share(tripId);
      const shareUrl = `${window.location.origin}/public/trips/${res.slug || res.shareSlug || 'shared-route'}`;
      navigator.clipboard.writeText(shareUrl);
      alert('Public expedition link copied to clipboard!');
    } catch (err) {
      alert(err.message || 'Failed to generate share link');
    }
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
            {/* Functional Back Button */}
            <button 
              type="button"
              onClick={() => {
                if (handleBackNavigation) {
                  handleBackNavigation();
                } else {
                  window.history.back();
                }
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
              <p className="text-[9px] uppercase font-mono tracking-widest text-slate-400">Screen 6 — My Expeditions</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2.5 rounded-xl border cursor-pointer ${
                isDarkMode ? 'bg-slate-800/80 border-slate-700 text-amber-300' : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {onAddNewTrip && (
              <button
                type="button"
                onClick={onAddNewTrip}
                className="px-4 py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-md shadow-teal-600/25 cursor-pointer active:scale-95 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>New Expedition</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-serif font-bold tracking-tight">Your Saved Expeditions ({trips.length})</h2>
            <p className="text-xs text-slate-400 mt-0.5">Manage your itineraries, review budget timelines, or generate share links.</p>
          </div>
        </div>

        {errorMessage && (
          <div className="p-3.5 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-mono text-center">
            {errorMessage}
          </div>
        )}

        {isLoading ? (
          <div className="p-20 flex flex-col items-center justify-center gap-3 font-mono text-xs text-teal-400">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span>RETRIEVING SAVED EXPEDITIONS...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <div
                key={trip.id}
                onClick={() => onSelectTrip && onSelectTrip(trip)}
                className={`group rounded-3xl border overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
                  isDarkMode ? 'bg-[#0f1722]/90 border-slate-800 hover:border-teal-500/60 shadow-lg' : 'bg-white border-slate-200 hover:border-teal-600 shadow-sm'
                }`}
              >
                {/* Card Media Banner */}
                <div className="h-44 w-full bg-slate-900 relative overflow-hidden">
                  {trip.coverPhoto ? (
                    <img 
                      src={trip.coverPhoto} 
                      alt={trip.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-teal-950/60">
                      <Compass className="w-12 h-12 text-teal-500/30" />
                    </div>
                  )}

                  {/* Actions Header */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                    <button
                      type="button"
                      onClick={(e) => handleShareTrip(e, trip.id)}
                      className="p-2 rounded-xl bg-black/60 backdrop-blur-md text-white hover:text-teal-400 transition-colors cursor-pointer"
                      title="Share Expedition"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleDeleteTrip(e, trip.id)}
                      className="p-2 rounded-xl bg-black/60 backdrop-blur-md text-white hover:text-rose-400 transition-colors cursor-pointer"
                      title="Delete Expedition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-3">
                  <h3 className="font-serif font-bold text-lg leading-snug line-clamp-1">{trip.name}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2">{trip.description || 'No expedition notes logged.'}</p>
                  
                  <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-teal-400" />
                      <span>{trip.startDate ? new Date(trip.startDate).toLocaleDateString() : 'Scheduled'}</span>
                    </div>
                    <span className="text-teal-400 font-bold">{trip.stops?.length || 0} Stops</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}