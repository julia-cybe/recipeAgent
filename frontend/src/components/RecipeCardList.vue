<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">    <div v-for="recipe in recipes" :key="recipe.id" class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div class="p-4">
        <h3 class="text-xl font-semibold mb-2">{{ recipe.title }}</h3>
        <p class="text-gray-600 mb-2">{{ recipe.description }}</p>
        <div class="mb-2">
          <span class="font-bold">Ingredients:</span>
          <ul class="list-disc list-inside text-gray-700">
            <li v-for="ingredient in recipe.ingredients" :key="ingredient.id">
              {{ ingredient.quantity }} {{ ingredient.unit }} {{ ingredient.name }}
            </li>
          </ul>
        </div>
        <div>
          <span class="font-bold">Preparation:</span>
          <p class="text-gray-700 whitespace-pre-line">{{ recipe.preparation_steps }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchRecipes } from '../services/recipeService';
import type { Recipe } from '../types/recipe';


const recipes = ref<Recipe[]>([]);

onMounted(async () => {
  try {
    const response = await fetchRecipes();
    recipes.value = response;
    console.log('Recipes loaded:', recipes.value);
  } catch (e) {
    // Handle error (e.g., show a toast or redirect to login)
  }
});
</script>

<style scoped>
.grid {
  background: #f9fafb;
}
</style>
