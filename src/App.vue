<script setup>
import { ref } from 'vue';

// Logic for the Dark Mode bonus feature
const isDark = ref(false);

const toggleDark = () => {
  isDark.value = !isDark.value;
  // Toggles the 'dark' class on the root element for Tailwind CSS
  document.documentElement.classList.toggle('dark');
};
</script>

<template>
  <div class="min-h-screen transition-colors duration-300 bg-gray-50 dark:bg-gray-900 dark:text-white">
    
    <nav class="p-4 bg-white dark:bg-gray-800 shadow-md flex justify-between items-center">
      <h1 class="text-xl font-bold text-blue-600">My Store</h1>
      
      <div class="flex gap-6 items-center">
        <router-link to="/" class="hover:text-blue-500 font-medium">Home</router-link>
        <router-link to="/login" class="hover:text-blue-500 font-medium">Login</router-link>
        
        <button @click="toggleDark" class="p-2 bg-gray-100 dark:bg-gray-700 rounded-full text-lg shadow-inner">
          {{ isDark ? '☀️' : '🌙' }}
        </button>
      </div>
    </nav>

    <main class="container mx-auto p-4">
      <router-view />
    </main>
    
  </div>
</template>

<style scoped>
/* Optional: ensures active links are highlighted */
.router-link-active {
  color: #2563eb; /* text-blue-600 */
  font-weight: 700;
}
</style>