# Nigraani — Civic Issue Reporting App

A mobile-first React web application for reporting and tracking civic infrastructure issues in Pune, India. Citizens can report problems like road damage, street light outages, garbage accumulation, water supply issues, and more — directly to the municipal corporation.

## Tech Stack

| Layer | Technology |
|-------|-------------|
| UI Framework | React 19 |
| Build Tool | Vite 8 |
| Router | React Router DOM 7 |
| State Management | Zustand 5 |
| Maps | Leaflet + React Leaflet |
| Forms | React Hook Form 7 |
| Styling | CSS (CSS Variables) |

## Project Structure

```
nigraani-app/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Layout/          # Header, BottomNav
│   │   ├── CategoryIcon.jsx
│   │   ├── ComplaintCard.jsx
│   │   ├── PhotoCarousel.jsx
│   │   ├── SeverityBadge.jsx
│   │   ├── StatCard.jsx
│   │   ├── StatusBadge.jsx
│   │   ├── StepIndicator.jsx
│   │   └── Timeline.jsx
│   ├── pages/              # Route pages
│   │   ├── Auth.jsx        # Login / Register
│   │   ├── Dashboard.jsx   # Home with stats & quick report
│   │   ├── MapView.jsx      # Leaflet map of complaints
│   │   ├── MyComplaints.jsx
│   │   ├── ComplaintDetail.jsx
│   │   ├── Notifications.jsx
│   │   ├── Onboarding.jsx
│   │   ├── Profile.jsx
│   │   ├── ReportIssue.jsx   # Multi-step complaint form
│   │   ├── Splash.jsx
│   ├── store/              # Zustand stores
│   │   ├── appStore.js     # UI state (tabs, notifications)
│   │   ├── authStore.js   # User auth & profile
│   │   └── complaintStore.js # Complaints CRUD
│   ├── data/
│   │   └── mockData.js    # Mock categories, users, complaints
│   ├── assets/            # Images
│   ├── App.jsx           # Router config
│   ├── main.jsx           # Entry point
│   └── index.css         # Global styles & CSS vars
├── index.html
├── vite.config.js
└── package.json
```

## Features

- **User Authentication** — Login/register with phone, profile persisted to localStorage
- **Dashboard** — Greeting, user stats, quick report categories, city overview
- **Report Issue** — 3-step form: photo capture → details → review, auto-classifies severity
- **Map View** — Leaflet map showing complaint locations with markers
- **My Complaints** — Filterable list (all/pending/in_progress/resolved)
- **Complaint Detail** — Full complaint info, timeline, photo carousel
- **Notifications** — In-app notification center
- **Profile** — User details, ward info, stats
- **Onboarding** — First-launch welcome flow

## Complaint Categories

| Category | Department |
|----------|------------|
| Road Damage | Roads & Infrastructure |
| Street Light | Electrical Department |
| Garbage | Solid Waste Management |
| Water Supply | Water Supply Department |
| Drainage | Drainage Department |
| Traffic Signal | Traffic Department |
| Noise Pollution | Environment Department |
| Other | General Administration |

## Severity Levels

- **Critical** — Life safety risk (cave-in, electrocution hazard, etc.)
- **High** — Significant infrastructure failure
- **Medium** — Quality of life impact
- **Low** — Minor cosmetic issue

## Status Flow

`pending` → `assigned` → `in_progress` → `resolved`  
(or `rejected` at any stage)

## Running Locally

```bash
cd nigraani-app
npm install
npm run dev
```

Open `http://localhost:5173` in browser (or on mobile via local network).

## Building for Production

```bash
npm run build
```

Output in `dist/`.

## Data

The app uses mock data seeded in `src/data/mockData.js`:
- 15 Pune ward locations with lat/lng
- 12 sample complaints across all categories
- 3 mock contractors
- Mock user `Priya Sharma` (u001)

No backend — all data stored in memory (Zustand) and localStorage.

## Key Dependencies

```json
{
  "leaflet": "^1.9.4",
  "react": "^19.2.4",
  "react-dom": "^19.2.4",
  "react-hook-form": "^7.72.1",
  "react-leaflet": "^5.0.0",
  "react-router-dom": "^7.14.1",
  "zustand": "^5.0.12"
}
```