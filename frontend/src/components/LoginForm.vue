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
  <form @submit.prevent="handleLogin">
    <div>
      <label for="username">Username</label>
      <input id="username" v-model="username" type="text" required />
    </div>
    <div>
      <label for="password">Password</label>
      <input id="password" v-model="password" type="password" required />
    </div>
    <button type="submit" :disabled="loading">Login</button>
    <div v-if="error" style="color: red;">{{ error }}</div>
  </form>
</template>