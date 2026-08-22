import React, { useState } from 'react';
import Logo from '../components/Logo';
import { api } from '../services/api';
import { Calendar, MapPin, Plus, ArrowLeft, Sun, Moon, User, Loader2 } from 'lucide-react';

const CreateTrip = ({ 
  user = { name: "Explorer", avatar: null },
  onBackToMain,
  onNavigateToProfile,
  onTripCreated
}) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !startDate || !endDate) {
      setError('Please provide trip name, start date, and end date.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const created = await api.trips.create({
        name,
        startDate,
        endDate,
        description: description || `Custom expedition: ${name}`,
        coverPhoto: null
      });
      onTripCreated?.(created);
    } catch (err) {
      setError(err.message || 'Failed to create trip on server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen w-full transition-colors duration-500 font-sans ${
      isDarkMode ? 'bg-[#090e15] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>
      <header className={`sticky top-0 z-50 border-b backdrop-blur-xl ${
        isDarkMode ? 'bg-[#0b121c]/90 border-slate-800/80' : 'bg-white/90 border-slate-200'
      }`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBackToMain} className="p-2 rounded-xl border border-slate-700 text-slate-300 cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="font-serif text-lg font-bold tracking-wider uppercase">GlobalTrotter</span>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2.5 rounded-xl border border-slate-700 text-amber-300">
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button onClick={onNavigateToProfile} className="relative w-10 h-10 rounded-full border-2 border-teal-500/50 flex items-center justify-center">
              <User className="w-5 h-5 text-teal-400" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className={`p-8 rounded-3xl border ${isDarkMode ? 'bg-[#0f1722]/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <h2 className="text-2xl font-serif font-bold mb-1">Plan a new trip</h2>
          <p className="text-xs text-slate-400 mb-6">Initialize your multi-stop route parameters.</p>

          {error && (
            <div className="mb-4 p-3 text-xs rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">Trip Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Japan Adventure 2026"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-sm outline-none focus:border-teal-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-1">Start Date *</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-sm outline-none focus:border-teal-400"
                />
              </div>
              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-1">End Date *</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-sm outline-none focus:border-teal-400"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">Overview / Description</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief summary of this expedition..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-sm outline-none resize-none focus:border-teal-400"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-serif uppercase tracking-widest text-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><span>Save & Build Stops</span><Plus className="w-4 h-4" /></>}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateTrip;