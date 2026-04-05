<script setup>
import { ref, onMounted } from 'vue';
import ProductCard from '../components/ProductCard.vue';

const products = ref([]);

onMounted(async () => {
  const res = await fetch('https://dummyjson.com/products');
  const data = await res.json();
  products.value = data.products;
});
</script>

<template>
  <div class="p-6">
    <div v-if="products.length > 0" class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard v-for="p in products" :key="p.id" :product="p" />
    </div>
    <div v-else class="text-center mt-10">Loading Products...</div>
  </div>
</template>