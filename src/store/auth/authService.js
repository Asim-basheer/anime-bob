import axios from 'axios';

const API_URL = 'https://bob-anime.herokuapp.com/auth/';

// Register user
const register = async (userData) => {
  const { data } = await axios.post(API_URL + 'register', userData);

  return data;
};

// Login user
const login = async (userData) => {
  const { data } = await axios.post(API_URL + 'login', userData);

  return data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
