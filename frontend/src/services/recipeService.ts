import axios from "axios";
import type { Recipe } from "../types/recipe";

export async function fetchRecipes(): Promise<Recipe[]> {
  updateAuthHeaderWithToken();
  const response = await axios.get<Recipe[]>(
    "http://localhost:8000/api/my-recipes/"
  );
  return response.data;
}

export async function addRecipe(recipe: Recipe): Promise<Recipe> {
  updateAuthHeaderWithToken();
  const response = await axios.post<Recipe>(
    "http://localhost:8000/api/recipes/",
    recipe
  );
  return response.data;
}

function updateAuthHeaderWithToken() {
  const token = localStorage.getItem("access");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
}
