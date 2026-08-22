import React, { useState } from 'react';
import Logo from '../components/Logo';
import { 
  Plus, 
  Calendar, 
  Wallet, 
  Trash2, 
  ArrowLeft, 
  Sun, 
  Moon, 
  Sparkles, 
  Compass, 
  User,
  CheckCircle2,
  Edit2
} from 'lucide-react';

const BuildItinerary = ({ 
  trip = { name: "Swiss Alps & Italian Lakes Circuit", startDate: "2026-09-10", endDate: "2026-09-20" },
  user = { name: "Explorer", avatar: null },
  onBackToCreate,
  onNavigateToProfile,
  onSaveItinerary
}) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Initial sections matching Screen 5 wireframe
  const [sections, setSections] = useState([
    {
      id: 1,
      title: "Section 1: Zurich Arrival & Lake Transit",
      description: "Flight arrival at Zurich Airport (ZRH), scenic train ride to Lucerne, check-in at lakefront resort, and evening boat cruise.",
      startDate: "Sep 10, 2026",
      endDate: "Sep 13, 2026",
      budget: "$650"
    },
    {
      id: 2,
      title: "Section 2: Interlaken & Jungfrau Glacier Excursions",
      description: "Hotel stay in Grindelwald, cogwheel train to Top of Europe, alpine trail hiking, and paragliding valley tour.",
      startDate: "Sep 13, 2026",
      endDate: "Sep 17, 2026",
      budget: "$950"
    },
    {
      id: 3,
      title: "Section 3: Lake Como Villa Tours & Milan Departure",
      description: "Scenic cross-border drive to Lake Como, Bellagio ferry tour, culinary cooking masterclass, and return flight from Milan Malpensa.",
      startDate: "Sep 17, 2026",
      endDate: "Sep 20, 2026",
      budget: "$850"
    }
  ]);

  // Add a new empty section
  const handleAddSection = () => {
    const nextNumber = sections.length + 1;
    const newSection = {
      id: Date.now(),
      title: `Section ${nextNumber}: New Destination / Activity Milestone`,
      description: "All the necessary information about this section. This can be anything like travel transit, hotel check-in, or guided excursions.",
      startDate: "Oct 01, 2026",
      endDate: "Oct 05, 2026",
      budget: "$500"
    };
    setSections([...sections, newSection]);
  };

  // Remove a section
  const handleRemoveSection = (id) => {
    if (sections.length === 1) {
      alert("An itinerary must have at least one section.");
      return;
    }
    setSections(sections.filter(s => s.id !== id));
  };

  // Update section fields inline
  const handleUpdateSection = (id, field, value) => {
    setSections(sections.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  // Calculate total estimated budget
  const totalBudget = sections.reduce((acc, curr) => {
    const num = parseInt(curr.budget.replace(/[^0-9]/g, '')) || 0;
    return acc + num;
  }, 0);

  return (
    <div className={`min-h-screen w-full transition-colors duration-500 font-sans ${
      isDarkMode ? 'bg-[#090e15] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>

      {/* 1. TOP HEADER (Screen 5 Header) */}
      <header className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-colors ${
        isDarkMode ? 'bg-[#0b121c]/90 border-slate-800/80' : 'bg-white/90 border-slate-200 shadow-xs'
      }`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <button 
              onClick={onBackToCreate}
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
              <span className="font-serif text-lg font-bold tracking-wider uppercase">GlobeTrotter</span>
              <p className="text-[9px] uppercase font-mono tracking-widest text-slate-400">Screen 5 — Build Itinerary</p>
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

      {/* MAIN WIREFRAME BODY */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Trip Overview Title Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/60">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-500/30 bg-teal-500/10 text-[10px] font-mono tracking-widest text-teal-400 uppercase mb-2">
              <Sparkles className="w-3 h-3" />
              <span>CUSTOM MULTI-STOP ITINERARY</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
              {trip.name || "Custom Expedition"}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right font-mono text-xs text-slate-400">
              <p>Total Estimated Cost</p>
              <p className="text-base font-bold text-emerald-400 font-sans">${totalBudget.toLocaleString()}</p>
            </div>
            <button
              onClick={() => onSaveItinerary?.(sections)}
              className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-serif uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-teal-600/20"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Finalize</span>
            </button>
          </div>
        </div>

        {/* 2. ITINERARY SECTIONS LIST (Section 1, Section 2, Section 3) */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <div
              key={section.id}
              className={`relative p-6 sm:p-7 rounded-3xl border transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-[#0f1722]/80 border-slate-800 hover:border-slate-700 shadow-xl' 
                  : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              {/* Card Top Title & Delete */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => handleUpdateSection(section.id, 'title', e.target.value)}
                    className="w-full text-lg sm:text-xl font-bold font-serif bg-transparent outline-none border-b border-transparent focus:border-teal-500/50 transition-colors"
                  />
                </div>

                <button
                  onClick={() => handleRemoveSection(section.id)}
                  title="Remove Section"
                  className="text-slate-400 hover:text-rose-400 p-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Section Description Note */}
              <div className="mb-6">
                <textarea
                  rows={2}
                  value={section.description}
                  onChange={(e) => handleUpdateSection(section.id, 'description', e.target.value)}
                  placeholder="All the necessary information about this section (travel transit, hotel, or activity)..."
                  className="w-full text-xs sm:text-sm text-slate-400 bg-transparent outline-none resize-none font-light leading-relaxed border border-transparent focus:border-slate-700/50 p-2 rounded-xl"
                />
              </div>

              {/* Wireframe Badges: Date Range & Budget of this section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Date Range Box */}
                <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border ${
                  isDarkMode 
                    ? 'bg-slate-900/90 border-slate-800 text-slate-200' 
                    : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}>
                  <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-mono w-full">
                    <span className="text-slate-400 text-xs">Date Range:</span>
                    <input
                      type="text"
                      value={`${section.startDate} to ${section.endDate}`}
                      onChange={(e) => {
                        const parts = e.target.value.split(' to ');
                        handleUpdateSection(section.id, 'startDate', parts[0] || section.startDate);
                        handleUpdateSection(section.id, 'endDate', parts[1] || section.endDate);
                      }}
                      className="bg-transparent outline-none w-full font-medium"
                    />
                  </div>
                </div>

                {/* Budget Box */}
                <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border ${
                  isDarkMode 
                    ? 'bg-slate-900/90 border-slate-800 text-slate-200' 
                    : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}>
                  <Wallet className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-mono w-full">
                    <span className="text-slate-400 text-xs">Budget:</span>
                    <input
                      type="text"
                      value={section.budget}
                      onChange={(e) => handleUpdateSection(section.id, 'budget', e.target.value)}
                      className="bg-transparent outline-none w-full font-medium"
                    />
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* 3. WIREFRAME BOTTOM ACTION: "+ Add another Section" */}
        <div className="flex justify-center pt-4 pb-12">
          <button
            onClick={handleAddSection}
            className="w-full sm:w-auto min-w-[320px] py-3.5 px-8 rounded-2xl border-2 border-dashed border-teal-500/50 hover:border-teal-400 bg-teal-500/5 hover:bg-teal-500/10 active:scale-95 text-teal-400 font-serif uppercase tracking-widest text-xs font-semibold transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add another Section</span>
          </button>
        </div>

      </main>

    </div>
  );
};

export default BuildItinerary;