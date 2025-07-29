<script setup lang="ts">
import { ref } from 'vue';
import { register } from '../services/authService';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const error = ref('');
const loading = ref(false);
const router = useRouter();
const toast = useToast();

const handleRegister = async () => {
  error.value = '';
  loading.value = true;
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match';
    loading.value = false;
    return;
  }
  try {
    await register(username.value, password.value);
    toast.success('Registration successful! Redirecting to login...');
    setTimeout(() => {
      router.push('/login');
    }, 2000);
  } catch (e: any) {
    error.value = e?.response?.data?.error || 'Registration failed';
    toast.error(error.value);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-center text-2xl font-bold text-gray-900">Register</h2>
      <form @submit.prevent="handleRegister" class="space-y-6">
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
        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input id="confirmPassword" v-model="confirmPassword" type="password" required
            class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div v-if="error" class="text-red-600 text-sm">{{ error }}</div>
        <button type="submit" :disabled="loading"
          class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
          <span v-if="loading">Registering...</span>
          <span v-else>Register</span>
        </button>
      </form>
    </div>
  </div>
</template>