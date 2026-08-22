import React, { useState } from 'react';
import Logo from '../components/Logo';
import { 
  Calendar, 
  MapPin, 
  Plus, 
  Sparkles, 
  ArrowLeft, 
  Sun, 
  Moon, 
  Check, 
  Compass, 
  Search,
  User
} from 'lucide-react';

const CreateTrip = ({ 
  user = { name: "Explorer", avatar: null },
  onBackToMain,
  onNavigateToProfile,
  onTripCreated
}) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Form states matching Screen 4 wireframe inputs
  const [tripName, setTripName] = useState('');
  const [selectedPlace, setSelectedPlace] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedSuggestions, setSelectedSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 6 Suggestions for Places/Activities (2x3 grid as shown in Screen 4 wireframe)
  const suggestions = [
    {
      id: 'act-1',
      title: 'Matterhorn Alpine Trail',
      category: 'Trekking & Sightseeing',
      cost: '$45',
      duration: '4 Hours',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'act-2',
      title: 'Lake Como Kayak Tour',
      category: 'Water Activity',
      cost: '$60',
      duration: '3 Hours',
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'act-3',
      title: 'Traditional Sushi Workshop',
      category: 'Culinary Masterclass',
      cost: '$75',
      duration: '2.5 Hours',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'act-4',
      title: 'Fjord Kayak & Glacier View',
      category: 'Nature & Adventure',
      cost: '$85',
      duration: '5 Hours',
      image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'act-5',
      title: 'Old Town Heritage Walk',
      category: 'Historical Tour',
      cost: '$30',
      duration: '2 Hours',
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'act-6',
      title: 'Alpine Cable Car Expedition',
      category: 'Scenic Viewpoint',
      cost: '$55',
      duration: '3.5 Hours',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const toggleSuggestion = (id) => {
    setSelectedSuggestions((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCreateTrip = async (e) => {
    e.preventDefault();
    if (!tripName || !selectedPlace || !startDate || !endDate) {
      alert('Please fill out the trip name, place, and dates.');
      return;
    }

    setIsLoading(true);

    const newTripPayload = {
      name: tripName,
      place: selectedPlace,
      startDate,
      endDate,
      description: `Custom trip to ${selectedPlace}`,
      activities: selectedSuggestions
    };

    // Ready for POST /trips endpoint
    try {
      /*
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/trips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newTripPayload)
      });
      const data = await res.json();
      */
      await new Promise((resolve) => setTimeout(resolve, 800));
      onTripCreated?.(newTripPayload);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

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
              title="Back to Expedition Portal"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="p-1.5 rounded-2xl border border-slate-700/80 bg-slate-900 flex items-center justify-center">
              <Logo className="w-7 h-7 text-[#EFE5D8]" />
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-wider uppercase">GlobalTrotter</span>
              <p className="text-[9px] uppercase font-mono tracking-widest text-slate-400">Screen 4 — Create Trip</p>
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

      {/* MAIN BODY */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">

        {/* 2. TOP SECTION: Plan a new trip (Wireframe Form) */}
        <section className={`p-6 sm:p-8 rounded-3xl border backdrop-blur-xl transition-all ${
          isDarkMode ? 'bg-[#0f1722]/80 border-slate-800 shadow-xl' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight">Plan a new trip</h2>
              <p className="text-xs text-slate-400 font-light mt-0.5">Configure expedition destination and scheduled milestones</p>
            </div>
          </div>

          <form onSubmit={handleCreateTrip} className="space-y-4 max-w-3xl">
            
            {/* Input 1: Trip Name */}
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
              <label className="text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-400">
                Trip Name:
              </label>
              <div className="sm:col-span-3 relative">
                <input
                  type="text"
                  value={tripName}
                  onChange={(e) => setTripName(e.target.value)}
                  placeholder="e.g., Swiss Alps Summer Crossing"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all ${
                    isDarkMode 
                      ? 'border-slate-700 bg-slate-900/90 text-white placeholder-slate-500 focus:border-teal-400' 
                      : 'border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:border-teal-600'
                  }`}
                />
              </div>
            </div>

            {/* Input 2: Select a Place */}
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
              <label className="text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-400">
                Select a Place:
              </label>
              <div className="sm:col-span-3 relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={selectedPlace}
                  onChange={(e) => setSelectedPlace(e.target.value)}
                  placeholder="Search city, region, or landmark..."
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none transition-all ${
                    isDarkMode 
                      ? 'border-slate-700 bg-slate-900/90 text-white placeholder-slate-500 focus:border-teal-400' 
                      : 'border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:border-teal-600'
                  }`}
                />
              </div>
            </div>

            {/* Input 3: Start Date */}
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
              <label className="text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-400">
                Start Date:
              </label>
              <div className="sm:col-span-3 relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Calendar className="w-4 h-4" />
                </div>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none transition-all ${
                    isDarkMode 
                      ? 'border-slate-700 bg-slate-900/90 text-white placeholder-slate-500 focus:border-teal-400' 
                      : 'border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:border-teal-600'
                  }`}
                />
              </div>
            </div>

            {/* Input 4: End Date */}
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
              <label className="text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-400">
                End Date:
              </label>
              <div className="sm:col-span-3 relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Calendar className="w-4 h-4" />
                </div>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none transition-all ${
                    isDarkMode 
                      ? 'border-slate-700 bg-slate-900/90 text-white placeholder-slate-500 focus:border-teal-400' 
                      : 'border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:border-teal-600'
                  }`}
                />
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-3 flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-serif uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Save Trip & Build Itinerary</span>
              </button>
            </div>

          </form>
        </section>

        {/* 3. BOTTOM SECTION: Suggestion for Places to Visit / Activities to perform */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight">
                Suggestion for Places to Visit / Activities to perform
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400">
              {selectedSuggestions.length} Selected
            </span>
          </div>

          {/* 2x3 Grid matching Screen 4 wireframe */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {suggestions.map((item) => {
              const isSelected = selectedSuggestions.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleSuggestion(item.id)}
                  className={`group relative rounded-3xl border overflow-hidden transition-all duration-300 hover:shadow-2xl cursor-pointer ${
                    isSelected
                      ? 'ring-2 ring-teal-400 border-transparent bg-teal-500/10'
                      : isDarkMode 
                        ? 'bg-[#0f1722]/80 border-slate-800 hover:border-slate-700' 
                        : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <div className="h-44 relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full text-[10px] font-medium bg-black/70 backdrop-blur-md text-white border border-white/20">
                      {item.cost}
                    </div>

                    {isSelected && (
                      <div className="absolute top-3.5 left-3.5 p-1 rounded-full bg-teal-500 text-white shadow-lg">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-teal-400">
                      <span>{item.category}</span>
                      <span>{item.duration}</span>
                    </div>

                    <h3 className="text-base font-bold group-hover:text-teal-400 transition-colors">
                      {item.title}
                    </h3>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-xs text-slate-400">
                        {isSelected ? '✓ Added to Route' : '+ Tap to include'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </main>

    </div>
  );
};

export default CreateTrip;