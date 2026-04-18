import { create } from 'zustand';

const useAppStore = create((set) => ({
  activeTab: 'home',
  showSplash: true,
  notificationCount: 2,

  setActiveTab: (tab) => set({ activeTab: tab }),
  hideSplash: () => set({ showSplash: false }),
  clearNotifications: () => set({ notificationCount: 0 }),
  decrementNotifications: () => set((s) => ({ notificationCount: Math.max(0, s.notificationCount - 1) })),
}));

export default useAppStore;
