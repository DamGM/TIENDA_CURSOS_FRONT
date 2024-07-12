import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api',
});


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