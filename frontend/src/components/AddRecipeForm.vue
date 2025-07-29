<template>
    <div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
        <h2 class="text-2xl font-bold mb-4">Add New Recipe</h2>
        <form @submit.prevent="handleSubmit">
            <div class="mb-4">
                <label class="block text-gray-700 font-medium mb-2">Title</label>
                <input v-model="recipe.title" type="text" class="w-full border rounded px-3 py-2" required />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 font-medium mb-2">Description</label>
                <textarea v-model="recipe.description" class="w-full border rounded px-3 py-2" rows="2"></textarea>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 font-medium mb-2">Preparation Steps</label>
                <textarea v-model="recipe.preparation_steps" class="w-full border rounded px-3 py-2" rows="4"
                    required></textarea>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 font-medium mb-2">Ingredients</label>
                <div v-for="(ingredient, idx) in recipe.ingredients" :key="idx" class="flex gap-2 mb-2">
                    <input v-model="ingredient.name" type="text" placeholder="Name"
                        class="flex-1 border rounded px-2 py-1" required />
                    <input v-model.number="ingredient.quantity" type="number" min="0" step="any" placeholder="Qty"
                        class="w-20 border rounded px-2 py-1" required />
                    <select v-model="ingredient.unit" class="w-28 border rounded px-2 py-1" required>
                        <option value="" disabled>Select unit</option>
                        <option value="kg">kg</option>
                        <option value="g">grams</option>
                        <option value="mg">milligrams</option>
                        <option value="lb">pounds</option>
                        <option value="oz">ounces</option>
                        <option value="l">liters</option>
                        <option value="ml">milliliters</option>
                        <option value="cup">cups</option>
                        <option value="tbsp">tablespoons</option>
                        <option value="tsp">teaspoons</option>
                        <option value="pcs">pieces</option>
                    </select>
                    <button type="button" @click="removeIngredient(idx)"
                        class="text-red-500 hover:text-red-700">&times;</button>
                </div>
                <button type="button" @click="addIngredient" class="mt-2 text-indigo-600 hover:underline">+ Add
                    Ingredient</button>
            </div>
            <div v-if="error" class="text-red-600 mb-2">{{ error }}</div>
            <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                :disabled="loading">
                <span v-if="loading">Saving...</span>
                <span v-else>Save Recipe</span>
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { Recipe } from '../types/recipe';
import { addRecipe } from '../services/recipeService';

const router = useRouter();
const loading = ref(false);
const error = ref('');
const recipe = ref<Recipe>({
    title: '',
    description: '',
    preparation_steps: '',
    ingredients: [
        { name: '', quantity: 0, unit: '' },
    ],
});

function addIngredient() {
    recipe.value.ingredients.push({ name: '', quantity: 0, unit: '' });
}
function removeIngredient(idx: number) {
    recipe.value.ingredients.splice(idx, 1);
}

async function handleSubmit() {
    error.value = '';
    loading.value = true;
    try {
        await addRecipe(recipe.value);
        router.push('/my-recipes');
    } catch (e: any) {
        error.value = e?.response?.data?.error || 'Failed to save recipe.';
    } finally {
        loading.value = false;
    }
}
</script>
