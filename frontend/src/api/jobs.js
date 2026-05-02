const API_URL = 'http://localhost:8100/api/job';

export const fetchJobs = async (token) => {
  const response = await fetch(`${API_URL}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch jobs');
  }
  return await response.json();
};

export const addJob = async (jobData, token) => {
  const response = await fetch(`${API_URL}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(jobData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to add job');
  }
  return await response.json();
};

export const updateJob = async (jobId, jobData, token) => {
  const response = await fetch(`${API_URL}/${jobId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(jobData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update job');
  }
  return await response.json();
};

export const deleteJob = async (jobId, token) => {
  const response = await fetch(`${API_URL}/${jobId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to delete job');
  }
  return await response.json();
};

export const getJobStats = async (token) => {
  const response = await fetch(`${API_URL}/stats`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch job stats');
  }
  return await response.json();
};
