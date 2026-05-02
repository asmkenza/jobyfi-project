import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';





const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  
  const isActiveLink = (path) => {
    return location.pathname === path;
  };

 
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Bouton toggle pour mobile */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* En-tête de la sidebar */}
        <div className="sidebar-header">
          <h2 className="sidebar-logo">JobTracker</h2>
          <p className="sidebar-subtitle">Gestion de candidatures</p>
        </div>

        {/* Navigation principale */}
        <nav>
          <ul>
            <li>
              <Link 
                to="/dashboard/profile" 
                className={`nav-profile ${isActiveLink('/dashboard/profile') ? 'active' : ''}`}
                onClick={() => setIsOpen(false)} // Ferme la sidebar sur mobile après clic
              >
                Profil
              </Link>
            </li>
            <li>
              <Link 
                to="/dashboard/add-job" 
                className={`nav-add-job ${isActiveLink('/dashboard/add-job') ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                Ajouter un Job
              </Link>
            </li>
            <li>
              <Link 
                to="/dashboard/all-jobs" 
                className={`nav-all-jobs ${isActiveLink('/dashboard/all-jobs') ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                Tous les Jobs
              </Link>
            </li>
            <li>
              <Link 
                to="/dashboard/stats" 
                className={`nav-stats ${isActiveLink('/dashboard/stats') ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                Statistiques
              </Link>
            </li>
          </ul>
        </nav>

        {/* Section utilisateur (optionnelle) */}
        <div className="sidebar-user">
          <div className="user-info">
            <div className="user-avatar">
              JD {/* Initiales de l'utilisateur */}
            </div>
            <div className="user-details">
              <h4>John Doe</h4>
              <p>Développeur</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Overlay pour mobile */}
      {isOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
            display: window.innerWidth <= 768 ? 'block' : 'none'
          }}
        />
      )}
    </>
  );
};

export default Sidebar;