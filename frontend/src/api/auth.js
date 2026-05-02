const API_URL = 'http://localhost:8100/api/user';

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/register-user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Registration failed');
  }
  return await response.json();
};

export const loginUser = async (userData) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }
  return await response.json();
};


export const updateUserProfile = async (userData, token) => {
  const response = await fetch('http://localhost:8100/api/user/profile', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, 
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Échec de la mise à jour du profil');
  }

  return await response.json();
};