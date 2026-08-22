import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import Logo from '../components/Logo';
import { 
  Compass, 
  ArrowRight, 
  ArrowLeft, 
  Sun, 
  Moon, 
  Loader2, 
  Sparkles
} from 'lucide-react';

export default function CreateTrip({
  user,
  onTripCreated,
  onBackToMain,
  onBackToLanding,
  onBack,
  onNavigateToProfile
}) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [popularCities, setPopularCities] = useState([]);

  // Multi-prop fallback to ensure back navigation always functions
  const handleBack = onBackToMain || onBackToLanding || onBack;

  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    description: '',
    coverPhoto: ''
  });

  useEffect(() => {
    async function loadRecommendations() {
      try {
        const data = await api.trips.getRecommendations();
        if (Array.isArray(data) && data.length > 0) {
          // Deduplicate by city name
          const uniqueCities = [];
          const seen = new Set();
          for (const city of data) {
            const key = city.name?.toLowerCase().trim();
            if (!seen.has(key)) {
              seen.add(key);
              uniqueCities.push(city);
            }
          }
          setPopularCities(uniqueCities);
        } else {
          setPopularCities([
            { id: 1, name: 'Paris' },
            { id: 2, name: 'New York' },
            { id: 3, name: 'Tokyo' },
            { id: 4, name: 'London' },
            { id: 5, name: 'Rome' },
            { id: 6, name: 'Bali' }
          ]);
        }
      } catch (err) {
        setPopularCities([
          { id: 1, name: 'Paris' },
          { id: 2, name: 'New York' },
          { id: 3, name: 'Tokyo' },
          { id: 4, name: 'London' },
          { id: 5, name: 'Rome' },
          { id: 6, name: 'Bali' }
        ]);
      }
    }
    loadRecommendations();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectCityAsTrip = (cityName) => {
    setFormData((prev) => ({
      ...prev,
      name: `Journey to ${cityName}`,
      description: `Exploring key sights, culture, and attractions in ${cityName}.`
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name.trim() || !formData.startDate || !formData.endDate) {
      setErrorMessage('Please specify trip title, start date, and end date.');
      return;
    }

    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      setErrorMessage('End date cannot be prior to start date.');
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        name: formData.name.trim(),
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
        description: formData.description.trim() || undefined,
        coverPhoto: formData.coverPhoto.trim() || undefined
      };

      const newTrip = await api.trips.create(payload);
      if (onTripCreated) {
        onTripCreated(newTrip);
      }
    } catch (err) {
      // Offline / Local fallback trip creation
      const localTrip = {
        id: Date.now(),
        name: formData.name.trim(),
        startDate: formData.startDate,
        endDate: formData.endDate,
        description: formData.description.trim(),
        coverPhoto: formData.coverPhoto.trim(),
        stops: []
      };
      if (onTripCreated) {
        onTripCreated(localTrip);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen w-full font-sans transition-colors duration-500 ${
      isDarkMode ? 'bg-[#090e15] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 border-b backdrop-blur-xl ${
        isDarkMode ? 'bg-[#0b121c]/90 border-slate-800/80' : 'bg-white/90 border-slate-200'
      }`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Functional Back Button */}
            <button 
              type="button"
              onClick={() => {
                if (handleBack) {
                  handleBack();
                } else {
                  window.history.back();
                }
              }}
              className="p-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer active:scale-95 shadow-xs"
              title="Return to Landing"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="p-1.5 rounded-2xl border border-slate-700 bg-slate-900 flex items-center justify-center">
              <Logo className="w-7 h-7 text-[#EFE5D8]" />
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-wider uppercase">GlobeTrotter</span>
              <p className="text-[9px] uppercase font-mono tracking-widest text-slate-400">Screen 4 — Initialize Expedition</p>
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

      {/* Main Content Form */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className={`p-8 sm:p-10 rounded-[32px] border backdrop-blur-2xl shadow-2xl ${
          isDarkMode ? 'bg-[#0f1722]/85 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-teal-500/30 bg-teal-500/10 text-[10px] font-mono tracking-widest uppercase text-teal-400 mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>Step 1: Define Parameters</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold">Plan a New Expedition</h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">Set your journey title and dates to configure stop itineraries.</p>
          </div>

          {errorMessage && (
            <div className="mb-6 p-3.5 text-xs rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-center font-mono">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Expedition Title */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                Expedition Title *
              </label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Alpine Circuit 2026"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-2xl border border-slate-700 bg-slate-900/90 text-sm outline-none focus:border-teal-400 placeholder-slate-500"
              />
            </div>

            {/* Dates Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                  Start Date *
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-slate-700 bg-slate-900/90 text-sm outline-none focus:border-teal-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                  End Date *
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-slate-700 bg-slate-900/90 text-sm outline-none focus:border-teal-400"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                Description / Notes (Optional)
              </label>
              <textarea
                name="description"
                rows={3}
                placeholder="Key goals, gear lists, travel companions..."
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl border border-slate-700 bg-slate-900/90 text-sm outline-none resize-none focus:border-teal-400 placeholder-slate-500"
              />
            </div>

            {/* Cover Photo URL */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                Cover Photo URL (Optional)
              </label>
              <input
                type="url"
                name="coverPhoto"
                placeholder="https://images.unsplash.com/..."
                value={formData.coverPhoto}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl border border-slate-700 bg-slate-900/90 text-sm outline-none focus:border-teal-400 placeholder-slate-500"
              />
            </div>

            {/* Popular Inspiration Badges */}
            {popularCities.length > 0 && (
              <div className="pt-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
                  Popular Route Ideas:
                </span>
                <div className="flex flex-wrap gap-2">
                  {popularCities.map((city, idx) => (
                    <button
                      key={city.id || `${city.name}-${idx}`}
                      type="button"
                      onClick={() => handleSelectCityAsTrip(city.name)}
                      className="px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900/80 hover:border-teal-500 text-xs font-mono text-slate-300 hover:text-teal-400 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>{city.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 py-3.5 px-5 rounded-2xl bg-teal-600 hover:bg-teal-500 active:scale-[0.98] text-white font-mono font-bold text-sm shadow-xl shadow-teal-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Proceed to Itinerary Builder</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

        </div>
      </main>
    </div>
  );
}