import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api',
});

export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data.token;
  } catch (error) {
    console.error(error);
  }
};

export const register = async (email, password, name) => {
  try {
    const response = await api.post('/auth/register', { email, password, name });
    return response.data.token;
  } catch (error) {
    console.error(error);
  }
};
export const getUserData = async (token) => {
    try {
      const response = await api.get('/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error; 
    }
  };

export const getCourses = async (token) => {
  try {
    const response = await api.get('/courses', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};