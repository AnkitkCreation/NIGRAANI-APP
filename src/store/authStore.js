import { create } from 'zustand';
import { MOCK_USER } from '../data/mockData';

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isFirstLaunch: !localStorage.getItem('nigrani_onboarded'),

  login: (userData) => {
    const user = userData || MOCK_USER;
    localStorage.setItem('nigrani_user', JSON.stringify(user));
    set({ user, isAuthenticated: true });
  },

  register: (userData) => {
    const user = { ...MOCK_USER, ...userData, id: 'u_' + Date.now() };
    localStorage.setItem('nigrani_user', JSON.stringify(user));
    set({ user, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('nigrani_user');
    set({ user: null, isAuthenticated: false });
  },

  completeOnboarding: () => {
    localStorage.setItem('nigrani_onboarded', 'true');
    set({ isFirstLaunch: false });
  },

  loadUser: () => {
    const stored = localStorage.getItem('nigrani_user');
    if (stored) {
      set({ user: JSON.parse(stored), isAuthenticated: true });
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
