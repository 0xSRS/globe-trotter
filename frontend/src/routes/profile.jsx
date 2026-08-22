import React, { useState } from 'react';
import Logo from '../components/Logo';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Wallet, 
  Edit3, 
  Check, 
  X, 
  Camera, 
  ArrowLeft, 
  Sun, 
  Moon,
  Compass,
  Sparkles
} from 'lucide-react';

const Profile = ({ 
  user = {
    name: "Alex Johnson",
    email: "alex.johnson@globetrotter.travel",
    phone: "+1 (555) 234-5678",
    location: "Zurich, Switzerland",
    bio: "Passionate alpine explorer and cultural backpacker. Aiming to connect 50 global cities by 2027.",
    avatar: null
  },
  onBackToMain
}) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(user);
  const [editedData, setEditedData] = useState(user);
  const [avatarPreview, setAvatarPreview] = useState(user.avatar);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
    }
  };

  const handleSave = () => {
    setProfileData({ ...editedData, avatar: avatarPreview });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData(profileData);
    setAvatarPreview(profileData.avatar);
    setIsEditing(false);
  };

  // Preplanned Trips Data (3 Cards)
  const preplannedTrips = [
    {
      id: 'pre-1',
      title: 'Dolomites & North Italy Loop',
      date: 'Sep 14 - Sep 24, 2026',
      stops: '4 Stops',
      budget: '$2,100',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'pre-2',
      title: 'Kyoto Autumn Temple Walk',
      date: 'Nov 02 - Nov 12, 2026',
      stops: '5 Stops',
      budget: '$3,400',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'pre-3',
      title: 'Patagonia Glacial Crossing',
      date: 'Jan 15 - Jan 28, 2027',
      stops: '6 Stops',
      budget: '$4,200',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80'
    }
  ];

  // Previous Trips Data (3 Cards)
  const previousTrips = [
    {
      id: 'prev-1',
      title: 'Alpine Explorer: Swiss Lakes',
      date: 'Jun 10 - Jun 20, 2026',
      stops: '4 Stops',
      budget: '$2,450',
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'prev-2',
      title: 'Nordic Fjord & Aurora Route',
      date: 'Feb 03 - Feb 11, 2026',
      stops: '3 Stops',
      budget: '$1,890',
      image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'prev-3',
      title: 'Sahara Gateway Overland',
      date: 'Nov 18 - Nov 26, 2025',
      stops: '4 Stops',
      budget: '$1,650',
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <div className={`min-h-screen w-full transition-colors duration-500 font-sans ${
      isDarkMode ? 'bg-[#090e15] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>

      {/* 1. TOP HEADER (Screen 7 Header) */}
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
              <p className="text-[9px] uppercase font-mono tracking-widest text-slate-400">User Profile (Screen 7)</p>
            </div>
          </div>

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

        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">

        {/* 2. TOP USER DETAILS CARD (Screen 7 Wireframe Top Section) */}
        <div className={`p-6 sm:p-8 rounded-3xl border backdrop-blur-xl transition-all duration-300 ${
          isDarkMode 
            ? 'bg-[#0f1722]/80 border-slate-800 shadow-2xl' 
            : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            
            {/* Left: Image of the User */}
            <div className="flex flex-col items-center shrink-0">
              <div className="relative group">
                <div className={`w-36 h-36 sm:w-44 sm:h-44 rounded-full border-4 overflow-hidden flex items-center justify-center shadow-xl transition-transform duration-300 ${
                  isDarkMode 
                    ? 'border-teal-500/50 bg-slate-900' 
                    : 'border-teal-600/40 bg-slate-100'
                }`}>
                  {avatarPreview ? (
                    <img 
                      src={avatarPreview} 
                      alt={profileData.name} 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <User className="w-20 h-20 text-teal-400/80" />
                  )}
                </div>

                {/* Upload overlay when editing */}
                {isEditing && (
                  <label className="absolute inset-0 rounded-full bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center cursor-pointer text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-6 h-6 mb-1 text-teal-300" />
                    <span className="text-[10px] font-mono tracking-wider uppercase">Change</span>
                    <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                  </label>
                )}
              </div>
              <span className="mt-3 text-[10px] font-mono tracking-[0.2em] text-slate-400 uppercase">
                Explorer ID #8841
              </span>
            </div>

            {/* Right: User Details with Edit/Save options */}
            <div className="flex-1 w-full space-y-4">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-teal-500/30 bg-teal-500/10 text-[10px] font-mono tracking-widest text-teal-400 uppercase">
                  <Sparkles className="w-3 h-3" />
                  <span>Explorer Profile Info</span>
                </div>

                {/* Edit & Save Action Buttons */}
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600/20 border border-teal-500/40 text-teal-400 hover:bg-teal-600 hover:text-white text-xs font-medium transition-all cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Information</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSave}
                      className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-medium transition-all cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs font-medium transition-all cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Cancel</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Editable Fields Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.name}
                      onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-teal-500/40 bg-slate-900/90 text-sm outline-none"
                    />
                  ) : (
                    <p className="text-base font-bold font-serif">{profileData.name}</p>
                  )}
                </div>

                {/* Email Address */}
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Email Address</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedData.email}
                      onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-teal-500/40 bg-slate-900/90 text-sm outline-none"
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <Mail className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span>{profileData.email}</span>
                    </div>
                  )}
                </div>

                {/* Phone Number */}
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedData.phone}
                      onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-teal-500/40 bg-slate-900/90 text-sm outline-none"
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{profileData.phone}</span>
                    </div>
                  )}
                </div>

                {/* Location / Base City */}
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Base Location</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.location}
                      onChange={(e) => setEditedData({ ...editedData, location: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-teal-500/40 bg-slate-900/90 text-sm outline-none"
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{profileData.location}</span>
                    </div>
                  )}
                </div>

              </div>

              {/* Bio / Preferences */}
              <div className="space-y-1 pt-1">
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Explorer Notes / Bio</label>
                {isEditing ? (
                  <textarea
                    rows={2}
                    value={editedData.bio}
                    onChange={(e) => setEditedData({ ...editedData, bio: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-teal-500/40 bg-slate-900/90 text-sm outline-none resize-none"
                  />
                ) : (
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                    {profileData.bio}
                  </p>
                )}
              </div>

            </div>

          </div>
        </div>

        {/* 3. PREPLANNED TRIPS (Screen 7 Middle Section) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight">
              Preplanned Trips
            </h2>
            <span className="text-xs font-mono text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/20">
              3 Upcoming
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {preplannedTrips.map((trip) => (
              <div
                key={trip.id}
                className={`rounded-3xl border overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl group ${
                  isDarkMode ? 'bg-[#0f1722]/80 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <div>
                  <div className="h-44 relative overflow-hidden">
                    <img
                      src={trip.image}
                      alt={trip.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full text-[10px] font-medium bg-black/70 backdrop-blur-md text-amber-300 border border-amber-300/30">
                      Preplanned
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="text-base font-bold group-hover:text-teal-400 transition-colors">
                      {trip.title}
                    </h3>
                    <div className="space-y-1.5 text-xs text-slate-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        <span>{trip.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Compass className="w-3.5 h-3.5 text-teal-400" />
                        <span>{trip.stops}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Wallet className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Est. {trip.budget}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Wireframe View Button */}
                <div className="p-5 pt-0">
                  <button 
                    onClick={() => alert(`Opening itinerary for ${trip.title}`)}
                    className="w-full py-2.5 rounded-xl border border-slate-700/80 bg-slate-900/60 hover:bg-teal-600 hover:border-teal-500 hover:text-white text-xs font-serif uppercase tracking-widest transition-all cursor-pointer"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. PREVIOUS TRIPS (Screen 7 Bottom Section) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight">
              Previous Trips
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-800/50 px-2.5 py-1 rounded-full border border-slate-700">
              3 Completed
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {previousTrips.map((trip) => (
              <div
                key={trip.id}
                className={`rounded-3xl border overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl group ${
                  isDarkMode ? 'bg-[#0f1722]/80 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <div>
                  <div className="h-44 relative overflow-hidden">
                    <img
                      src={trip.image}
                      alt={trip.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full text-[10px] font-medium bg-black/70 backdrop-blur-md text-emerald-400 border border-emerald-400/30">
                      Completed
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="text-base font-bold group-hover:text-teal-400 transition-colors">
                      {trip.title}
                    </h3>
                    <div className="space-y-1.5 text-xs text-slate-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        <span>{trip.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Compass className="w-3.5 h-3.5 text-teal-400" />
                        <span>{trip.stops}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Wallet className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Total {trip.budget}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Wireframe View Button */}
                <div className="p-5 pt-0">
                  <button 
                    onClick={() => alert(`Opening route log for ${trip.title}`)}
                    className="w-full py-2.5 rounded-xl border border-slate-700/80 bg-slate-900/60 hover:bg-teal-600 hover:border-teal-500 hover:text-white text-xs font-serif uppercase tracking-widest transition-all cursor-pointer"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

    </div>
  );
};

export default Profile;