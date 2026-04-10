<script setup>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('emilys'); 
const password = ref('emilyspass');
const router = useRouter();
const isDark = inject('isDark', ref(false));

const handleLogin = async () => {
  const res = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: username.value, password: password.value })
  });
  const data = await res.json();

  if (data.token) {
    localStorage.setItem('token', data.token);
    router.push('/');
  } else {
    alert("Login Failed - Check username/password");
  }
};
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[60vh] p-4 transition-colors duration-300" :style="{ backgroundColor: isDark.value ? '#0f172a' : '#ffffff' }">
    <div class="p-8 rounded-xl shadow-lg border w-full max-w-md transition-colors" :style="{ 
      backgroundColor: isDark.value ? '#1f2937' : '#ffffff',
      borderColor: isDark.value ? '#374151' : '#e5e7eb',
    }">
      <h2 class="text-2xl font-bold mb-6 text-center transition-colors" :style="{ color: isDark.value ? '#f1f5f9' : '#111827' }">Login</h2>
      <input v-model="username" type="text" placeholder="Username" class="w-full p-2 mb-4 border rounded transition-colors" :style="{ 
        backgroundColor: isDark.value ? '#111827' : '#ffffff',
        borderColor: isDark.value ? '#4b5563' : '#d1d5db',
        color: isDark.value ? '#f1f5f9' : '#111827'
      }" />
      <input v-model="password" type="password" placeholder="Password" class="w-full p-2 mb-6 border rounded transition-colors" :style="{ 
        backgroundColor: isDark.value ? '#111827' : '#ffffff',
        borderColor: isDark.value ? '#4b5563' : '#d1d5db',
        color: isDark.value ? '#f1f5f9' : '#111827'
      }" />
      <button @click="handleLogin" class="w-full text-white py-2 rounded-lg font-bold transition hover:opacity-90" :style="{ backgroundColor: isDark.value ? '#1e40af' : '#2563eb' }">Login</button>
    </div>
  </div>
</template>