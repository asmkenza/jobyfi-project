// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchJobsAsync, deleteJobAsync, updateJobAsync } from '../../features/job/jobSlice';
// import './AllJobs.css';

// // Composant du modal (intégré directement)
// const EditJobModal = ({ job, onClose, onUpdate }) => {
//   const [formData, setFormData] = useState({
//     position: '',
//     company: '',
//     location: '',
//     status: 'pending',
//     type: 'full-time',
//   });

//   useEffect(() => {
//     if (job) {
//       setFormData({
//         position: job.position || '',
//         company: job.company || '',
//         location: job.location || '',
//         status: job.status || 'pending',
//         type: job.type || 'full-time',
//       });
//     }
//   }, [job]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onUpdate(job._id, formData);
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <div className="modal-header">
//           <h3>Modifier le Job</h3>
//           <button className="close-btn" onClick={onClose}>
//             &times;
//           </button>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Position</label>
//             <input
//               type="text"
//               name="position"
//               value={formData.position}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Entreprise</label>
//             <input
//               type="text"
//               name="company"
//               value={formData.company}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Localisation</label>
//             <input
//               type="text"
//               name="location"
//               value={formData.location}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Statut</label>
//             <select
//               name="status"
//               value={formData.status}
//               onChange={handleChange}
//             >
//               <option value="pending">En attente</option>
//               <option value="interview">Entretien</option>
//               <option value="declined">Refusé</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Type</label>
//             <select
//               name="type"
//               value={formData.type}
//               onChange={handleChange}
//             >
//               <option value="full-time">Temps plein</option>
//               <option value="part-time">Temps partiel</option>
//               <option value="internship">Stage</option>
//             </select>
//           </div>
//           <div className="modal-footer">
//             <button type="button" className="cancel-btn" onClick={onClose}>
//               Annuler
//             </button>
//             <button type="submit" className="save-btn">
//               Enregistrer
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// const AllJobs = () => {
//   const dispatch = useDispatch();
//   const { jobs, isLoading, error } = useSelector((state) => state.job);
//   const { token } = useSelector((state) => state.auth);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedJob, setSelectedJob] = useState(null);

//   useEffect(() => {
//     dispatch(fetchJobsAsync(token));
//   }, [dispatch, token]);

//   const handleDelete = async (jobId) => {
//     if (window.confirm('Êtes-vous sûr de vouloir supprimer ce job ?')) {
//       await dispatch(deleteJobAsync({ jobId, token }));
//     }
//   };

//   const handleEdit = (job) => {
//     setSelectedJob(job);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedJob(null);
//   };

//   const handleUpdateJob = async (jobId, updatedJobData) => {
//     await dispatch(updateJobAsync({ jobId, jobData: updatedJobData, token }));
//     setIsModalOpen(false);
//   };

//   if (isLoading) {
//     return (
//       <div className="all-jobs-container">
//         <div className="loading-message">Chargement en cours...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="all-jobs-container">
//         <div className="error-message">Erreur : {error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="all-jobs-container">
//       <h2 className="all-jobs-header">Gestion des Emplois</h2>

//       {jobs && jobs.length > 0 ? (
//         <div className="jobs-table-container">
//           <table className="jobs-table">
//             <thead>
//               <tr>
//                 <th>Position</th>
//                 <th>Entreprise</th>
//                 <th>Localisation</th>
//                 <th></th>
//               </tr>
//             </thead>
//             <tbody>
//               {jobs.map((job) => (
//                 <tr key={job._id}>
//                   <td className="job-position">{job.position}</td>
//                   <td className="job-company">{job.company}</td>
//                   <td className="job-location">{job.location}</td>
//                   <td className="actions-cell">
//                     <button
//                       className="action-btn edit-btn"
//                       onClick={() => handleEdit(job)}
//                       title="Modifier ce job"
//                     >
//                       Modifier
//                     </button>
//                     <button
//                       className="action-btn delete-btn"
//                       onClick={() => handleDelete(job._id)}
//                       title="Supprimer ce job"
//                     >
//                       Supprimer
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <div className="no-jobs-message">
//           Aucun emploi trouvé. Commencez par ajouter votre premier job !
//         </div>
//       )}

//       {/* Modal de modification */}
//       {isModalOpen && (
//         <EditJobModal
//           job={selectedJob}
//           onClose={handleCloseModal}
//           onUpdate={handleUpdateJob}
//         />
//       )}
//     </div>
//   );
// };

// export default AllJobs;




import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobsAsync, deleteJobAsync, updateJobAsync } from '../../features/job/jobSlice';
import './AllJobs.css';

// Modal de modification
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
    setFormData((prev) => ({ ...prev, [name]: value }));
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
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Position</label>
            <input type="text" name="position" value={formData.position} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Entreprise</label>
            <input type="text" name="company" value={formData.company} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Localisation</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Statut</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="pending">En attente</option>
              <option value="interview">Entretien</option>
              <option value="declined">Refusé</option>
            </select>
          </div>
          <div className="form-group">
            <label>Type</label>
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="full-time">Temps plein</option>
              <option value="part-time">Temps partiel</option>
              <option value="internship">Stage</option>
            </select>
          </div>
          <div className="modal-footer">
            <button type="button" className="cancel-btn" onClick={onClose}>Annuler</button>
            <button type="submit" className="save-btn">Enregistrer</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Modal de confirmation de suppression
const DeleteConfirmModal = ({ onClose, onConfirm }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '400px' }}>
        <div className="modal-header">
          <h3>Confirmer la suppression</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <div style={{ padding: '1.5rem', textAlign: 'center' }}>
          <p style={{ marginBottom: '1rem', color: '#555' }}>
            Êtes-vous sûr de vouloir supprimer ce job ? <br />
            <strong>Cette action est irréversible.</strong>
          </p>
        </div>
        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>Annuler</button>
          <button className="delete-btn" onClick={onConfirm}>Supprimer</button>
        </div>
      </div>
    </div>
  );
};

const AllJobs = () => {
  const dispatch = useDispatch();
  const { jobs, isLoading, error } = useSelector((state) => state.job);
  const { token } = useSelector((state) => state.auth);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchJobsAsync(token));
  }, [dispatch, token]);

  // Ouvre le modal de confirmation
  const handleDelete = (jobId) => {
    setJobToDelete(jobId);
    setIsDeleteModalOpen(true);
  };

  // Confirme et exécute la suppression
  const handleConfirmDelete = async () => {
    await dispatch(deleteJobAsync({ jobId: jobToDelete, token }));
    setIsDeleteModalOpen(false);
    setJobToDelete(null);
  };

  // Annule la suppression
  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setJobToDelete(null);
  };

  const handleEdit = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const handleUpdateJob = async (jobId, updatedJobData) => {
    await dispatch(updateJobAsync({ jobId, jobData: updatedJobData, token }));
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="all-jobs-container">
        <div className="loading-message">Chargement en cours...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="all-jobs-container">
        <div className="error-message">Erreur : {error}</div>
      </div>
    );
  }

  return (
    <div className="all-jobs-container">
      <h2 className="all-jobs-header">Gestion des Emplois</h2>

      {jobs && jobs.length > 0 ? (
        <div className="jobs-table-container">
          <table className="jobs-table">
            <thead>
              <tr>
                <th>Position</th>
                <th>Entreprise</th>
                <th>Localisation</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job._id}>
                  <td className="job-position">{job.position}</td>
                  <td className="job-company">{job.company}</td>
                  <td className="job-location">{job.location}</td>
                  <td className="actions-cell">
                    <button
                      className="action-btn edit-btn"
                      onClick={() => handleEdit(job)}
                      title="Modifier ce job"
                    >
                      Modifier
                    </button>
                    <button
                      className="action-btn delete-btn"
                      onClick={() => handleDelete(job._id)}
                      title="Supprimer ce job"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-jobs-message">
          Aucun emploi trouvé. Commencez par ajouter votre premier job !
        </div>
      )}

      {/* Modal de modification */}
      {isModalOpen && (
        <EditJobModal
          job={selectedJob}
          onClose={handleCloseModal}
          onUpdate={handleUpdateJob}
        />
      )}

      {/* Modal de confirmation de suppression */}
      {isDeleteModalOpen && (
        <DeleteConfirmModal
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default AllJobs;