import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../features/auth/authActions';
import AuthLayout from '../../components/authLayout/AuthLayout';
import './Register.css';
import { FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    location: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (name === 'confirmPassword' || name === 'password') {
      if (name === 'confirmPassword') {
        setPasswordMatch(value === formData.password);
      } else {
        setPasswordMatch(formData.confirmPassword === value);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordMatch(false);
      return;
    }
    const { confirmPassword, ...submitData } = formData;
    dispatch(register(submitData, navigate));
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join us and start your journey today"
    >
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="error-message">
            <span>⚠️</span>
            {error}
          </div>
        )}
        {!passwordMatch && (
          <div className="error-message">
            <span>⚠️</span>
            Passwords do not match
          </div>
        )}
        <div className="form-row">
          <div className="form-group">
            <div className="input-group">
              <span className="input-icon">
                </span>
              <input
                type="text"
                name="name"
                className="form-input"
                placeholder="First name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <span className="input-icon">
                </span>
              <input
                type="text"
                name="lastName"
                className="form-input"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <span className="input-icon">
              </span>
            <input
              type="text"
              name="location"
              className="form-input"
              placeholder="Your location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <span className="input-icon">
              </span>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <span className="input-icon">
              </span>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              className="form-input"
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
            </button>
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <span className="input-icon">
              </span>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              className={`form-input ${!passwordMatch && formData.confirmPassword ? 'input-error' : ''}`}
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
            </button>
          </div>
        </div>
        <div className="terms-container">
          <label className="terms-label">
            <input
              type="checkbox"
              required
              className="checkbox"
            />
            <span className="terms-text">
              I agree to the{' '}
              <Link to="#" className="auth-link">Terms of Service</Link>
              {' '}and{' '}
              <Link to="#" className="auth-link">Privacy Policy</Link>
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="auth-button"
          disabled={isLoading || !passwordMatch}
        >
          {isLoading ? (
            <>
              <div className="loading-spinner"></div>
              Creating account...
            </>
          ) : (
            <>
              <span>Create Account</span>
              <span>→</span>
            </>
          )}
        </button>
      </form>
      <div className="auth-footer">
        <p>
          Already have an account?{' '}
          <Link to="/login" className="auth-link">
            Sign in here
          </Link>
        </p>
      </div>
      <div className="divider">
        <span>Or sign up with</span>
      </div>
      <div className="social-buttons">
        <button type="button" className="social-button">
          <FaGoogle />
        </button>
        <button type="button" className="social-button">
          <FaFacebook />
        </button>
        <button type="button" className="social-button">
          <FaGithub />
        </button>
      </div>
    </AuthLayout>
  );
};

export default Register;
