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
import ItineraryView from './routes/itineraryView.jsx';
import CommunityTab from './routes/communityTab.jsx';
import CalendarView from './routes/calendarView.jsx';
import AdminPanel from './routes/adminPanel.jsx';

export default function App() {
  // Navigation State
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
    name: 'Interlaken & Jungfrau Region',
    startDate: '2026-09-10',
    endDate: '2026-09-20'
  });

  return (
    <div className="min-h-screen w-full">
      {/* 1. Dashboard */}
      {currentScreen === 'dashboard' && (
        <Dashboard
          onNavigateToLogin={() => setCurrentScreen('login')}
          onNavigateToRegister={() => setCurrentScreen('register')}
          onNavigateToPlanner={() => setCurrentScreen('create-trip')}
        />
      )}

      {/* 2. Login */}
      {currentScreen === 'login' && (
        <Login
          onLoginSuccess={(token, userData) => {
            setUser((prev) => ({ ...prev, name: userData.username || prev.name }));
            setCurrentScreen('main');
          }}
          onNavigateToRegister={() => setCurrentScreen('register')}
        />
      )}

      {/* 3. Register */}
      {currentScreen === 'register' && (
        <Register
          onRegisterSuccess={() => setCurrentScreen('login')}
          onNavigateToLogin={() => setCurrentScreen('login')}
        />
      )}

      {/* Screen 3: Main Landing */}
      {currentScreen === 'main' && (
        <MainLanding
          user={user}
          onLogout={() => setCurrentScreen('dashboard')}
          onPlanTrip={() => setCurrentScreen('create-trip')}
          onNavigateToProfile={() => setCurrentScreen('profile')}
        />
      )}

      {/* Screen 7: User Profile */}
      {currentScreen === 'profile' && (
        <Profile
          user={user}
          onBackToMain={() => setCurrentScreen('main')}
        />
      )}

      {/* Screen 4: Create Trip */}
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

      {/* Screen 5: Build Itinerary */}
      {currentScreen === 'build-itinerary' && (
        <BuildItinerary
          trip={activeTrip}
          user={user}
          onBackToCreate={() => setCurrentScreen('create-trip')}
          onNavigateToProfile={() => setCurrentScreen('profile')}
          onSaveItinerary={() => setCurrentScreen('itinerary-view')}
        />
      )}

      {/* Screen 6: Trip Listing */}
      {currentScreen === 'trip-listing' && (
        <TripListing
          user={user}
          onBackToMain={() => setCurrentScreen('main')}
          onNavigateToProfile={() => setCurrentScreen('profile')}
          onSelectTrip={() => setCurrentScreen('itinerary-view')}
        />
      )}

      {/* Screen 8: Activity & City Search */}
      {currentScreen === 'search-page' && (
        <SearchPage
          user={user}
          onBackToMain={() => setCurrentScreen('main')}
          onNavigateToProfile={() => setCurrentScreen('profile')}
          onSelectOption={() => setCurrentScreen('itinerary-view')}
        />
      )}

      {/* Screen 9: Itinerary & Budget View */}
      {currentScreen === 'itinerary-view' && (
        <ItineraryView
          placeName={activeTrip.name}
          user={user}
          onBackToMain={() => setCurrentScreen('main')}
          onNavigateToProfile={() => setCurrentScreen('profile')}
        />
      )}

      {/* Screen 10: Community Hub */}
      {currentScreen === 'community' && (
        <CommunityTab
          user={user}
          onBackToMain={() => setCurrentScreen('main')}
          onNavigateToProfile={() => setCurrentScreen('profile')}
        />
      )}

      {/* Screen 11: Calendar View */}
      {currentScreen === 'calendar' && (
        <CalendarView
          user={user}
          onBackToMain={() => setCurrentScreen('main')}
          onNavigateToProfile={() => setCurrentScreen('profile')}
          onSelectTrip={(trip) => {
            setActiveTrip({ name: trip.name, startDate: '2026-09-10', endDate: '2026-09-20' });
            setCurrentScreen('itinerary-view');
          }}
        />
      )}

      {/* Screen 12: Admin Panel */}
      {currentScreen === 'admin' && (
        <AdminPanel
          user={{ name: "Admin Lead", avatar: null }}
          onBackToMain={() => setCurrentScreen('main')}
          onNavigateToProfile={() => setCurrentScreen('profile')}
        />
      )}

      {/* Floating Dev Navigation Bar */}
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
          { id: 'search-page', label: 'Search (S8)' },
          { id: 'itinerary-view', label: 'Timeline (S9)' },
          { id: 'community', label: 'Community (S10)' },
          { id: 'calendar', label: 'Calendar (S11)' },
          { id: 'admin', label: 'Admin (S12)' }
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