import axios from 'axios';

const BASE_URL = 'https://reqres.in/api';

export const getUsers = async (page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/users?page=${page}`);
    return response?.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(`${BASE_URL}/users/${id}`, userData);
    return response?.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/users/${id}`);
    return response?.data;
  } catch (error) {
    throw error.response?.data;
  }
};