import axios from 'axios';
import {
    fetchUsersStart,
    fetchUsersSuccess,
    fetchUsersFailure,
    editUserStart,
    editUserSuccess,
    editUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure
} from '../slices/usersSlice';

const BASE_URL = 'https://reqres.in/api';

export const fetchUsers = (page = 1) => async (dispatch) => {
    try {
        dispatch(fetchUsersStart());
        const response = await axios.get(`${BASE_URL}/users?page=${page}`);
        
        // Validate response structure
        if (!response.data || !response.data.data) {
            throw new Error('Invalid API response structure');
        }
        
        dispatch(fetchUsersSuccess(response.data));
        // console.log(response.data)
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.error || error.message;
        dispatch(fetchUsersFailure(errorMessage));
        throw errorMessage;
    }
};

export const updateUser = (id, userData) => async (dispatch) => {
    try {
        dispatch(editUserStart());
        const response = await axios.put(`${BASE_URL}/users/${id}`, userData);
        
        // The Reqres API returns the updated data, but we'll merge it with the ID
        const updatedUser = { id, ...response.data };
        
        dispatch(editUserSuccess(updatedUser));
        return updatedUser;
    } catch (error) {
        const errorMessage = error.response?.data?.error || error.message;
        dispatch(editUserFailure(errorMessage));
        throw errorMessage;
    }
};

export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch(deleteUserStart());
        await axios.delete(`${BASE_URL}/users/${id}`);
        dispatch(deleteUserSuccess(id));
        return id;
    } catch (error) {
        const errorMessage = error.response?.data?.error || error.message;
        dispatch(deleteUserFailure(errorMessage));
        throw errorMessage;
    }
};
