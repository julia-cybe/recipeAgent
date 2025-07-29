<script setup lang="ts">
import { ref } from 'vue';
import { login } from '../services/authService';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const username = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);
const router = useRouter();
const toast = useToast();

const handleLogin = async () => {
  error.value = '';
  loading.value = true;
  try {
    const data = await login(username.value, password.value);
    localStorage.setItem('access', data.access);
    localStorage.setItem('refresh', data.refresh);
    router.push('/');
  } catch (e: any) {
    error.value = e?.response?.data?.error || 'Login failed';
    toast.error(error.value);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-center text-2xl font-bold text-gray-900">Sign in to your account</h2>
      <form class="space-y-6" @submit.prevent="handleLogin">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input id="username" v-model="username" type="text" required
            class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input id="password" v-model="password" type="password" required
            class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div v-if="error" class="text-red-600 text-sm">{{ error }}</div>
        <button type="submit" :disabled="loading"
          class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
          <span v-if="loading">Signing in...</span>
          <span v-else>Sign in</span>
        </button>
      </form>
    </div>
  </div>
</template>