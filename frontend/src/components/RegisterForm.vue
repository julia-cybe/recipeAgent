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
  <form @submit.prevent="handleRegister">
    <div>
      <label for="username">Username</label>
      <input id="username" v-model="username" type="text" required />
    </div>
    <div>
      <label for="password">Password</label>
      <input id="password" v-model="password" type="password" required />
    </div>
    <div>
      <label for="confirmPassword">Confirm Password</label>
      <input id="confirmPassword" v-model="confirmPassword" type="password" required />
    </div>
    <button type="submit" :disabled="loading">Register</button>
    <div v-if="error" style="color: red;">{{ error }}</div>
  </form>
</template>