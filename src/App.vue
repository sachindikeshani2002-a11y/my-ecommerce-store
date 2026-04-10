<script setup>
import { ref, onMounted, computed, provide } from 'vue';

const isDark = ref(false);

// Provide isDark to all child components
provide('isDark', isDark);

const toggleDark = () => {
  isDark.value = !isDark.value;
  
  // Always update the DOM
  const html = document.documentElement;
  if (isDark.value) {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
  
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
};

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'dark') {
    isDark.value = true;
    document.documentElement.classList.add('dark');
  } else {
    isDark.value = false;
    document.documentElement.classList.remove('dark');
  }
});

// Compute inline styles for guaranteed dark mode
const pageStyle = computed(() => {
  if (isDark.value) {
    return {
      backgroundColor: '#0f172a',
      color: '#f1f5f9'
    };
  }
  return {
    backgroundColor: '#ffffff',
    color: '#111827'
  };
});
</script>

<template>
  <div class="min-h-screen transition-colors duration-300" :style="pageStyle" :class="{ dark: isDark }">
    
    <nav class="p-4 shadow-lg flex justify-between items-center border-b transition-colors duration-300" :style="{ backgroundColor: isDark ? '#1e293b' : '#f3f4f6', borderColor: isDark ? '#1e293b' : '#e5e7eb' }">
      <h1 class="text-2xl font-bold" :style="{ 
        background: isDark 
          ? 'linear-gradient(to right, #60a5fa, #a78bfa)' 
          : 'linear-gradient(to right, #2563eb, #9333ea)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }">MODERN STORE</h1>
      
      <div class="flex gap-6 items-center">
        <router-link to="/" class="font-medium transition" :style="{ 
          color: isDark ? '#d1d5db' : '#374151',
        }" @mouseenter="e => e.target.style.color = isDark ? '#93c5fd' : '#2563eb'" @mouseleave="e => e.target.style.color = isDark ? '#d1d5db' : '#374151'">Home</router-link>
        <router-link to="/login" class="font-medium transition" :style="{ 
          color: isDark ? '#d1d5db' : '#374151',
        }" @mouseenter="e => e.target.style.color = isDark ? '#93c5fd' : '#2563eb'" @mouseleave="e => e.target.style.color = isDark ? '#d1d5db' : '#374151'">Login</router-link>
        
        <button @click="toggleDark" class="p-2 rounded-full text-xl shadow hover:shadow-lg transition transform hover:scale-110" :style="{ backgroundColor: isDark ? '#1e3a8a' : '#dbeafe' }" :title="`Switch to ${isDark ? 'light' : 'dark'} mode`">
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