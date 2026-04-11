<script setup>
import { ref, onMounted, inject, computed } from 'vue';
import ProductCard from '../components/ProductCard.vue';

const products = ref([]);
const isDark = inject('isDark', ref(false));

onMounted(async () => {
  const res = await fetch('https://dummyjson.com/products');
  const data = await res.json();
  products.value = data.products;
});
</script>

<template>
  <div class="min-h-screen p-6 transition-colors duration-300" :style="{ backgroundColor: isDark ? '#020617' : '#ffffff' }">
    <div v-if="products.length > 0" class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard v-for="p in products" :key="p.id" :product="p" />
    </div>
    <div v-else class="text-center mt-10" :style="{ color: isDark ? '#9ca3af' : '#4b5563' }">Loading Products...</div>
  </div>
</template>