import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Layout/Header';
import BottomNav from './components/Layout/BottomNav';
import Splash from './pages/Splash';
import Onboarding from './pages/Onboarding';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import MapView from './pages/MapView';
import ReportIssue from './pages/ReportIssue';
import MyComplaints from './pages/MyComplaints';
import ComplaintDetail from './pages/ComplaintDetail';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import EditProfile from './pages/EditProfile';
import SettingsDetail from './pages/SettingsDetail';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/splash" element={<Splash />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/home" element={<Dashboard />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/report" element={<ReportIssue />} />
            <Route path="/complaints" element={<MyComplaints />} />
            <Route path="/complaint/:id" element={<ComplaintDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/settings/:type" element={<SettingsDetail />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}
