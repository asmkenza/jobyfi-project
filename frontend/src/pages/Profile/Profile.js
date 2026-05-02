import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../features/auth/authActions';
import './Profile.css';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, token, isLoading, error } = useSelector((state) => state.auth);
  console.log("Token actuel :", token); 
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    location: '',
    email: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        lastName: user.lastName || '',
        location: user.location || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateProfile({ userData: formData, token }));
      setIsEditing(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };


  if (isLoading) return <div className="profile-container">Chargement...</div>;
  if (error) return <div className="profile-container error-message">Erreur : {error}</div>;

  return (
    <div className="profile-container">
      <h2 className="profile-title">Mon Profil</h2>

      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user?.name?.charAt(0)}{user?.lastName?.charAt(0)}
          </div>
          {!isEditing && (
            <div className="profile-name">
              <h3>{user?.name} {user?.lastName}</h3>
              <p className="profile-location">{user?.location}</p>
            </div>
          )}
        </div>

        {!isEditing ? (
          <div className="profile-details">
            <div className="detail-item">
              <span className="detail-label">Email :</span>
              <span className="detail-value">{user?.email}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Localisation :</span>
              <span className="detail-value">{user?.location}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Membre depuis :</span>
              <span className="detail-value">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label>Prénom</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Nom</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Localisation</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setIsEditing(false)}
              >
                Annuler
              </button>
              <button type="submit" className="save-btn">
                Enregistrer
              </button>
            </div>
          </form>
        )}

        {!isEditing ? (
          <button
            className="edit-profile-btn"
            onClick={() => setIsEditing(true)}
          >
            Modifier le Profil
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Profile;
