import axios from "axios";

const BASE_URL = 'https://reqres.in/api';

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, credentials);
    return response?.data;
  } catch (error) {
    throw error.response?.data;
  }
};