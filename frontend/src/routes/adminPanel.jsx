import React, { useState } from 'react';
import Logo from '../components/Logo';
import { 
  Search, 
  Layers, 
  Filter, 
  ArrowUpDown, 
  Users, 
  MapPin, 
  Compass, 
  TrendingUp, 
  ArrowLeft, 
  Sun, 
  Moon, 
  User, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Sparkles,
  BarChart3,
  PieChart as PieIcon,
  Activity
} from 'lucide-react';

const AdminPanel = ({ 
  user = { name: "Admin", avatar: null },
  onBackToMain,
  onNavigateToProfile
}) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('analytics'); // 'users' | 'cities' | 'activities' | 'analytics'
  const [searchQuery, setSearchQuery] = useState('');
  const [groupBy, setGroupBy] = useState('Role');
  const [sortBy, setSortBy] = useState('Activity');

  // 1. Mock Users Data (Manage Users tab)
  const [usersList, setUsersList] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", city: "Ahmedabad", country: "India", tripsCount: 6, isActive: true },
    { id: 2, name: "Elena Rostova", email: "elena@globetrotter.travel", city: "Geneva", country: "Switzerland", tripsCount: 11, isActive: true },
    { id: 3, name: "Kaito Tanaka", email: "kaito@kyototrails.jp", city: "Kyoto", country: "Japan", tripsCount: 8, isActive: true },
    { id: 4, name: "Marcus Chen", email: "marcus.c@outlook.com", city: "Singapore", country: "Singapore", tripsCount: 3, isActive: false }
  ]);

  // 2. Mock Popular Cities (Popular cities tab)
  const popularCities = [
    { rank: 1, name: "Tokyo", country: "Japan", popularity: 95, costIndex: 78, routes: 142 },
    { rank: 2, name: "Interlaken", country: "Switzerland", popularity: 92, costIndex: 88, routes: 118 },
    { rank: 3, name: "Kyoto", country: "Japan", popularity: 89, costIndex: 70, routes: 104 },
    { rank: 4, name: "Paris", country: "France", popularity: 86, costIndex: 82, routes: 97 }
  ];

  // 3. Mock Popular Activities (Popular Activities tab)
  const popularActivities = [
    { rank: 1, name: "Tandem Paragliding", category: "Extreme Adventure", bookings: 420, avgCost: "$180" },
    { rank: 2, name: "Sushi Masterclass", category: "Culinary", bookings: 380, avgCost: "$60" },
    { rank: 3, name: "Jungfraujoch Railway Pass", category: "Transport & View", bookings: 340, avgCost: "$220" },
    { rank: 4, name: "Fjord Electric Cruise", category: "Water Tour", bookings: 290, avgCost: "$75" }
  ];

  const toggleUserStatus = (id) => {
    setUsersList(usersList.map(u => u.id === id ? { ...u, isActive: !u.isActive } : u));
  };

  return (
    <div className={`min-h-screen w-full transition-colors duration-500 font-sans ${
      isDarkMode ? 'bg-[#090e15] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>

      {/* 1. TOP HEADER (Screen 12 Header) */}
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
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-bold tracking-wider uppercase">GlobeTrotter</span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-rose-500/10 border border-rose-500/30 text-rose-400 font-bold">
                  ADMIN CONSOLE
                </span>
              </div>
              <p className="text-[9px] uppercase font-mono tracking-widest text-slate-400">Screen 12 — Command & Insights</p>
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

            {/* Admin Profile Circle */}
            <button
              onClick={onNavigateToProfile}
              className={`relative w-10 h-10 rounded-full border-2 transition-all duration-200 flex items-center justify-center overflow-hidden cursor-pointer hover:scale-105 active:scale-95 shadow-md ${
                isDarkMode 
                  ? 'border-rose-500/50 bg-slate-900 hover:border-rose-400' 
                  : 'border-rose-600/40 bg-white hover:border-rose-600'
              }`}
              title="Admin Profile"
            >
              {user.avatar ? (
                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <ShieldCheck className={`w-5 h-5 ${isDarkMode ? 'text-rose-400' : 'text-rose-600'}`} />
              )}
            </button>
          </div>

        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

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
              placeholder="Search users, registered emails, top destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-3 bg-transparent text-xs sm:text-sm outline-none placeholder-slate-400 font-medium"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <button 
              onClick={() => setGroupBy(groupBy === 'Role' ? 'Region' : 'Role')}
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
              onClick={() => setSortBy(sortBy === 'Activity' ? 'Date' : 'Activity')}
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

        {/* 3. FOUR ADMIN NAVIGATION BUTTONS (Screen 12 Button Row) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { id: 'users', label: 'Manage Users', icon: Users },
            { id: 'cities', label: 'Popular cities', icon: MapPin },
            { id: 'activities', label: 'Popular Activites', icon: Compass },
            { id: 'analytics', label: 'User Trends and Analytics', icon: TrendingUp }
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-4 rounded-2xl border text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-xs ${
                  isSelected
                    ? 'bg-teal-600 border-teal-500 text-white shadow-md shadow-teal-600/25'
                    : isDarkMode
                      ? 'bg-[#0f1722]/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 4. MAIN SCREEN 12 CONTENT GRID: Analytics Report Card (Left) + Wireframe Annotations (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT: Main Canvas Container (Matching Screen 12 Visual Graphic Sheet) */}
          <div className="lg:col-span-8">
            
            {/* VIEW A: User Trends and Analytics Canvas (The Wireframe Document) */}
            {activeTab === 'analytics' && (
              <div className={`p-8 sm:p-10 rounded-[36px] border backdrop-blur-xl shadow-2xl space-y-8 transition-all ${
                isDarkMode ? 'bg-[#0f1722]/90 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                
                {/* Top Section: Metrics + Pie Chart Graphic */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center pb-6 border-b border-slate-800/60">
                  
                  {/* Left Column: Metric Row Placeholders */}
                  <div className="space-y-3.5">
                    {[
                      { label: "Active Expeditions", val: "240 Active", color: "bg-teal-500" },
                      { label: "Total Booked Stops", val: "512 Stops", color: "bg-emerald-500" },
                      { label: "Avg Journey Duration", val: "6.4 Days", color: "bg-amber-500" },
                      { label: "Budget Compliance Rate", val: "92.4%", color: "bg-indigo-500" }
                    ].map((row, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full ${row.color} shrink-0 shadow-sm`} />
                        <div className="flex-1 flex items-center justify-between border-b border-slate-800/40 pb-1">
                          <span className="text-xs text-slate-400 font-mono">{row.label}</span>
                          <span className="text-xs font-bold font-mono">{row.val}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Right Column: Wireframe Pie Chart SVG Graphic */}
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative w-40 h-40">
                      <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                        {/* Slice 1 (Blue / Teal 75%) */}
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#0d9488"
                          strokeWidth="7"
                          strokeDasharray="75, 100"
                        />
                        {/* Slice 2 (Green / Emerald 25%) */}
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="7"
                          strokeDasharray="25, 100"
                          strokeDashoffset="-75"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xs font-mono text-slate-400">Total Users</span>
                        <span className="text-lg font-bold font-mono">240</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 mt-2">Active Explorer Distribution</span>
                  </div>

                </div>

                {/* Middle Section: Wireframe Line Graph Graphic */}
                <div className="space-y-3 pb-6 border-b border-slate-800/60">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>Monthly Itinerary Volume Trajectory (2026)</span>
                    <span className="text-emerald-400 font-bold">+28% Growth</span>
                  </div>

                  {/* Line Chart Graphic */}
                  <div className="relative h-28 w-full flex items-end justify-between px-4 pt-4 border-b-2 border-l-2 border-slate-700">
                    <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                      <polyline
                        fill="none"
                        stroke="#e11d48"
                        strokeWidth="3"
                        points="20,70 120,40 220,75 320,30 420,45 520,15"
                      />
                    </svg>

                    {/* Milestone Dots matching wireframe nodes */}
                    <div className="w-3.5 h-3.5 rounded-full bg-rose-500 ring-4 ring-rose-500/20 z-10 -translate-y-4" />
                    <div className="w-3.5 h-3.5 rounded-full bg-rose-500 ring-4 ring-rose-500/20 z-10 -translate-y-12" />
                    <div className="w-3.5 h-3.5 rounded-full bg-rose-500 ring-4 ring-rose-500/20 z-10 -translate-y-3" />
                    <div className="w-3.5 h-3.5 rounded-full bg-rose-500 ring-4 ring-rose-500/20 z-10 -translate-y-16" />
                    <div className="w-3.5 h-3.5 rounded-full bg-rose-500 ring-4 ring-rose-500/20 z-10 -translate-y-11" />
                    <div className="w-3.5 h-3.5 rounded-full bg-rose-500 ring-4 ring-rose-500/20 z-10 -translate-y-20" />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-500 px-2">
                    <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
                  </div>
                </div>

                {/* Bottom Section: Wireframe Bar Chart + Text Block */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-end">
                  {/* Left: Bar Graph */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-slate-400">Quarterly Cross-Continental Volume</span>
                    <div className="flex items-end gap-3 h-24 pt-2">
                      <div className="w-10 bg-amber-500 rounded-t-lg h-[45%]" />
                      <div className="w-10 bg-amber-500 rounded-t-lg h-[65%]" />
                      <div className="w-10 bg-amber-500 rounded-t-lg h-[95%]" />
                      <div className="w-10 bg-amber-500/40 rounded-t-lg h-[75%]" />
                    </div>
                  </div>

                  {/* Right: Summary Text Bars */}
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-700/40 rounded-md w-full" />
                    <div className="h-3 bg-slate-700/30 rounded-md w-4/5" />
                    <div className="h-3 bg-slate-700/30 rounded-md w-full" />
                    <div className="h-3 bg-slate-700/30 rounded-md w-2/3" />
                  </div>
                </div>

              </div>
            )}

            {/* VIEW B: Manage Users Tab */}
            {activeTab === 'users' && (
              <div className={`p-6 sm:p-8 rounded-3xl border ${
                isDarkMode ? 'bg-[#0f1722]/80 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <h3 className="font-serif text-lg font-bold mb-4">Manage User Accounts</h3>
                <div className="space-y-3">
                  {usersList.map((u) => (
                    <div key={u.id} className="p-4 rounded-2xl border border-slate-800 bg-slate-900/60 flex items-center justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-sm">{u.name}</h4>
                        <p className="text-xs text-slate-400">{u.email} • {u.city}, {u.country}</p>
                        <span className="text-[10px] font-mono text-teal-400">{u.tripsCount} Created Trips</span>
                      </div>
                      <button
                        onClick={() => toggleUserStatus(u.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono cursor-pointer transition-all ${
                          u.isActive 
                            ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-rose-500/20 hover:text-rose-300' 
                            : 'bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-emerald-500/20 hover:text-emerald-300'
                        }`}
                      >
                        {u.isActive ? 'Active (Click to Block)' : 'Blocked (Click to Enable)'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VIEW C: Popular Cities Tab */}
            {activeTab === 'cities' && (
              <div className={`p-6 sm:p-8 rounded-3xl border ${
                isDarkMode ? 'bg-[#0f1722]/80 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <h3 className="font-serif text-lg font-bold mb-4">Popular Cities Ranking</h3>
                <div className="space-y-3">
                  {popularCities.map((city) => (
                    <div key={city.rank} className="p-4 rounded-2xl border border-slate-800 bg-slate-900/60 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 flex items-center justify-center font-mono font-bold text-xs">
                          #{city.rank}
                        </span>
                        <div>
                          <h4 className="font-bold text-sm">{city.name}, {city.country}</h4>
                          <p className="text-xs text-slate-400">{city.routes} Active Itineraries</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-emerald-400">Score: {city.popularity}/100</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VIEW D: Popular Activities Tab */}
            {activeTab === 'activities' && (
              <div className={`p-6 sm:p-8 rounded-3xl border ${
                isDarkMode ? 'bg-[#0f1722]/80 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <h3 className="font-serif text-lg font-bold mb-4">Top Booked Activities</h3>
                <div className="space-y-3">
                  {popularActivities.map((act) => (
                    <div key={act.rank} className="p-4 rounded-2xl border border-slate-800 bg-slate-900/60 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-mono font-bold text-xs">
                          #{act.rank}
                        </span>
                        <div>
                          <h4 className="font-bold text-sm">{act.name}</h4>
                          <p className="text-xs text-slate-400">{act.category} • Avg {act.avgCost}</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-teal-400">{act.bookings} Bookings</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* RIGHT: Wireframe Reference Guide Box (Matching Screen 12 Annotation Block) */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className={`p-6 rounded-3xl border backdrop-blur-xl transition-all ${
              isDarkMode ? 'bg-[#0f1722]/90 border-slate-800 shadow-xl' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="flex items-center gap-2 mb-4 text-rose-400 font-mono text-xs uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4" />
                <span>Admin Documentation</span>
              </div>

              <div className="space-y-4 text-xs text-slate-400 font-light leading-relaxed">
                <div>
                  <h4 className="font-semibold text-slate-200 font-serif mb-1">Manage User Section:</h4>
                  <p>This Section is responsible for managing the users and their actions. This section gives the admin access to view all trips made by the user. Also other functionalities are supported.</p>
                </div>

                <div className="pt-2 border-t border-slate-800/60">
                  <h4 className="font-semibold text-slate-200 font-serif mb-1">Popular cities:</h4>
                  <p>Lists all the popular cities where users are visiting based on current user trends and route creations.</p>
                </div>

                <div className="pt-2 border-t border-slate-800/60">
                  <h4 className="font-semibold text-slate-200 font-serif mb-1">Popular Activites:</h4>
                  <p>List all the popular activities that the users are doing based on current user trend data.</p>
                </div>

                <div className="pt-2 border-t border-slate-800/60">
                  <h4 className="font-semibold text-slate-200 font-serif mb-1">User trends and Analytics:</h4>
                  <p>This section majorly focuses on providing analysis across various points and giving useful information to the platform admin.</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default AdminPanel;