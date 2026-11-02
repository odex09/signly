import React, { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/auth/AuthPage';
import SignRoomPage from './pages/sign/SignRoomPage';
import Sidebar from './components/dashboard/Sidebar';
import Header from './components/dashboard/Header';

import DashboardHome from './pages/dashboard/DashboardHome';
import DocumentsPage from './pages/dashboard/DocumentsPage';
import TemplatesPage from './pages/dashboard/TemplatesPage';
import ReportsPage from './pages/dashboard/ReportsPage';
import ProfilePage from './pages/dashboard/ProfilePage';
import SettingsPage from './pages/dashboard/SettingsPage';
import BillingPage from './pages/dashboard/BillingPage';
import AdminUsersPage from './pages/dashboard/AdminUsersPage';
import AdminSubscriptionsPage from './pages/dashboard/AdminSubscriptionsPage';
import AdminPlanConfigPage from './pages/dashboard/AdminPlanConfigPage';


const APP_PAGES = [
  'dashboard',
  'documents',
  'templates',
  'reports',
  'profile',
  'settings',
  'billing',
  'admin-users',
  'admin-subscriptions',
  'admin-plans',
];

function AppInner() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (['landing', 'auth', 'sign', ...APP_PAGES].includes(hash)) {
        setCurrentPage(hash);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigate = (page) => {
    if (page === 'logout') {
      setCurrentPage('landing');
      window.location.hash = 'landing';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isDashboardApp = APP_PAGES.includes(currentPage);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased selection:bg-emerald-500 selection:text-white">
      {currentPage === 'landing' && <LandingPage onNavigate={navigate} />}
      {currentPage === 'auth' && <AuthPage onNavigate={navigate} />}
      {currentPage === 'sign' && <SignRoomPage onNavigate={navigate} />}

      {isDashboardApp && (
        <div className="min-h-screen flex flex-col">
          <Sidebar
            currentPage={currentPage}
            onNavigate={navigate}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
          <div className="lg:pl-[260px] min-h-screen flex flex-col">
            <Header
              onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
              onNavigate={navigate}
            />
            <main className="flex-1">
              {currentPage === 'dashboard' && <DashboardHome onNavigate={navigate} />}
              {currentPage === 'documents' && <DocumentsPage onNavigate={navigate} />}
              {currentPage === 'templates' && <TemplatesPage onNavigate={navigate} />}
              {currentPage === 'reports' && <ReportsPage onNavigate={navigate} />}
              {currentPage === 'profile' && <ProfilePage onNavigate={navigate} />}
              {currentPage === 'settings' && <SettingsPage onNavigate={navigate} />}
              {currentPage === 'billing' && <BillingPage onNavigate={navigate} />}
              {currentPage === 'admin-users' && <AdminUsersPage onNavigate={navigate} />}
              {currentPage === 'admin-subscriptions' && <AdminSubscriptionsPage onNavigate={navigate} />}
              {currentPage === 'admin-plans' && <AdminPlanConfigPage onNavigate={navigate} />}
            </main>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}