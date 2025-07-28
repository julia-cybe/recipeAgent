<template>
  <div>
    <h1>Recipe Manager</h1>
    <p>Welcome to the recipe app!</p>
    <button @click="handleLogout">Logout</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { logout } from '../services/authService';

export default defineComponent({
  name: 'Home',
  methods: {
    async handleLogout() {
      try {
        await logout();
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        this.$router.push('/login');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    },
  },
});
</script>