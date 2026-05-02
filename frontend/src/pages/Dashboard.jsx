import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar/Sidebar';
import './Dashboard.css';

const Dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const { user } = useSelector((state) => state.auth || {});

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    if (newTheme) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleLogout = () => {
    // Dispatch de l'action de déconnexion (à adapter selon votre store)
    // dispatch(logout());
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event.target.closest('.user-menu')) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isUserMenuOpen]);

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('profile')) return 'Profil';
    if (path.includes('add-job')) return 'Ajouter un Job';
    if (path.includes('all-jobs')) return 'Tous les Jobs';
    if (path.includes('stats')) return 'Statistiques';
    return 'Dashboard';
  };

  const getUserInitials = () => {
    if (user?.name) {
      return user.name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    return 'JD'; 
  };

  return (
    <div className="dashboard">
      <Sidebar />
      
      <div className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-left">
            <button 
              className="mobile-menu-btn"
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            >
              ☰
            </button>
            
            <h1 className="dashboard-title">{getPageTitle()}</h1>
            <span className="breadcrumb">Dashboard / {getPageTitle()}</span>
          </div>

          <div className="header-right">
            <div className="notification-badge">
              <button className="notification-btn" title="Notifications">
                🔔
                <span className="badge-count">3</span>
              </button>
            </div>

            <button 
              className="theme-toggle" 
              onClick={toggleTheme}
              title={isDarkMode ? 'Mode clair' : 'Mode sombre'}
            >
              <div className="theme-toggle-slider">
                {isDarkMode ? '🌙' : '☀️'}
              </div>
            </button>

            <div className={`user-menu ${isUserMenuOpen ? 'open' : ''}`}>
              <button 
                className="user-profile-btn"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <div className="user-avatar-small">
                  {getUserInitials()}
                </div>
                <span className="user-name">{user?.name || 'John Doe'}</span>
                <span className="dropdown-arrow">▼</span>
              </button>

              <div className="user-dropdown">
                <div className="dropdown-header">
                  <div className="dropdown-user-info">
                    <h4>{user?.name || 'John Doe'}</h4>
                    <p>{user?.email || 'john.doe@example.com'}</p>
                  </div>
                </div>
                
                <div className="dropdown-menu">
                  <a 
                    href="/dashboard/profile" 
                    className="dropdown-item"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    👤 Mon Profil
                  </a>
                  <a 
                    href="/dashboard/settings" 
                    className="dropdown-item"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    ⚙️ Paramètres
                  </a>
                  <a 
                    href="#" 
                    className="dropdown-item"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    💡 Aide
                  </a>
                  <button 
                    className="dropdown-item logout"
                    onClick={handleLogout}
                  >
                    🚪 Déconnexion
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;