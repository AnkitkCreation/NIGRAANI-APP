import { create } from 'zustand';
import { MOCK_USER } from '../data/mockData';

const API_BASE = 'http://localhost:5000/api/auth';

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isFirstLaunch: !localStorage.getItem('nigrani_onboarded'),
  error: null,
  loading: false,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Login failed');

      localStorage.setItem('nigrani_token', data.token);
      localStorage.setItem('nigrani_user', JSON.stringify(data.user));
      set({ user: data.user, isAuthenticated: true, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  register: async (userData) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Registration failed');

      localStorage.setItem('nigrani_token', data.token);
      localStorage.setItem('nigrani_user', JSON.stringify(data.user));
      set({ user: data.user, isAuthenticated: true, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  logout: () => {
    localStorage.removeItem('nigrani_token');
    localStorage.removeItem('nigrani_user');
    set({ user: null, isAuthenticated: false });
  },

  completeOnboarding: () => {
    localStorage.setItem('nigrani_onboarded', 'true');
    set({ isFirstLaunch: false });
  },

  loadUser: () => {
    const storedUser = localStorage.getItem('nigrani_user');
    const storedToken = localStorage.getItem('nigrani_token');
    if (storedUser && storedToken) {
      set({ user: JSON.parse(storedUser), isAuthenticated: true });
    }
  },

  updateProfile: (updates) => {
    set((state) => {
      const user = { ...state.user, ...updates };
      localStorage.setItem('nigrani_user', JSON.stringify(user));
      return { user };
    });
  },
}));

export default useAuthStore;
