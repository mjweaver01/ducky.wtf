import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Activity, Key, Globe, Settings, LogOut } from 'lucide-react';
import DuckIcon from '../components/DuckIcon';
import { authAPI, userAPI, type User } from '../api';
import TokensTab from '../components/TokensTab';
import TunnelsTab from '../components/TunnelsTab';
import DomainsTab from '../components/DomainsTab';
import SettingsTab from '../components/SettingsTab';
import './DashboardPage.css';

const DashboardPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await userAPI.getProfile();
      setUser(userData);
    } catch (error) {
      console.error('Failed to load user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authAPI.clearToken();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <DuckIcon size={28} className="logo-icon" />
            <span className="logo-text">ducky</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <Link to="/dashboard" className="nav-item">
            <Activity size={20} className="nav-icon" />
            Tunnels
          </Link>
          <Link to="/dashboard/tokens" className="nav-item">
            <Key size={20} className="nav-icon" />
            Auth Tokens
          </Link>
          <Link to="/dashboard/domains" className="nav-item">
            <Globe size={20} className="nav-icon" />
            Custom Domains
          </Link>
          <Link to="/dashboard/settings" className="nav-item">
            <Settings size={20} className="nav-icon" />
            Settings
          </Link>
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">{user?.email?.[0].toUpperCase()}</div>
            <div className="user-details">
              <div className="user-name">{user?.fullName || 'User'}</div>
              <div className="user-email">{user?.email}</div>
            </div>
          </div>
          <button onClick={handleLogout} className="btn btn-secondary btn-sm">
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<TunnelsTab />} />
          <Route path="/tokens" element={<TokensTab />} />
          <Route path="/domains" element={<DomainsTab />} />
          <Route path="/settings" element={<SettingsTab user={user} onUpdate={loadUser} />} />
        </Routes>
      </main>
    </div>
  );
};

export default DashboardPage;
