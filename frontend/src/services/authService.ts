import axios from 'axios';

export interface LoginResponse {
  access: string;
  refresh: string;
}

export async function login(username: string, password: string): Promise<LoginResponse> {
  const response = await axios.post<LoginResponse>('http://localhost:8000/api/login/', {
    username,
    password,
  });
  return response.data;
}

export async function logout(): Promise<void> {
  // add authentication token to axios headers
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access')}`;
  await axios.post('http://localhost:8000/api/logout/');
}

export async function register(username: string, password: string): Promise<void> {
  await axios.post('http://localhost:8000/api/register/', {
    username,
    password,
  });
}