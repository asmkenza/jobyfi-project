import React from 'react';
import './AuthLayout.css';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="auth-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>
      
      <div className="auth-content">
        <div className="auth-card">
          <div className="auth-header">
            <div className="logo">
              <div className="logo-icon">J</div>
              <span className="logo-text">Jobify</span>
            </div>
            <h1 className="auth-title">{title}</h1>
            <p className="auth-subtitle">{subtitle}</p>
          </div>
          
          <div className="auth-form-container">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;