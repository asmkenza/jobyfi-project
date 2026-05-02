import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../features/auth/authActions';
import AuthLayout from '../../components/authLayout/AuthLayout';
import './Login.css';
import {  FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData, navigate));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your account to continue"
    >
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="error-message">
            <span>⚠️</span>
            {error}
          </div>
        )}
        
        <div className="form-group">
          <div className="input-wrapper">
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <div className="input-wrapper password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              className="form-input"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={togglePasswordVisibility}
              tabIndex="-1"
            >
            </button>
          </div>
        </div>

        <div className="form-options">
          <label className="remember-me">
            <input type="checkbox" className="checkbox" />
            <span>Remember me</span>
          </label>
          <Link to="#" className="auth-link forgot-password">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="auth-button"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="loading-spinner"></div>
              Signing in...
            </>
          ) : (
            <>
              <span>Sign In</span>
              <span className="button-arrow">→</span>
            </>
          )}
        </button>
      </form>

      <div className="auth-footer">
        <p>
          Don't have an account?{' '}
          <Link to="/register" className="auth-link">
            Sign up for free
          </Link>
        </p>
      </div>

      <div className="divider">
        <span>Or continue with</span>
      </div>

      <div className="social-buttons">
        <button type="button" className="social-button google">
          <FaGoogle />
        </button>
        <button type="button" className="social-button facebook">
          <FaFacebook />
        </button>
        <button type="button" className="social-button github">
          <FaGithub />
        </button>
      </div>
    </AuthLayout>
  );
};

export default Login;