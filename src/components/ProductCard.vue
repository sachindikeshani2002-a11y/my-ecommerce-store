<script setup lang="ts">
// We removed defineProps from the import because it's built-in!
import type { Product } from '../types/Product';

defineProps<{
  product: Product
}>();
</script>

<template>
  <div class="border rounded-lg p-4 shadow-md bg-white flex flex-col items-center hover:shadow-xl transition-shadow">
    <img :src="product.image" :alt="product.title" class="h-40 object-contain mb-4" />
    <h2 class="text-sm font-bold text-gray-800 line-clamp-2 mb-2 text-center h-10">
      {{ product.title }}
    </h2>
    <p class="text-green-600 font-bold mb-4">${{ product.price }}</p>
    <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full active:scale-95">
      Add to Cart
    </button>
  </div>
</template>

<style scoped>
/* Tailwind handles the styling */
</style>