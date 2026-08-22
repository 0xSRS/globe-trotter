import React, { useState } from 'react';
import Dashboard from './routes/dashboard.jsx';
import Login from './routes/login.jsx';
import Register from './routes/register.jsx';
import MainLanding from './routes/mainLanding.jsx';
import Profile from './routes/profile.jsx';
import CreateTrip from './routes/createTrip.jsx';
import BuildItinerary from './routes/buildItinerary.jsx';
import TripListing from './routes/tripListing.jsx';
import SearchPage from './routes/searchPage.jsx';

export default function App() {
  // Screens: 'dashboard' | 'login' | 'register' | 'main' | 'profile' | 'create-trip' | 'build-itinerary' | 'trip-listing' | 'search-page'
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  
  const [user, setUser] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@globetrotter.travel',
    phone: '+1 (555) 234-5678',
    location: 'Zurich, Switzerland',
    bio: 'Passionate alpine explorer.',
    avatar: null
  });

  const [activeTrip, setActiveTrip] = useState({
    name: 'Alpine Explorer: Swiss & Italian Lakes',
    startDate: '2026-09-10',
    endDate: '2026-09-20'
  });

  return (
    <div className="min-h-screen w-full">
      {currentScreen === 'dashboard' && (
        <Dashboard
          onNavigateToLogin={() => setCurrentScreen('login')}
          onNavigateToRegister={() => setCurrentScreen('register')}
          onNavigateToPlanner={() => setCurrentScreen('create-trip')}
        />
      )}

      {currentScreen === 'login' && (
        <Login
          onLoginSuccess={(token, userData) => {
            setUser((prev) => ({ ...prev, name: userData.username || prev.name }));
            setCurrentScreen('main');
          }}
          onNavigateToRegister={() => setCurrentScreen('register')}
        />
      )}

      {currentScreen === 'register' && (
        <Register
          onRegisterSuccess={() => setCurrentScreen('login')}
          onNavigateToLogin={() => setCurrentScreen('login')}
        />
      )}

      {currentScreen === 'main' && (
        <MainLanding
          user={user}
          onLogout={() => setCurrentScreen('dashboard')}
          onPlanTrip={() => setCurrentScreen('create-trip')}
          onNavigateToProfile={() => setCurrentScreen('profile')}
        />
      )}

      {currentScreen === 'profile' && (
        <Profile
          user={user}
          onBackToMain={() => setCurrentScreen('main')}
        />
      )}

      {currentScreen === 'create-trip' && (
        <CreateTrip
          user={user}
          onBackToMain={() => setCurrentScreen('main')}
          onNavigateToProfile={() => setCurrentScreen('profile')}
          onTripCreated={(tripData) => {
            setActiveTrip(tripData);
            setCurrentScreen('build-itinerary');
          }}
        />
      )}

      {currentScreen === 'build-itinerary' && (
        <BuildItinerary
          trip={activeTrip}
          user={user}
          onBackToCreate={() => setCurrentScreen('create-trip')}
          onNavigateToProfile={() => setCurrentScreen('profile')}
          onSaveItinerary={() => setCurrentScreen('trip-listing')}
        />
      )}

      {currentScreen === 'trip-listing' && (
        <TripListing
          user={user}
          onBackToMain={() => setCurrentScreen('main')}
          onNavigateToProfile={() => setCurrentScreen('profile')}
          onSelectTrip={() => setCurrentScreen('search-page')}
        />
      )}

      {/* Screen 8: Activity & City Search Page */}
      {currentScreen === 'search-page' && (
        <SearchPage
          user={user}
          onBackToMain={() => setCurrentScreen('main')}
          onNavigateToProfile={() => setCurrentScreen('profile')}
          onSelectOption={(option) => alert(`Added ${option.title} to current route!`)}
        />
      )}

      {/* Quick Switcher Tool */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 px-3 py-2 rounded-full border border-slate-700 bg-slate-900/90 backdrop-blur-md shadow-2xl text-[10px] font-mono">
        <span className="text-slate-500 pr-1">DEV:</span>
        {[
          { id: 'dashboard', label: 'Home' },
          { id: 'login', label: 'Login' },
          { id: 'main', label: 'Landing (S3)' },
          { id: 'create-trip', label: 'Create (S4)' },
          { id: 'build-itinerary', label: 'Itinerary (S5)' },
          { id: 'trip-listing', label: 'Trips (S6)' },
          { id: 'profile', label: 'Profile (S7)' },
          { id: 'search-page', label: 'Search (S8)' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCurrentScreen(tab.id)}
            className={`px-2 py-1 rounded-full transition-all cursor-pointer ${
              currentScreen === tab.id
                ? 'bg-teal-600 text-white font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}