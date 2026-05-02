import {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
} from './authSlice';
import { registerUser, loginUser, updateUserProfile } from '../../api/auth';

export const register = (userData, navigate) => async (dispatch) => {
  try {
    dispatch(registerStart());
    const data = await registerUser(userData);
    dispatch(registerSuccess(data));
    navigate('/dashboard');
  } catch (error) {
    dispatch(registerFailure(error.message));
  }
};

export const login = (userData, navigate) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const data = await loginUser(userData);
    dispatch(loginSuccess(data));
    navigate('/dashboard');
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

// Nouvelle action pour mettre à jour le profil
export const updateProfile = ({ userData, token }) => async (dispatch) => {
  try {
    dispatch(updateProfileStart());
    // Passer userData et token séparément à la fonction API
    const data = await updateUserProfile(userData, token);
    dispatch(updateProfileSuccess(data));
  } catch (error) {
    dispatch(updateProfileFailure(error.message));
  }
};