
<template>
  <nav class="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between flex-wrap shadow-md">
    <div class="flex items-center flex-shrink-0 text-indigo-700 mr-6">
      <span class="font-bold text-2xl tracking-tight">Recipe Manager</span>
    </div>
    <div class="block lg:hidden">
      <button @click="toggleMenu" class="flex items-center px-3 py-2 border rounded text-indigo-700 border-indigo-400 hover:text-indigo-900 hover:border-indigo-700">
        <svg class="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
      </button>
    </div>
    <div :class="['w-full', 'block', 'flex-grow', 'lg:flex', 'lg:items-center', 'lg:w-auto', menuOpen ? '' : 'hidden']">
      <div class="text-sm lg:flex-grow flex flex-col lg:flex-row items-start lg:items-center">
        <router-link to="/my-recipes" class="block mt-4 lg:inline-block lg:mt-0 text-indigo-700 hover:text-indigo-900 mr-6 font-medium">
          My Recipes
        </router-link>
        <router-link to="/add-recipe" class="block mt-4 lg:inline-block lg:mt-0 text-indigo-700 hover:text-indigo-900 font-medium">
          Add Recipe
        </router-link>
      </div>
      <div>
        <button @click="handleLogout" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white bg-indigo-600 border-indigo-600 hover:bg-indigo-700 mt-4 lg:mt-0">Logout</button>
      </div>
    </div>
  </nav>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-2 text-gray-800">Welcome to the recipe app!</h1>
    <p class="text-gray-600 mb-4">Manage your recipes, plan meals, and more.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { logout } from '../services/authService';

export default defineComponent({
  name: 'Home',
  setup() {
    const menuOpen = ref(false);
    const router = useRouter();
    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value;
    };
    const handleLogout = async () => {
      try {
        await logout();
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        router.push('/login');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };
    return { handleLogout, menuOpen, toggleMenu };
  },
});
</script>
<style scoped>
nav {
  z-index: 10;
}
</style>