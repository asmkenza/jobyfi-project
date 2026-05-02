import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getJobStatsAsync } from '../../features/job/jobSlice';
import './Stats.css'; // Importation des styles

const Stats = () => {
  const dispatch = useDispatch();
  const { stats, isLoading, error } = useSelector((state) => state.job);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getJobStatsAsync(token));
  }, [dispatch, token]);

  // Calcul du total et des pourcentages
  const getTotalJobs = () => {
    if (!stats) return 0;
    return (stats.pending || 0) + (stats.interview || 0) + (stats.declined || 0);
  };

  const getPercentage = (value) => {
    const total = getTotalJobs();
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  };

  const getBarHeight = (value) => {
    const total = getTotalJobs();
    const maxHeight = 160; // hauteur maximale en pixels
    if (total === 0) return 20;
    return Math.max(20, (value / total) * maxHeight);
  };

  if (isLoading) {
    return (
      <div className="stats-container">
        <div className="loading-message">
          📊 Chargement des statistiques en cours...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="stats-container">
        <div className="error-message">
          ❌ Erreur lors du chargement des statistiques : {error}
        </div>
      </div>
    );
  }

  const totalJobs = getTotalJobs();

  return (
    <div className="stats-container">
      <h2 className="stats-header">Tableau de Bord</h2>
      
      <div className="stats-cards-container">
        <div className="stat-card pending-card">
          <div className="stat-card-header">
            <h3 className="stat-title">En Attente</h3>
            <div className="stat-icon">⏳</div>
          </div>
          <div className="stat-value">{stats?.pending || 0}</div>
          <div className="stat-description">
            Candidatures soumises en attente de réponse
          </div>
          <div 
            className="progress-circle"
            style={{'--progress': `${getPercentage(stats?.pending || 0)}%`}}
          >
            <span className="progress-percentage">
              {getPercentage(stats?.pending || 0)}%
            </span>
          </div>
        </div>

        {/* Carte Entretien */}
        <div className="stat-card interview-card">
          <div className="stat-card-header">
            <h3 className="stat-title">Entretiens</h3>
            <div className="stat-icon">💼</div>
          </div>
          <div className="stat-value">{stats?.interview || 0}</div>
          <div className="stat-description">
            Candidatures avec entretien programmé ou passé
          </div>
          <div 
            className="progress-circle"
            style={{'--progress': `${getPercentage(stats?.interview || 0)}%`}}
          >
            <span className="progress-percentage">
              {getPercentage(stats?.interview || 0)}%
            </span>
          </div>
        </div>

        {/* Carte Refusé */}
        <div className="stat-card declined-card">
          <div className="stat-card-header">
            <h3 className="stat-title">Refusées</h3>
            <div className="stat-icon">❌</div>
          </div>
          <div className="stat-value">{stats?.declined || 0}</div>
          <div className="stat-description">
            Candidatures qui n'ont pas abouti
          </div>
          <div 
            className="progress-circle"
            style={{'--progress': `${getPercentage(stats?.declined || 0)}%`}}
          >
            <span className="progress-percentage">
              {getPercentage(stats?.declined || 0)}%
            </span>
          </div>
        </div>
      </div>

      {/* Résumé total */}
      <div className="stats-summary">
        <h3 className="summary-title">Total des Candidatures</h3>
        <div className="summary-total">{totalJobs}</div>
        <div className="summary-subtitle">
          {totalJobs > 0 ? 'Votre parcours de recherche d\'emploi' : 'Commencez par ajouter vos premières candidatures !'}
        </div>
      </div>

      {/* Graphique en barres simple */}
      {totalJobs > 0 && (
        <div className="chart-container">
          <h3 className="chart-title">Répartition des Candidatures</h3>
          <div className="simple-bar-chart">
            <div 
              className="bar bar-pending"
              style={{height: `${getBarHeight(stats?.pending || 0)}px`}}
            >
              <span className="bar-value">{stats?.pending || 0}</span>
              <span className="bar-label">En attente</span>
            </div>
            <div 
              className="bar bar-interview"
              style={{height: `${getBarHeight(stats?.interview || 0)}px`}}
            >
              <span className="bar-value">{stats?.interview || 0}</span>
              <span className="bar-label">Entretiens</span>
            </div>
            <div 
              className="bar bar-declined"
              style={{height: `${getBarHeight(stats?.declined || 0)}px`}}
            >
              <span className="bar-value">{stats?.declined || 0}</span>
              <span className="bar-label">Refusées</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stats;