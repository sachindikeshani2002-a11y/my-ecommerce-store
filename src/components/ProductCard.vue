<script setup lang="ts">
import type { Product } from '../types/Product';

defineProps<{
  product: Product;
}>();

const emit = defineEmits(['add-to-cart']);
</script>

<template>
  <div class="border rounded-2xl p-4 bg-white shadow-sm hover:shadow-xl transition-all flex flex-col h-full">
    <img v-if="product" :src="product.image" :alt="product.title" class="h-40 w-full object-contain mb-4" />
    <h2 class="font-bold text-gray-800 text-sm mb-2 line-clamp-2">{{ product.title }}</h2>
    
    <div class="mt-auto">
      <p class="text-blue-600 font-bold text-lg mb-3">${{ product.price }}</p>
      
      <button 
        @click="emit('add-to-cart', product)"
        class="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-colors font-medium"
      >
        Add to Cart
      </button>
    </div>
  </div>
</template>