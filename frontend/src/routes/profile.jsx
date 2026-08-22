import React, { useState, useEffect } from 'react';
import Logo from '../components/Logo';
import { api } from '../services/api';
import { 
  User, 
  Edit3, 
  Check, 
  X, 
  ArrowLeft, 
  Sun, 
  Moon, 
  Loader2, 
  Compass, 
  Eye,
  Camera
} from 'lucide-react';

const TRIP_IMAGE_FALLBACKS = {
  default: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80',
  alpine: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80',
  tokyo: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80',
  paris: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80'
};

const Profile = ({ onBackToMain, onSelectTrip }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    profilePhoto: '',
    languagePref: 'en'
  });

  const [editForm, setEditForm] = useState({});
  const [preplannedTrips, setPreplannedTrips] = useState([]);
  const [previousTrips, setPreviousTrips] = useState([]);

  useEffect(() => {
    async function loadProfileAndTrips() {
      setIsLoading(true);
      setErrorMessage(null);
      try {
        const [meData, tripsData] = await Promise.allSettled([
          api.users.getMe(),
          api.trips.getAll()
        ]);

        if (meData.status === 'fulfilled' && meData.value) {
          setProfile(meData.value);
          setEditForm(meData.value);
        }

        if (tripsData.status === 'fulfilled' && Array.isArray(tripsData.value)) {
          const allTrips = tripsData.value;
          const now = new Date();
          now.setHours(0, 0, 0, 0);

          const upcoming = allTrips.filter((t) => new Date(t.endDate) >= now);
          const past = allTrips.filter((t) => new Date(t.endDate) < now);

          setPreplannedTrips(upcoming.length > 0 ? upcoming : allTrips.slice(0, 3));
          setPreviousTrips(past);
        }
      } catch (err) {
        setErrorMessage(err.message || 'Error loading profile data');
      } finally {
        setIsLoading(false);
      }
    }

    loadProfileAndTrips();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updated = await api.users.updateMe({
        firstName: editForm.firstName,
        lastName: editForm.lastName,
        email: editForm.email,
        profilePhoto: editForm.profilePhoto,
        languagePref: editForm.languagePref
      });
      setProfile((prev) => ({ ...prev, ...updated }));
      setIsEditing(false);
    } catch (err) {
      alert(err.message || 'Failed to update user profile');
    } finally {
      setIsSaving(false);
    }
  };

  const renderTripCard = (trip) => (
    <div
      key={trip.id || trip.name}
      className={`group relative rounded-2xl border overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-teal-500/60 shadow-lg ${
        isDarkMode ? 'bg-[#0f1722]/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}
      style={{ minHeight: '260px' }}
    >
      <div className="absolute inset-0 z-0">
        <img
          src={trip.coverPhoto || TRIP_IMAGE_FALLBACKS.default}
          alt={trip.name}
          className="w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = TRIP_IMAGE_FALLBACKS.default;
          }}
        />
        <div className={`absolute inset-0 ${
          isDarkMode ? 'bg-gradient-to-t from-[#0f1722] via-[#0f1722]/80 to-transparent' : 'bg-gradient-to-t from-white via-white/80 to-transparent'
        }`} />
      </div>

      <div className="relative z-10 p-4">
        <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest block mb-1">
          {trip.stops?.length ? `${trip.stops.length} Stops` : 'Expedition'}
        </span>
        <h4 className="font-serif font-bold text-base line-clamp-2 leading-tight">
          {trip.name}
        </h4>
        <p className="text-[11px] font-mono text-slate-400 mt-1">
          {trip.startDate ? new Date(trip.startDate).toLocaleDateString() : 'Flexible'}
        </p>
      </div>

      <div className="relative z-10 p-4 pt-0">
        <button
          type="button"
          onClick={() => onSelectTrip && onSelectTrip(trip)}
          className="w-full py-2 px-3 rounded-xl border border-slate-700 bg-slate-900/90 hover:bg-teal-600 hover:border-teal-500 text-slate-200 hover:text-white font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md active:scale-95"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen w-full font-sans select-none transition-colors duration-500 ${
      isDarkMode ? 'bg-[#090e15] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>
      <header className={`sticky top-0 z-50 border-b backdrop-blur-xl ${
        isDarkMode ? 'bg-[#0b121c]/90 border-slate-800' : 'bg-white/90 border-slate-200'
      }`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              type="button"
              onClick={onBackToMain} 
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
              <p className="text-[9px] uppercase font-mono tracking-widest text-slate-400">User Profile (Screen 7)</p>
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

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-10">
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-mono text-center">
            {errorMessage}
          </div>
        )}

        {/* User Details Box */}
        <section className={`p-6 sm:p-8 rounded-[32px] border ${
          isDarkMode ? 'bg-[#0f1722]/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative group shrink-0">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full border-4 border-slate-700 bg-slate-900 overflow-hidden flex items-center justify-center shadow-2xl relative">
                {profile.profilePhoto ? (
                  <img src={profile.profilePhoto} alt="User Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-16 h-16 text-teal-400/80" />
                )}
                {isEditing && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center text-[10px] font-mono text-teal-300">
                    <Camera className="w-5 h-5 mb-1" />
                    <span>Photo URL below</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 w-full space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-teal-400">Explorer Details</span>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold">
                    {profile.firstName || 'Alex'} {profile.lastName || 'Johnson'}
                  </h2>
                </div>

                {!isEditing ? (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 rounded-xl bg-teal-600/20 border border-teal-500/40 text-teal-400 hover:bg-teal-600 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Profile</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleSave}
                      disabled={isSaving}
                      className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50 active:scale-95"
                    >
                      {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                      <span>Save</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditForm({ ...profile });
                        setIsEditing(false);
                      }}
                      className="p-2 rounded-xl border border-slate-700 text-slate-400 hover:text-white cursor-pointer active:scale-95"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">First Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.firstName || ''}
                      onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-900 text-xs outline-none focus:border-teal-400"
                    />
                  ) : (
                    <p className="font-semibold">{profile.firstName || 'Alex'}</p>
                  )}
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Last Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.lastName || ''}
                      onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-900 text-xs outline-none focus:border-teal-400"
                    />
                  ) : (
                    <p className="font-semibold">{profile.lastName || 'Johnson'}</p>
                  )}
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Email Address</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editForm.email || ''}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-900 text-xs outline-none focus:border-teal-400"
                    />
                  ) : (
                    <p className="font-mono text-slate-300">{profile.email || 'alex.johnson@globetrotter.travel'}</p>
                  )}
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Location</label>
                  <p className="font-semibold text-slate-300">{profile.city ? `${profile.city}, ${profile.country}` : 'Zurich, Switzerland'}</p>
                </div>

                {isEditing && (
                  <div className="sm:col-span-2">
                    <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Avatar Image URL</label>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={editForm.profilePhoto || ''}
                      onChange={(e) => setEditForm({ ...editForm, profilePhoto: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-900 text-xs outline-none focus:border-teal-400"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Preplanned Trips */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-serif font-bold tracking-tight">Preplanned Trips</h3>
            <span className="text-xs font-mono text-slate-400">{preplannedTrips.length} Scheduled</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {preplannedTrips.length > 0 ? (
              preplannedTrips.map(renderTripCard)
            ) : (
              [1, 2, 3].map((i) => (
                <div key={i} className="p-8 rounded-2xl border border-dashed border-slate-800 text-center flex flex-col items-center justify-center min-h-[260px]">
                  <Compass className="w-8 h-8 text-slate-600 mb-2" />
                  <p className="text-xs font-mono text-slate-500">No preplanned trip</p>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Previous Trips */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-serif font-bold tracking-tight">Previous Trips</h3>
            <span className="text-xs font-mono text-slate-400">{previousTrips.length} Completed</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {previousTrips.length > 0 ? (
              previousTrips.map(renderTripCard)
            ) : (
              [1, 2, 3].map((i) => (
                <div key={i} className="p-8 rounded-2xl border border-dashed border-slate-800 text-center flex flex-col items-center justify-center min-h-[260px]">
                  <Compass className="w-8 h-8 text-slate-600 mb-2" />
                  <p className="text-xs font-mono text-slate-500">No completed trip</p>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;