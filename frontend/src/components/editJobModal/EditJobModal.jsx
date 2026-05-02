import React, { useState, useEffect } from 'react';
import './EditJobModal.css'; 

const EditJobModal = ({ job, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    position: '',
    company: '',
    location: '',
    status: 'pending',
    type: 'full-time',
  });

  useEffect(() => {
    if (job) {
      setFormData({
        position: job.position || '',
        company: job.company || '',
        location: job.location || '',
        status: job.status || 'pending',
        type: job.type || 'full-time',
      });
    }
  }, [job]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(job._id, formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Modifier le Job</h3>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Position</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Entreprise</label>
            <input
              type="text"
              name="company"
              value={formData.company}
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
          <div className="form-group">
            <label>Statut</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="pending">En attente</option>
              <option value="interview">Entretien</option>
              <option value="declined">Refusé</option>
            </select>
          </div>
          <div className="form-group">
            <label>Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="full-time">Temps plein</option>
              <option value="part-time">Temps partiel</option>
              <option value="internship">Stage</option>
            </select>
          </div>
          <div className="modal-footer">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="save-btn">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJobModal;
