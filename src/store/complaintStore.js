import { create } from 'zustand';
import { MOCK_COMPLAINTS, generateComplaintId } from '../data/mockData';

const useComplaintStore = create((set, get) => ({
  complaints: [...MOCK_COMPLAINTS],
  activeFilter: 'all',

  setFilter: (filter) => set({ activeFilter: filter }),

  getFilteredComplaints: () => {
    const { complaints, activeFilter } = get();
    if (activeFilter === 'all') return complaints;
    return complaints.filter(c => c.status === activeFilter);
  },

  getUserComplaints: (userId = 'u001') => {
    return get().complaints.filter(c => c.userId === userId);
  },

  getComplaintById: (id) => {
    return get().complaints.find(c => c.id === id);
  },

  addComplaint: (complaintData) => {
    const newComplaint = {
      ...complaintData,
      id: generateComplaintId(),
      userId: 'u001',
      severityConfidence: Math.random() * 0.3 + 0.7,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      timeline: [
        {
          status: 'pending',
          date: new Date().toISOString(),
          note: 'Complaint registered by citizen',
          actor: 'You',
        },
      ],
    };
    set((state) => ({
      complaints: [newComplaint, ...state.complaints],
    }));
    return newComplaint.id;
  },

  getStats: () => {
    const complaints = get().complaints;
    const userComplaints = complaints.filter(c => c.userId === 'u001');
    return {
      total: userComplaints.length,
      pending: userComplaints.filter(c => c.status === 'pending').length,
      inProgress: userComplaints.filter(c => c.status === 'in_progress' || c.status === 'assigned').length,
      resolved: userComplaints.filter(c => c.status === 'resolved').length,
      rejected: userComplaints.filter(c => c.status === 'rejected').length,
    };
  },
}));

export default useComplaintStore;
