import React, { useState } from 'react';
import Dashboard from './routes/dashboard.jsx';
import Login from './routes/login.jsx';
import Register from './routes/register.jsx';

export default function App() {
  // 'dashboard' | 'login' | 'register'
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (token, userData) => {
    console.log('Logged in user:', userData);
    setUser(userData);
    setCurrentScreen('dashboard');
  };

  const handleRegisterSuccess = (formData) => {
    console.log('Registered user:', formData);
    alert(`Account created for ${formData.firstName}! Please login.`);
    setCurrentScreen('login');
  };

  return (
    <div className="min-h-screen w-full">
      {/* 1. Dashboard View */}
      {currentScreen === 'dashboard' && (
        <Dashboard
          onNavigateToLogin={() => setCurrentScreen('login')}
          onNavigateToRegister={() => setCurrentScreen('register')}
          onNavigateToPlanner={() => alert('Opening Trip Planner Studio...')}
        />
      )}

      {/* 2. Login View */}
      {currentScreen === 'login' && (
        <div className="relative">
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="fixed top-6 left-6 z-50 px-4 py-2 text-xs font-mono tracking-wider uppercase border border-white/20 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all cursor-pointer shadow-lg"
          >
            ← Back to Home
          </button>
          <Login
            onLoginSuccess={handleLoginSuccess}
            onNavigateToRegister={() => setCurrentScreen('register')}
          />
        </div>
      )}

      {/* 3. Register View */}
      {currentScreen === 'register' && (
        <div className="relative">
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="fixed top-6 left-6 z-50 px-4 py-2 text-xs font-mono tracking-wider uppercase border border-white/20 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all cursor-pointer shadow-lg"
          >
            ← Back to Home
          </button>
          <Register
            onRegisterSuccess={handleRegisterSuccess}
            onNavigateToLogin={() => setCurrentScreen('login')}
          />
        </div>
      )}
    </div>
  );
}