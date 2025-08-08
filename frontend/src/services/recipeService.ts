import api from "./axiosInstance";
import type { Recipe } from "../types/recipe";
import { API_BASE_URL } from "../../constants.ts";

export async function fetchRecipes(): Promise<Recipe[]> {
  updateAuthHeaderWithToken();
  const response = await api.get<Recipe[]>(`${API_BASE_URL}/my-recipes/`);
  return response.data;
}

export async function addRecipe(recipe: Recipe): Promise<Recipe> {
  const response = await api.post<Recipe>(`${API_BASE_URL}/recipes/`, recipe);
  return response.data;
}

function updateAuthHeaderWithToken() {
  const token = localStorage.getItem("access");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
}
export async function uploadRecipeFile(file: File): Promise<void> {
  const formData = new FormData();
  formData.append('file', file);
  await api.post(`${API_BASE_URL}/recipes/upload/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
