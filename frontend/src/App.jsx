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
    id: 1,
    name: 'Interlaken & Jungfrau Region',
    startDate: '2026-09-10',
    endDate: '2026-09-20'
  });

  return (
    <div className="min-h-screen w-full bg-[#090e15] text-slate-100 selection:bg-teal-500/30">
      {/* 1. Entry Dashboard */}
      {currentScreen === 'dashboard' && (
        <Dashboard
          onNavigateToLogin={() => setCurrentScreen('login')}
          onNavigateToRegister={() => setCurrentScreen('register')}
          onNavigateToPlanner={() => setCurrentScreen('create-trip')}
        />
      )}

      {/* 2. Authentication: Login */}
      {currentScreen === 'login' && (
        <Login
          onLoginSuccess={(token, userData) => {
            if (token) localStorage.setItem('token', token);
            setUser((prev) => ({ 
              ...prev, 
              name: userData?.firstName ? `${userData.firstName} ${userData.lastName || ''}`.trim() : (userData?.name || prev.name),
              email: userData?.email || prev.email
            }));
            setCurrentScreen('main');
          }}
          onNavigateToRegister={() => setCurrentScreen('register')}
        />
      )}

      {/* 3. Authentication: Register */}
      {currentScreen === 'register' && (
        <Register
          onRegisterSuccess={() => setCurrentScreen('login')}
          onNavigateToLogin={() => setCurrentScreen('login')}
        />
      )}

      {/* Screen 3: Main Landing Hub */}
      {currentScreen === 'main' && (
        <MainLanding
          user={user}
          onLogout={() => {
            localStorage.removeItem('token');
            setCurrentScreen('dashboard');
          }}
          onPlanTrip={(selectedCity) => {
            if (selectedCity?.name) {
              setActiveTrip((prev) => ({
                ...prev,
                name: `Journey to ${selectedCity.name}`
              }));
            }
            setCurrentScreen('create-trip');
          }}
          onNavigateToProfile={() => setCurrentScreen('profile')}
          onNavigateToTrips={() => setCurrentScreen('trip-listing')}
          onNavigateToSearch={() => setCurrentScreen('search-page')}
          onNavigateToCommunity={() => setCurrentScreen('community')}
          onNavigateToCalendar={() => setCurrentScreen('calendar')}
          onNavigateToAdmin={() => setCurrentScreen('admin')}
        />
      )}

      {/* Screen 7: User Profile */}
      {currentScreen === 'profile' && (
        <Profile
          user={user}
          onBackToMain={() => setCurrentScreen('main')}
          onSelectTrip={(selected) => {
            if (selected) setActiveTrip(selected);
            setCurrentScreen('itinerary-view');
          }}
        />
      )}

      {/* Screen 4: Create Trip */}
      {currentScreen === 'create-trip' && (
        <CreateTrip
          user={user}
          onBackToMain={() => setCurrentScreen('main')}
          onNavigateToProfile={() => setCurrentScreen('profile')}
          onTripCreated={(tripData) => {
            setActiveTrip(tripData || { id: 1, name: 'Custom Expedition' });
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
          onAddNewTrip={() => setCurrentScreen('create-trip')}
          onSelectTrip={(selected) => {
            if (selected) setActiveTrip(selected);
            setCurrentScreen('itinerary-view');
          }}
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
          tripId={activeTrip.id || 1}
          placeName={activeTrip.name}
          trip={activeTrip}
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
            if (trip) setActiveTrip(trip);
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
    </div>
  );
}