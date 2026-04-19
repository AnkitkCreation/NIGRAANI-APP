import { create } from 'zustand';
import { MOCK_NOTIFICATIONS } from '../data/mockData';

const useAppStore = create((set, get) => ({
  activeTab: 'home',
  showSplash: true,
  language: 'en',
  notifications: [...MOCK_NOTIFICATIONS],

  setActiveTab: (tab) => set({ activeTab: tab }),
  hideSplash: () => set({ showSplash: false }),
  setLanguage: (lang) => set({ language: lang }),
  
  getUnreadCount: (userId) => {
    return get().notifications.filter(n => n.userId === userId && !n.read).length;
  },

  getUserNotifications: (userId) => {
    return get().notifications.filter(n => n.userId === userId);
  },

  clearNotifications: (userId) => {
    set((state) => ({
      notifications: state.notifications.map(n => 
        n.userId === userId ? { ...n, read: true } : n
      )
    }));
  },
}));

export default useAppStore;
