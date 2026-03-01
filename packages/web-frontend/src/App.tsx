import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { authAPI } from './api';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import PricingPage from './pages/PricingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import TermsPage from './pages/TermsPage';
import DocsPage from './pages/DocsPage';

interface ProtectedRouteProps {
  element: React.ReactNode;
}

/** Protects authenticated routes: redirects to /login when not logged in. Use as the route element. */
const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const isAuthenticated = authAPI.isAuthenticated();
  return isAuthenticated ? <>{element}</> : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        {/* Marketing */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/terms" element={<TermsPage />} />

        {/* Docs — wildcard so nested routes work */}
        <Route path="/docs/*" element={<DocsPage />} />

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* App — protected routes: auth logic lives inside ProtectedRoute */}
        <Route
          path="/dashboard/*"
          element={<ProtectedRoute element={<DashboardPage />} />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
