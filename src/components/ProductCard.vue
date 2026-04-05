<script setup lang="ts">
import { useCartStore } from '../stores/cart'
// This tells the card which product to show
const props = defineProps(['product'])
const cartStore = useCartStore()
</script>

<template>
  <div class="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl overflow-hidden shadow-sm flex flex-col h-full p-4">
    <img :src="product.thumbnail" class="w-full h-48 object-cover rounded-lg mb-4" />
    
    <div class="flex flex-col flex-grow">
      <h3 class="font-bold text-lg dark:text-white truncate">{{ product.title }}</h3>
      <p class="text-blue-600 font-bold text-xl mb-4">${{ product.price }}</p>

      <button 
        @click="cartStore.addToCart(product)"
        class="mt-auto w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        Add to Cart
      </button>
    </div>
  </div>
</template>