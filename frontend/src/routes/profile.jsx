import React, { useState, useEffect } from 'react';
import Logo from '../components/Logo';
import { api } from '../services/api';
import { User, Mail, Edit3, Check, X, ArrowLeft, Sun, Moon, Loader2 } from 'lucide-react';

const Profile = ({ onBackToMain }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    profilePhoto: null,
    preplannedTrips: [],
    previousTrips: []
  });
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    api.users.getMe()
      .then((data) => {
        setProfile(data);
        setEditForm(data);
      })
      .catch(console.error);
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
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
      alert(err.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen w-full font-sans transition-colors ${
      isDarkMode ? 'bg-[#090e15] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>
      <header className={`sticky top-0 z-50 border-b backdrop-blur-xl ${
        isDarkMode ? 'bg-[#0b121c]/90 border-slate-800' : 'bg-white/90 border-slate-200'
      }`}>
        <div className="max-w-5xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBackToMain} className="p-2 rounded-xl border border-slate-700 cursor-pointer text-slate-300">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="font-serif text-lg font-bold tracking-wider uppercase">GlobalTrotter</span>
          </div>
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2.5 rounded-xl border border-slate-700 text-amber-300">
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-10">
        <div className={`p-8 rounded-3xl border ${isDarkMode ? 'bg-[#0f1722]/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className="flex items-start justify-between mb-6 pb-4 border-b border-slate-800">
            <h2 className="text-xl font-serif font-bold">Explorer Profile (Screen 7)</h2>
            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)} 
                className="px-4 py-2 rounded-xl bg-teal-600/20 border border-teal-500/40 text-teal-400 text-xs font-mono flex items-center gap-1.5 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Info</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button onClick={handleSave} disabled={isLoading} className="px-3 py-1.5 rounded-xl bg-teal-600 text-white text-xs flex items-center gap-1 cursor-pointer">
                  {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <><Check className="w-3.5 h-3.5" /><span>Save</span></>}
                </button>
                <button onClick={() => setIsEditing(false)} className="px-3 py-1.5 rounded-xl border border-slate-700 text-xs cursor-pointer">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-mono uppercase text-slate-400 block mb-1">First Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.firstName || ''}
                  onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-900 text-sm outline-none"
                />
              ) : (
                <p className="font-bold">{profile.firstName || 'Not set'}</p>
              )}
            </div>

            <div>
              <label className="text-[11px] font-mono uppercase text-slate-400 block mb-1">Last Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.lastName || ''}
                  onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-900 text-sm outline-none"
                />
              ) : (
                <p className="font-bold">{profile.lastName || 'Not set'}</p>
              )}
            </div>

            <div>
              <label className="text-[11px] font-mono uppercase text-slate-400 block mb-1">Email</label>
              <p className="text-sm text-slate-300">{profile.email}</p>
            </div>

            <div>
              <label className="text-[11px] font-mono uppercase text-slate-400 block mb-1">Location</label>
              <p className="text-sm text-slate-300">{profile.city ? `${profile.city}, ${profile.country}` : 'Not set'}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;