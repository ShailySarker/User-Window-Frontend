import axios from 'axios';
import { deleteUserSuccess, editUserFailure, editUserStart, editUserSuccess, fetchUsersFailure, fetchUsersStart, fetchUsersSuccess } from '../slices/usersSlice';

const BASE_URL = 'https://reqres.in/api';

// Export thunks
export const fetchUsers = (page = 1) => async (dispatch) => {
  try {
    dispatch(fetchUsersStart());
    const response = await axios.get(`${BASE_URL}/users?page=${page}`);
    dispatch(fetchUsersSuccess(response?.data));
  } catch (error) {
    const errorMessage = error.response?.data?.error || 'Failed to fetch users';
    dispatch(fetchUsersFailure(errorMessage));
    throw errorMessage;
  }
};

export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch(editUserStart());
    const response = await axios.put(`${BASE_URL}/users/${id}`, userData);
    dispatch(editUserSuccess({ id, ...response?.data }));
  } catch (error) {
    const errorMessage = error.response?.data?.error || 'Failed to update user';
    dispatch(editUserFailure(errorMessage));
    throw errorMessage;
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    await axios.delete(`${BASE_URL}/users/${id}`);
    dispatch(deleteUserSuccess(id));
  } catch (error) {
    const errorMessage = error.response?.data?.error || 'Failed to delete user';
    throw errorMessage;
  }
};
