import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "../slices/authSlice";

const BASE_URL = 'https://reqres.in/api';

export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart());
    
    const response = await axios.post(`${BASE_URL}/login`, credentials);
    const payload = {
      token: response?.data?.token,
      user: { email: credentials.email }
    };
    
    dispatch(loginSuccess(payload));
    return payload;
  } catch (error) {
    const errorMessage = error.response?.data?.error || 'Login failed';
    dispatch(loginFailure(errorMessage));
    throw errorMessage;
  }
};
