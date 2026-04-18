// ========================================
// NIGRANI — Mock Data
// ========================================

export const CATEGORIES = [
  { key: 'road_damage', label: 'Road Damage', icon: 'fa-road', department: 'Roads & Infrastructure', color: '#E65100' },
  { key: 'street_light', label: 'Street Light', icon: 'fa-lightbulb', department: 'Electrical Department', color: '#F57F17' },
  { key: 'garbage', label: 'Garbage', icon: 'fa-trash', department: 'Solid Waste Management', color: '#2E7D32' },
  { key: 'water_supply', label: 'Water Supply', icon: 'fa-droplet', department: 'Water Supply Department', color: '#0277BD' },
  { key: 'drainage', label: 'Drainage', icon: 'fa-water', department: 'Drainage Department', color: '#6A1B9A' },
  { key: 'traffic_signal', label: 'Traffic Signal', icon: 'fa-traffic-light', department: 'Traffic Department', color: '#C62828' },
  { key: 'noise', label: 'Noise Pollution', icon: 'fa-volume-high', department: 'Environment Department', color: '#4E342E' },
  { key: 'other', label: 'Other', icon: 'fa-circle-exclamation', department: 'General Administration', color: '#78909C' },
];

export const SEVERITY_LEVELS = [
  { key: 'critical', label: 'Critical', bg: '#FFEBEE', color: '#C62828', icon: 'fa-circle-exclamation' },
  { key: 'high', label: 'High', bg: '#FFF3E0', color: '#E65100', icon: 'fa-triangle-exclamation' },
  { key: 'medium', label: 'Medium', bg: '#FFF8E1', color: '#F57F17', icon: 'fa-circle-info' },
  { key: 'low', label: 'Low', bg: '#E8F5E9', color: '#2E7D32', icon: 'fa-circle-check' },
];

export const STATUS_LIST = [
  { key: 'pending', label: 'Pending', color: '#78909C', icon: 'fa-clock' },
  { key: 'assigned', label: 'Assigned', color: '#0277BD', icon: 'fa-user-check' },
  { key: 'in_progress', label: 'In Progress', color: '#F57F17', icon: 'fa-spinner' },
  { key: 'resolved', label: 'Resolved', color: '#2E7D32', icon: 'fa-circle-check' },
  { key: 'rejected', label: 'Rejected', color: '#C62828', icon: 'fa-circle-xmark' },
];

export const MOCK_USER = {
  id: 'u001',
  name: 'Priya Sharma',
  phone: '+919876543210',
  email: 'priya.sharma@email.com',
  ward: 'Ward 15 — Kothrud',
  avatar: null,
  role: 'citizen',
  totalReports: 12,
  resolved: 7,
  pending: 5,
};

export const MOCK_CONTRACTORS = [
  { id: 'c001', name: 'Rajiv Patel', agency: 'Patel Road Solutions Pvt Ltd', phone: '+919812345678', department: 'Roads & Infrastructure', rating: 4.2, avgDays: 8 },
  { id: 'c002', name: 'Sunita Kamble', agency: 'Green City Sanitation Co.', phone: '+919887654321', department: 'Solid Waste Management', rating: 3.8, avgDays: 5 },
  { id: 'c003', name: 'Arun Deshmukh', agency: 'BrightLight Electricals', phone: '+919765432198', department: 'Electrical Department', rating: 4.5, avgDays: 3 },
];

const PUNE_LOCATIONS = [
  { lat: 18.5204, lng: 73.8567, address: 'Near Shivaji Nagar Bus Stand, Pune 411005', ward: 'Ward 15 — Kothrud' },
  { lat: 18.5074, lng: 73.8077, address: 'FC Road, Opposite Vaishali Restaurant, Pune 411004', ward: 'Ward 14 — Deccan' },
  { lat: 18.5314, lng: 73.8446, address: 'JM Road, Near Sambhaji Park, Pune 411005', ward: 'Ward 15 — Kothrud' },
  { lat: 18.4897, lng: 73.8287, address: 'Sinhagad Road, Near Dhanashree Society, Pune 411041', ward: 'Ward 42 — Sinhagad Road' },
  { lat: 18.5590, lng: 73.7868, address: 'Aundh Road, Near Bremen, Pune 411007', ward: 'Ward 8 — Aundh' },
  { lat: 18.5362, lng: 73.8960, address: 'Koregaon Park, Lane 5, Pune 411001', ward: 'Ward 19 — Koregaon Park' },
  { lat: 18.4690, lng: 73.8585, address: 'Katraj, Near Snake Park, Pune 411046', ward: 'Ward 40 — Katraj' },
  { lat: 18.5616, lng: 73.9150, address: 'Viman Nagar, Opposite Phoenix Mall, Pune 411014', ward: 'Ward 20 — Viman Nagar' },
  { lat: 18.5119, lng: 73.8723, address: 'MG Road, Near PMC Building, Pune 411001', ward: 'Ward 16 — Shivaji Nagar' },
  { lat: 18.5449, lng: 73.8288, address: 'Prabhat Road, Near Cafe Goodluck, Pune 411004', ward: 'Ward 14 — Deccan' },
  { lat: 18.4820, lng: 73.8565, address: 'Sahakarnagar, Near Bharati Vidyapeeth, Pune 411043', ward: 'Ward 38 — Sahakarnagar' },
  { lat: 18.5726, lng: 73.9120, address: 'Kharadi, Near EON IT Park, Pune 411014', ward: 'Ward 22 — Kharadi' },
  { lat: 18.5082, lng: 73.8300, address: 'Karve Road, Near Nalstop, Pune 411004', ward: 'Ward 14 — Deccan' },
  { lat: 18.5502, lng: 73.8986, address: 'Kalyani Nagar, Near Aga Khan Palace, Pune 411006', ward: 'Ward 19 — Koregaon Park' },
  { lat: 18.5296, lng: 73.8527, address: 'Model Colony, Lane 3, Pune 411016', ward: 'Ward 15 — Kothrud' },
];

// Sample complaint photos (using placeholder colors/gradients rendered as data URIs would be complex,
// so we'll use a simple system for demo)
const COMPLAINT_PHOTOS = [
  'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1591768793355-74d04bb6608f?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=400&h=300&fit=crop',
];

export const MOCK_COMPLAINTS = [
  {
    id: 'NIG-2025-00847',
    userId: 'u001',
    category: 'road_damage',
    title: 'Massive pothole on Karve Road near Nalstop',
    description: 'A very large pothole has formed near Nalstop junction on Karve Road. Multiple two-wheelers have skidded here. The pothole is approximately 3 feet wide and 1 foot deep. Extremely dangerous during night time and rainy season.',
    photos: [COMPLAINT_PHOTOS[0], COMPLAINT_PHOTOS[1]],
    location: { type: 'Point', coordinates: [73.8300, 18.5082] },
    address: PUNE_LOCATIONS[12].address,
    ward: 'Ward 14 — Deccan',
    severity: 'critical',
    severityConfidence: 0.92,
    status: 'in_progress',
    createdAt: '2025-06-10T08:30:00Z',
    updatedAt: '2025-06-12T14:20:00Z',
    assignedOfficer: 'Rajesh Deshmukh',
    assignment: {
      contractorId: 'c001',
      contractorName: 'Patel Road Solutions Pvt Ltd',
      tenderId: 'TND-2025-00193',
      budget: 45000,
      approvingAuthority: 'Dr. Meera Jadhav — Municipal Commissioner',
      expectedCompletion: '2025-06-15T00:00:00Z',
    },
    timeline: [
      { status: 'pending', date: '2025-06-10T08:30:00Z', note: 'Complaint registered by citizen', actor: 'Priya Sharma' },
      { status: 'assigned', date: '2025-06-10T11:45:00Z', note: 'Assigned to Roads Department', actor: 'System' },
      { status: 'in_progress', date: '2025-06-12T14:20:00Z', note: 'Contractor dispatched, repair work initiated', actor: 'Rajesh Deshmukh' },
    ],
  },
  {
    id: 'NIG-2025-00832',
    userId: 'u001',
    category: 'street_light',
    title: 'Multiple street lights out on FC Road stretch',
    description: 'At least 5 consecutive street lights are not working on FC Road between Good Luck Cafe and Vaishali. The entire stretch is dangerously dark after 7 PM. This has been going on for over a week.',
    photos: [COMPLAINT_PHOTOS[3]],
    location: { type: 'Point', coordinates: [73.8077, 18.5074] },
    address: PUNE_LOCATIONS[1].address,
    ward: 'Ward 14 — Deccan',
    severity: 'high',
    severityConfidence: 0.88,
    status: 'assigned',
    createdAt: '2025-06-08T19:15:00Z',
    updatedAt: '2025-06-09T10:00:00Z',
    assignedOfficer: 'Rajesh Deshmukh',
    assignment: {
      contractorId: 'c003',
      contractorName: 'BrightLight Electricals',
      tenderId: 'TND-2025-00188',
      budget: 22000,
      approvingAuthority: 'Sub-Divisional Officer — Electrical',
      expectedCompletion: '2025-06-12T00:00:00Z',
    },
    timeline: [
      { status: 'pending', date: '2025-06-08T19:15:00Z', note: 'Complaint registered', actor: 'Priya Sharma' },
      { status: 'assigned', date: '2025-06-09T10:00:00Z', note: 'Assigned to Electrical Department', actor: 'System' },
    ],
  },
  {
    id: 'NIG-2025-00815',
    userId: 'u001',
    category: 'garbage',
    title: 'Garbage pile blocking footpath near Aga Khan Palace',
    description: 'A massive garbage pile has accumulated near the Aga Khan Palace entrance. It is blocking the footpath and creating a terrible stench. Stray animals are rummaging through it.',
    photos: [COMPLAINT_PHOTOS[4]],
    location: { type: 'Point', coordinates: [73.8986, 18.5502] },
    address: PUNE_LOCATIONS[13].address,
    ward: 'Ward 19 — Koregaon Park',
    severity: 'high',
    severityConfidence: 0.85,
    status: 'resolved',
    createdAt: '2025-06-05T07:00:00Z',
    updatedAt: '2025-06-08T16:30:00Z',
    assignedOfficer: 'Anjali Patil',
    assignment: {
      contractorId: 'c002',
      contractorName: 'Green City Sanitation Co.',
      tenderId: 'TND-2025-00175',
      budget: 8000,
      approvingAuthority: 'Ward Officer — KP Ward',
      expectedCompletion: '2025-06-07T00:00:00Z',
    },
    timeline: [
      { status: 'pending', date: '2025-06-05T07:00:00Z', note: 'Complaint registered', actor: 'Priya Sharma' },
      { status: 'assigned', date: '2025-06-05T09:30:00Z', note: 'Assigned to SWM department', actor: 'System' },
      { status: 'in_progress', date: '2025-06-06T08:00:00Z', note: 'Sanitation team dispatched', actor: 'Anjali Patil' },
      { status: 'resolved', date: '2025-06-08T16:30:00Z', note: 'Area cleaned and sanitized. Garbage collected.', actor: 'Green City Sanitation Co.' },
    ],
  },
  {
    id: 'NIG-2025-00798',
    userId: 'u001',
    category: 'water_supply',
    title: 'No water supply for 3 days in Sahakarnagar',
    description: 'Our entire lane in Sahakarnagar has not received water supply for the past 3 days. Multiple families are affected. We have been calling the ward office but no response.',
    photos: [COMPLAINT_PHOTOS[5]],
    location: { type: 'Point', coordinates: [73.8565, 18.4820] },
    address: PUNE_LOCATIONS[10].address,
    ward: 'Ward 38 — Sahakarnagar',
    severity: 'critical',
    severityConfidence: 0.90,
    status: 'pending',
    createdAt: '2025-06-12T06:45:00Z',
    updatedAt: '2025-06-12T06:45:00Z',
    timeline: [
      { status: 'pending', date: '2025-06-12T06:45:00Z', note: 'Complaint registered', actor: 'Priya Sharma' },
    ],
  },
  {
    id: 'NIG-2025-00780',
    userId: 'u002',
    category: 'drainage',
    title: 'Overflowing drain on Sinhagad Road',
    description: 'The main drain near Dhanashree Society on Sinhagad Road is overflowing. Sewage water is flowing onto the road creating a health hazard.',
    photos: [COMPLAINT_PHOTOS[2]],
    location: { type: 'Point', coordinates: [73.8287, 18.4897] },
    address: PUNE_LOCATIONS[3].address,
    ward: 'Ward 42 — Sinhagad Road',
    severity: 'high',
    severityConfidence: 0.87,
    status: 'in_progress',
    createdAt: '2025-06-03T09:20:00Z',
    updatedAt: '2025-06-05T11:00:00Z',
    timeline: [
      { status: 'pending', date: '2025-06-03T09:20:00Z', note: 'Complaint registered', actor: 'Amit Joshi' },
      { status: 'assigned', date: '2025-06-03T15:00:00Z', note: 'Assigned to Drainage Dept', actor: 'System' },
      { status: 'in_progress', date: '2025-06-05T11:00:00Z', note: 'Repair crew on site', actor: 'Rajesh Deshmukh' },
    ],
  },
  {
    id: 'NIG-2025-00762',
    userId: 'u001',
    category: 'road_damage',
    title: 'Road caved in near Model Colony Lane 3',
    description: 'A section of the road has caved in near Lane 3 in Model Colony. The cavity is about 2 feet deep. Vehicles cannot pass. Very dangerous for pedestrians.',
    photos: [COMPLAINT_PHOTOS[0], COMPLAINT_PHOTOS[2]],
    location: { type: 'Point', coordinates: [73.8527, 18.5296] },
    address: PUNE_LOCATIONS[14].address,
    ward: 'Ward 15 — Kothrud',
    severity: 'critical',
    severityConfidence: 0.95,
    status: 'resolved',
    createdAt: '2025-05-28T10:00:00Z',
    updatedAt: '2025-06-04T09:00:00Z',
    assignedOfficer: 'Rajesh Deshmukh',
    assignment: {
      contractorId: 'c001',
      contractorName: 'Patel Road Solutions Pvt Ltd',
      tenderId: 'TND-2025-00152',
      budget: 125000,
      approvingAuthority: 'Dr. Meera Jadhav — Municipal Commissioner',
      expectedCompletion: '2025-06-05T00:00:00Z',
    },
    timeline: [
      { status: 'pending', date: '2025-05-28T10:00:00Z', note: 'Complaint registered', actor: 'Priya Sharma' },
      { status: 'assigned', date: '2025-05-28T12:00:00Z', note: 'URGENT — Assigned to Roads Dept', actor: 'System' },
      { status: 'in_progress', date: '2025-05-29T07:00:00Z', note: 'Emergency repair crew deployed', actor: 'Rajesh Deshmukh' },
      { status: 'resolved', date: '2025-06-04T09:00:00Z', note: 'Road fully repaired and resurfaced', actor: 'Patel Road Solutions' },
    ],
  },
  {
    id: 'NIG-2025-00745',
    userId: 'u003',
    category: 'traffic_signal',
    title: 'Traffic signal not working at Aundh junction',
    description: 'The traffic signal at Aundh main junction has been blinking yellow for 2 days. This is a very busy intersection and accidents are waiting to happen.',
    photos: [COMPLAINT_PHOTOS[3]],
    location: { type: 'Point', coordinates: [73.7868, 18.5590] },
    address: PUNE_LOCATIONS[4].address,
    ward: 'Ward 8 — Aundh',
    severity: 'high',
    severityConfidence: 0.82,
    status: 'pending',
    createdAt: '2025-06-11T17:30:00Z',
    updatedAt: '2025-06-11T17:30:00Z',
    timeline: [
      { status: 'pending', date: '2025-06-11T17:30:00Z', note: 'Complaint registered', actor: 'Suresh Kulkarni' },
    ],
  },
  {
    id: 'NIG-2025-00730',
    userId: 'u001',
    category: 'garbage',
    title: 'Garbage bins overflowing at Kothrud bus stop',
    description: 'The garbage bins at Kothrud bus stop have not been emptied for days. Trash is piling up around the bins and the area smells terrible.',
    photos: [COMPLAINT_PHOTOS[4]],
    location: { type: 'Point', coordinates: [73.8446, 18.5314] },
    address: PUNE_LOCATIONS[2].address,
    ward: 'Ward 15 — Kothrud',
    severity: 'medium',
    severityConfidence: 0.79,
    status: 'resolved',
    createdAt: '2025-05-25T06:30:00Z',
    updatedAt: '2025-05-27T14:00:00Z',
    assignment: {
      contractorId: 'c002',
      contractorName: 'Green City Sanitation Co.',
      tenderId: 'TND-2025-00140',
      budget: 5000,
      approvingAuthority: 'Ward Officer — Kothrud',
      expectedCompletion: '2025-05-27T00:00:00Z',
    },
    timeline: [
      { status: 'pending', date: '2025-05-25T06:30:00Z', note: 'Complaint registered', actor: 'Priya Sharma' },
      { status: 'assigned', date: '2025-05-25T09:00:00Z', note: 'Assigned to SWM', actor: 'System' },
      { status: 'in_progress', date: '2025-05-26T07:00:00Z', note: 'Cleanup crew dispatched', actor: 'Anjali Patil' },
      { status: 'resolved', date: '2025-05-27T14:00:00Z', note: 'Bins cleaned and waste collected', actor: 'Green City Sanitation Co.' },
    ],
  },
  {
    id: 'NIG-2025-00710',
    userId: 'u002',
    category: 'street_light',
    title: 'Broken street light pole leaning dangerously',
    description: 'A street light pole on Koregaon Park Lane 5 is broken at the base and leaning at a 45 degree angle. It could fall at any time. Very dangerous.',
    photos: [COMPLAINT_PHOTOS[5]],
    location: { type: 'Point', coordinates: [73.8960, 18.5362] },
    address: PUNE_LOCATIONS[5].address,
    ward: 'Ward 19 — Koregaon Park',
    severity: 'critical',
    severityConfidence: 0.93,
    status: 'assigned',
    createdAt: '2025-06-11T22:00:00Z',
    updatedAt: '2025-06-12T08:30:00Z',
    timeline: [
      { status: 'pending', date: '2025-06-11T22:00:00Z', note: 'Complaint registered', actor: 'Amit Joshi' },
      { status: 'assigned', date: '2025-06-12T08:30:00Z', note: 'URGENT — Assigned to Electrical Dept', actor: 'System' },
    ],
  },
  {
    id: 'NIG-2025-00695',
    userId: 'u001',
    category: 'road_damage',
    title: 'Faded zebra crossing markings near Sambhaji Park',
    description: 'The zebra crossing markings near Sambhaji Park on JM Road have completely faded. Pedestrians have difficulty crossing safely.',
    photos: [COMPLAINT_PHOTOS[1]],
    location: { type: 'Point', coordinates: [73.8446, 18.5314] },
    address: PUNE_LOCATIONS[2].address,
    ward: 'Ward 15 — Kothrud',
    severity: 'low',
    severityConfidence: 0.88,
    status: 'pending',
    createdAt: '2025-06-09T12:00:00Z',
    updatedAt: '2025-06-09T12:00:00Z',
    timeline: [
      { status: 'pending', date: '2025-06-09T12:00:00Z', note: 'Complaint registered', actor: 'Priya Sharma' },
    ],
  },
  {
    id: 'NIG-2025-00680',
    userId: 'u003',
    category: 'water_supply',
    title: 'Water pipeline leak at Viman Nagar',
    description: 'There is a significant water pipeline leak near Phoenix Mall in Viman Nagar. Clean water is being wasted and the road is getting flooded.',
    photos: [COMPLAINT_PHOTOS[2]],
    location: { type: 'Point', coordinates: [73.9150, 18.5616] },
    address: PUNE_LOCATIONS[7].address,
    ward: 'Ward 20 — Viman Nagar',
    severity: 'medium',
    severityConfidence: 0.76,
    status: 'in_progress',
    createdAt: '2025-06-06T14:00:00Z',
    updatedAt: '2025-06-08T09:00:00Z',
    timeline: [
      { status: 'pending', date: '2025-06-06T14:00:00Z', note: 'Complaint registered', actor: 'Suresh Kulkarni' },
      { status: 'assigned', date: '2025-06-06T16:30:00Z', note: 'Assigned to Water Supply Dept', actor: 'System' },
      { status: 'in_progress', date: '2025-06-08T09:00:00Z', note: 'Plumbing team on location', actor: 'Rajesh Deshmukh' },
    ],
  },
  {
    id: 'NIG-2025-00665',
    userId: 'u001',
    category: 'noise',
    title: 'Loud construction noise at night in Kharadi',
    description: 'Construction site near EON IT Park in Kharadi is operating heavy machinery well past 10 PM every night. This is in violation of noise regulations.',
    photos: [COMPLAINT_PHOTOS[5]],
    location: { type: 'Point', coordinates: [73.9120, 18.5726] },
    address: PUNE_LOCATIONS[11].address,
    ward: 'Ward 22 — Kharadi',
    severity: 'medium',
    severityConfidence: 0.71,
    status: 'rejected',
    createdAt: '2025-06-01T23:30:00Z',
    updatedAt: '2025-06-03T10:00:00Z',
    timeline: [
      { status: 'pending', date: '2025-06-01T23:30:00Z', note: 'Complaint registered', actor: 'Priya Sharma' },
      { status: 'rejected', date: '2025-06-03T10:00:00Z', note: 'Construction has valid night-work permit until June 15. Issue is within permissible limits.', actor: 'Env. Dept Officer' },
    ],
  },
];

export const MOCK_NOTIFICATIONS = [
  { id: 'n001', userId: 'u001', type: 'status_update', title: 'Complaint Updated', message: 'Your complaint NIG-2025-00847 status changed to In Progress', time: '2 hours ago', read: false, complaintId: 'NIG-2025-00847' },
  { id: 'n002', userId: 'u001', type: 'assigned', title: 'Contractor Assigned', message: 'Patel Road Solutions assigned to your complaint NIG-2025-00847', time: '4 hours ago', read: false, complaintId: 'NIG-2025-00847' },
  { id: 'n003', userId: 'u001', type: 'resolved', title: 'Issue Resolved! 🎉', message: 'Your complaint NIG-2025-00815 (Garbage pile) has been resolved', time: '1 day ago', read: true, complaintId: 'NIG-2025-00815' },
  { id: 'n004', userId: 'u001', type: 'resolved', title: 'Issue Resolved! 🎉', message: 'Road cave-in near Model Colony has been fixed — NIG-2025-00762', time: '3 days ago', read: true, complaintId: 'NIG-2025-00762' },
  { id: 'n005', userId: 'u001', type: 'status_update', title: 'Complaint Updated', message: 'Your complaint NIG-2025-00730 status changed to Resolved', time: '5 days ago', read: true, complaintId: 'NIG-2025-00730' },
  { id: 'n006', userId: 'u001', type: 'rejected', title: 'Complaint Rejected', message: 'Your complaint NIG-2025-00665 was rejected — night-work permit valid', time: '1 week ago', read: true, complaintId: 'NIG-2025-00665' },
];

export const CITY_STATS = {
  totalComplaints: 2847,
  resolvedToday: 12,
  activeComplaints: 438,
  resolutionRate: 68,
  avgResolutionDays: 19,
  totalBudgetUtilized: 12500000,
  contractorsActive: 24,
};

// Helper to get category info
export function getCategoryInfo(key) {
  return CATEGORIES.find(c => c.key === key) || CATEGORIES[CATEGORIES.length - 1];
}

// Helper to get severity info
export function getSeverityInfo(key) {
  return SEVERITY_LEVELS.find(s => s.key === key) || SEVERITY_LEVELS[2];
}

// Helper to get status info
export function getStatusInfo(key) {
  return STATUS_LIST.find(s => s.key === key) || STATUS_LIST[0];
}

// Generate complaint ID
let complaintCounter = 848;
export function generateComplaintId() {
  const id = `NIG-2025-${String(complaintCounter).padStart(5, '0')}`;
  complaintCounter++;
  return id;
}

// Format date
export function formatDate(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function formatFullDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
