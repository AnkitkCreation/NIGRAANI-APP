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

  getUserComplaints: (userId) => {
    if (!userId) return [];
    return get().complaints.filter(c => c.userId === userId);
  },

  getComplaintById: (id) => {
    return get().complaints.find(c => c.id === id);
  },

  addComplaint: (complaintData, userId) => {
    const newComplaint = {
      ...complaintData,
      id: generateComplaintId(),
      userId: userId || 'unknown',
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

  toggleUpvote: (complaintId, userId) => {
    if (!userId) return;
    set((state) => ({
      complaints: state.complaints.map(c => {
        if (c.id !== complaintId) return c;
        
        const alreadyUpvoted = c.upvotedBy?.includes(userId);
        const newUpvotedBy = alreadyUpvoted 
          ? c.upvotedBy.filter(id => id !== userId)
          : [...(c.upvotedBy || []), userId];
        
        return {
          ...c,
          upvotes: (c.upvotes || 0) + (alreadyUpvoted ? -1 : 1),
          upvotedBy: newUpvotedBy
        };
      })
    }));
  },

  getStats: (userId) => {
    const complaints = get().complaints;
    const userComplaints = userId ? complaints.filter(c => c.userId === userId) : [];
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
