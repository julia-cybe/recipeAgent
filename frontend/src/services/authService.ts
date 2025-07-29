import api from "./axiosInstance";
import { API_BASE_URL } from "../../constants.ts";

export interface LoginResponse {
  access: string;
  refresh: string;
}

export async function login(
  username: string,
  password: string
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>(`${API_BASE_URL}/login/`, {
    username,
    password,
  });
  return response.data;
}

export async function logout(): Promise<void> {
  const refresh = localStorage.getItem("refresh");
  api.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("access")}`;
  await api.post(`${API_BASE_URL}/logout/`, { refresh });
}

export async function register(
  username: string,
  password: string
): Promise<void> {
  await api.post(`${API_BASE_URL}/register/`, {
    username,
    password,
  });
}

export async function refreshToken(refresh: string) {
  const response = await api.post(`${API_BASE_URL}/token/refresh/`, {
    refresh,
  });
  return response.data;
}
