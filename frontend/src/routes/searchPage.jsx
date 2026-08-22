import React, { useState } from 'react';
import Logo from '../components/Logo';
import { 
  Search, 
  Layers, 
  Filter, 
  ArrowUpDown, 
  MapPin, 
  Clock, 
  Wallet, 
  Star, 
  Plus, 
  Check, 
  ArrowLeft, 
  Sun, 
  Moon, 
  User,
  Compass,
  Sparkles
} from 'lucide-react';

const SearchPage = ({ 
  user = { name: "Explorer", avatar: null },
  onBackToMain,
  onNavigateToProfile,
  onSelectOption
}) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('Paragliding');
  const [groupBy, setGroupBy] = useState('Category');
  const [sortBy, setSortBy] = useState('Popularity');
  const [addedOptions, setAddedOptions] = useState([]);

  // Mock list of Search results (Option and its details stacked vertically as in Screen 8 wireframe)
  const results = [
    {
      id: 'res-1',
      title: 'Tandem Paragliding Over Interlaken & Jungfrau Views',
      city: 'Interlaken',
      country: 'Switzerland',
      category: 'Extreme Adventure',
      duration: '1.5 Hours',
      cost: '$180',
      rating: 4.9,
      reviews: 320,
      description: 'Soar above Lake Thun and Lake Brienz with panoramic vistas of Eiger, Mönch, and Jungfrau peaks with certified pilots.',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'res-2',
      title: 'Sunset Paragliding Flight from First Cliff Peak',
      city: 'Grindelwald',
      country: 'Switzerland',
      category: 'Scenic Flight',
      duration: '2 Hours',
      cost: '$210',
      rating: 4.8,
      reviews: 195,
      description: 'High-altitude launch from First Cliff Walk gliding over alpine meadows, waterfalls, and pine valleys.',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'res-3',
      title: 'Dolomites Thermal Updraft Cross-Country Glide',
      city: 'Val di Fassa',
      country: 'Italy',
      category: 'Mountain Sports',
      duration: '2.5 Hours',
      cost: '$195',
      rating: 4.9,
      reviews: 140,
      description: 'Thermal climbing over limestone spires and dramatic mountain passes with high-definition action camera footage included.',
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'res-4',
      title: 'Nordic Fjord Thermal Coast Flight',
      city: 'Voss',
      country: 'Norway',
      category: 'Aerial Touring',
      duration: '1 Hour',
      cost: '$160',
      rating: 4.7,
      reviews: 98,
      description: 'Gliding between dramatic Norwegian fjord cliffs with smooth touchdown near the crystalline lakeshore.',
      image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'res-5',
      title: 'Moroccan Atlas Foothills Acrobatic Glide',
      city: 'Marrakech',
      country: 'Morocco',
      category: 'Desert & Mountain',
      duration: '3 Hours',
      cost: '$110',
      rating: 4.6,
      reviews: 82,
      description: 'Fly over traditional Berber settlements and desert plateaus with private round-trip transportation.',
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'res-6',
      title: 'Alpine Sunrise Thermal Flight',
      city: 'Zermatt',
      country: 'Switzerland',
      category: 'Scenic Viewpoint',
      duration: '1.5 Hours',
      cost: '$230',
      rating: 5.0,
      reviews: 215,
      description: 'Early morning flight facing the sunlit face of the Matterhorn before thermal winds peak.',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'res-7',
      title: 'Lake Annecy Panoramic Tandem Experience',
      city: 'Annecy',
      country: 'France',
      category: 'Water & Mountain',
      duration: '1.5 Hours',
      cost: '$140',
      rating: 4.8,
      reviews: 410,
      description: 'Known as the European capital of paragliding, fly over turquoise lake waters surrounded by green pre-alps.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80'
    }
  ];

  const toggleOption = (id) => {
    setAddedOptions((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className={`min-h-screen w-full transition-colors duration-500 font-sans ${
      isDarkMode ? 'bg-[#090e15] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>

      {/* 1. TOP HEADER (Screen 8 Header) */}
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
              <p className="text-[9px] uppercase font-mono tracking-widest text-slate-400">Screen 8 — Activity & City Search</p>
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

        {/* 2. CONTROLS BAR: Search ("Paragliding"), Group by, Filter, Sort by */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Search Bar */}
          <div className={`relative flex-1 flex items-center rounded-2xl border transition-colors ${
            isDarkMode 
              ? 'bg-[#0f1722]/80 border-slate-800 focus-within:border-teal-400' 
              : 'bg-white border-slate-200 focus-within:border-teal-600 shadow-xs'
          }`}>
            <Search className="w-4 h-4 ml-4 text-teal-400 shrink-0" />
            <input
              type="text"
              placeholder="Search activities, adventures, or cities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-3 bg-transparent text-xs sm:text-sm outline-none placeholder-slate-400 font-medium"
            />
          </div>

          {/* Action Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <button 
              onClick={() => setGroupBy(groupBy === 'Category' ? 'Region' : 'Category')}
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
              onClick={() => setSortBy(sortBy === 'Popularity' ? 'Price' : 'Popularity')}
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

        {/* 3. RESULTS SECTION (Vertical stack matching Screen 8 wireframe) */}
        <section className="space-y-4 pb-12">
          
          {/* Results Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
            <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight">
              Results
            </h2>
            <span className="text-xs font-mono text-slate-400">
              Showing {results.length} options for "{searchQuery}"
            </span>
          </div>

          {/* Vertical Stack: Option and its details */}
          <div className="space-y-4">
            {results.map((item) => {
              const isAdded = addedOptions.includes(item.id);
              return (
                <div
                  key={item.id}
                  className={`group relative rounded-3xl border overflow-hidden p-5 sm:p-6 transition-all duration-300 hover:shadow-xl ${
                    isAdded
                      ? 'ring-2 ring-teal-400/80 border-transparent bg-teal-500/5'
                      : isDarkMode 
                        ? 'bg-[#0f1722]/80 border-slate-800 hover:border-slate-700' 
                        : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    
                    {/* Thumbnail Image */}
                    <div className="w-full sm:w-36 h-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 relative">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-black/70 backdrop-blur-md text-emerald-400 border border-emerald-400/30">
                        {item.cost}
                      </div>
                    </div>

                    {/* Option Details */}
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-teal-400">
                        <span className="px-2 py-0.5 rounded-md bg-teal-500/10 border border-teal-500/20">
                          {item.category}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-slate-400">
                          <MapPin className="w-3 h-3 text-amber-400" />
                          {item.city}, {item.country}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-slate-400">
                          <Clock className="w-3 h-3 text-indigo-400" />
                          {item.duration}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-amber-400">
                          <Star className="w-3 h-3 fill-amber-400" />
                          {item.rating} ({item.reviews})
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold group-hover:text-teal-400 transition-colors leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-xs text-slate-400 font-light leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {/* Action Button */}
                    <div className="w-full sm:w-auto flex justify-end shrink-0">
                      <button
                        onClick={() => toggleOption(item.id)}
                        className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-serif uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                          isAdded
                            ? 'bg-teal-600 text-white shadow-md shadow-teal-600/25'
                            : 'border border-slate-700 bg-slate-900/60 hover:bg-teal-600 hover:border-teal-500 text-slate-300 hover:text-white'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Included</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add to Route</span>
                          </>
                        )}
                      </button>
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

export default SearchPage;