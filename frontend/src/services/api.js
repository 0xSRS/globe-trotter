const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

/**
 * Universal native Fetch wrapper with automatic JWT injection & error handling
 */
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  if (config.body && typeof config.body === 'object' && !(config.body instanceof FormData)) {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMessage = data.error || data.message || `HTTP ${response.status}: ${response.statusText}`;
      const error = new Error(typeof errorMessage === 'object' ? JSON.stringify(errorMessage) : errorMessage);
      error.statusCode = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (err) {
    if (!err.statusCode) {
      // Network failure / server offline
      err.message = 'Unable to connect to backend server at http://localhost:3000. Ensure your Express server is running.';
    }
    throw err;
  }
}

export const api = {
  // 1. Auth Endpoints
  auth: {
    register: (userData) => request('/auth/register', { method: 'POST', body: userData }),
    login: (credentials) => request('/auth/login', { method: 'POST', body: credentials }),
    forgotPassword: (email) => request('/auth/forgot-password', { method: 'POST', body: { email } }),
  },

  // 2. Trips Endpoints
  trips: {
    create: (tripData) => request('/trips', { method: 'POST', body: tripData }),
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return request(`/trips${query ? `?${query}` : ''}`);
    },
    getById: (id) => request(`/trips/${id}`),
    update: (id, updates) => request(`/trips/${id}`, { method: 'PUT', body: updates }),
    delete: (id) => request(`/trips/${id}`, { method: 'DELETE' }),
    getRecommendations: () => request('/trips/recommendations'),
    getCalendar: (month, year) => request(`/trips/calendar?month=${month}&year=${year}`),
    getTimeline: (tripId) => request(`/trips/${tripId}/timeline`),
    getItineraryView: (tripId) => request(`/trips/${tripId}/itinerary-view`),
    getBudget: (tripId) => request(`/trips/${tripId}/budget`),
    addBudgetExpense: (tripId, data) => request(`/trips/${tripId}/budget`, { method: 'POST', body: data }),
    share: (tripId) => request(`/trips/${tripId}/share`, { method: 'POST' }),
  },

  // 3. Itinerary Builder Endpoints
  itinerary: {
    addStop: (tripId, stopData) => request(`/trips/${tripId}/stops`, { method: 'POST', body: stopData }),
    updateStop: (tripId, stopId, data) => request(`/trips/${tripId}/stops/${stopId}`, { method: 'PUT', body: data }),
    deleteStop: (tripId, stopId) => request(`/trips/${tripId}/stops/${stopId}`, { method: 'DELETE' }),
    reorderStops: (tripId, stops) => request(`/trips/${tripId}/stops/reorder`, { method: 'PUT', body: { stops } }),
    addActivity: (tripId, stopId, activityData) => request(`/trips/${tripId}/stops/${stopId}/activities`, { method: 'POST', body: activityData }),
    deleteActivity: (tripId, stopId, activityId) => request(`/trips/${tripId}/stops/${stopId}/activities/${activityId}`, { method: 'DELETE' }),
  },

  // 4. Search Endpoints
  search: {
    cities: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return request(`/cities/search${query ? `?${query}` : ''}`);
    },
    activities: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return request(`/activities/search${query ? `?${query}` : ''}`);
    },
  },

  // 5. User Profile Endpoints
  users: {
    getMe: () => request('/users/me'),
    updateMe: (userData) => request('/users/me', { method: 'PUT', body: userData }),
    deleteMe: () => request('/users/me', { method: 'DELETE' }),
    getSavedDestinations: () => request('/users/me/saved-destinations'),
    saveDestination: (cityId) => request('/users/me/saved-destinations', { method: 'POST', body: { cityId } }),
    removeSavedDestination: (cityId) => request(`/users/me/saved-destinations/${cityId}`, { method: 'DELETE' }),
  },

  // 6. Community Endpoints
  community: {
    getPosts: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return request(`/community/posts${query ? `?${query}` : ''}`);
    },
    createPost: (postData) => request('/community/posts', { method: 'POST', body: postData }),
    toggleLike: (postId) => request(`/community/posts/${postId}/like`, { method: 'POST' }),
    addComment: (postId, content) => request(`/community/posts/${postId}/comments`, { method: 'POST', body: { content } }),
    deletePost: (postId) => request(`/community/posts/${postId}`, { method: 'DELETE' }),
  },

  // 7. Admin Endpoints
  admin: {
    getStats: () => request('/admin/stats'),
    getTopCities: () => request('/admin/top-cities'),
    getTopActivities: () => request('/admin/top-activities'),
    getUsers: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return request(`/admin/users${query ? `?${query}` : ''}`);
    },
    updateUserStatus: (id, isActive) => request(`/admin/users/${id}/status`, { method: 'PUT', body: { isActive } }),
  },
};