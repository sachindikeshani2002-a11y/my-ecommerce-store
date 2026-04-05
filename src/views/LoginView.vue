<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('emilys'); 
const password = ref('emilyspass');
const router = useRouter();

const handleLogin = async () => {
  const res = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: username.value, password: password.value })
  });
  const data = await res.json();

  if (data.token) {
    localStorage.setItem('token', data.token); // Store JWT for bonus points
    router.push('/'); // Go to Home
  } else {
    alert("Login Failed - Check username/password");
  }
};
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[60vh] p-4">
    <div class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center dark:text-white">Login</h2>
      <input v-model="username" type="text" placeholder="Username" class="w-full p-2 mb-4 border rounded" />
      <input v-model="password" type="password" placeholder="Password" class="w-full p-2 mb-6 border rounded" />
      <button @click="handleLogin" class="w-full bg-blue-600 text-white py-2 rounded-lg font-bold">Login</button>
    </div>
  </div>
</template>