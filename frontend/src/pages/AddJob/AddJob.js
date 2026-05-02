import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addJobAsync } from '../../features/job/jobSlice';
import './AddJob.css'; 

const AddJob = () => {
  const [jobData, setJobData] = useState({
    position: '',
    company: '',
    location: '',
    status: 'pending',
    type: 'full-time',
  });
  
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addJobAsync({ jobData, token }));
    
    // Réinitialisation du formulaire
    setJobData({
      position: '',
      company: '',
      location: '',
      status: 'pending',
      type: 'full-time',
    });
  };

  return (
    <div className="job-form-container">
      <div className="container">
        {/* Header */}
        <div className="header">
          <div className="header-icon">
            <i className="fas fa-briefcase"></i>
          </div>
          <h2>Ajouter un Nouveau Job</h2>
          <p>Remplissez les informations pour ajouter une opportunité</p>
        </div>

        {/* Form */}
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            {/* Position */}
            <div className="form-group">
              <label htmlFor="position">
                <i className="fas fa-user-tie"></i>
                Position
              </label>
              <input 
                type="text" 
                id="position" 
                name="position" 
                value={jobData.position}
                onChange={handleChange}
                placeholder="ex: Développeur Full Stack" 
                required
              />
            </div>

            {/* Entreprise */}
            <div className="form-group">
              <label htmlFor="company">
                <i className="fas fa-building"></i>
                Entreprise
              </label>
              <input 
                type="text" 
                id="company" 
                name="company" 
                value={jobData.company}
                onChange={handleChange}
                placeholder="ex: Google, Microsoft, StartupXYZ" 
                required
              />
            </div>

            {/* Localisation */}
            <div className="form-group">
              <label htmlFor="location">
                <i className="fas fa-map-marker-alt"></i>
                Localisation
              </label>
              <input 
                type="text" 
                id="location" 
                name="location" 
                value={jobData.location}
                onChange={handleChange}
                placeholder="ex: Paris, Remote, New York" 
                required
              />
            </div>

            {/* Status et Type */}
            <div className="form-row">
              {/* Status */}
              <div className="form-group">
                <label htmlFor="status">
                  <i className="fas fa-clock"></i>
                  Statut
                </label>
                <select 
                  id="status" 
                  name="status"
                  value={jobData.status}
                  onChange={handleChange}
                >
                  <option value="pending">🔄 En attente</option>
                  <option value="interview">💼 Entretien</option>
                  <option value="declined">❌ Refusé</option>
                </select>
              </div>

              {/* Type */}
              <div className="form-group">
                <label htmlFor="type">
                  <i className="fas fa-file-contract"></i>
                  Type de contrat
                </label>
                <select 
                  id="type" 
                  name="type"
                  value={jobData.type}
                  onChange={handleChange}
                >
                  <option value="full-time">⏰ Temps plein</option>
                  <option value="part-time">⏳ Temps partiel</option>
                  <option value="internship">🎓 Stage</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-btn">
              <i className="fas fa-plus"></i>
              Ajouter le Job
            </button>
          </form>

          {/* Footer Note */}
          <div className="footer-note">
            <i className="fas fa-lightbulb"></i>
            Astuce: Remplissez tous les champs pour un meilleur suivi de vos candidatures
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddJob;
