<script setup lang="ts">
import { useCartStore } from '../stores/cart'
import { inject } from 'vue';

const props = defineProps(['product'])
const cartStore = useCartStore()
const isDark = inject('isDark', { value: false })
</script>

<template>
  <div class="border rounded-xl overflow-hidden shadow-sm hover:shadow-md flex flex-col h-full p-4 transition-all" :style="{ 
    backgroundColor: isDark.value ? '#1f2937' : '#ffffff',
    borderColor: isDark.value ? '#374151' : '#e5e7eb',
  }">
    <img :src="product.thumbnail" class="w-full h-48 object-cover rounded-lg mb-4" />
    
    <div class="flex flex-col grow">
      <h3 class="font-bold text-lg truncate transition-colors" :style="{ color: isDark.value ? '#f1f5f9' : '#111827' }">{{ product.title }}</h3>
      <p class="font-bold text-xl mb-4 transition-colors" :style="{ color: isDark.value ? '#93c5fd' : '#2563eb' }">${{ product.price }}</p>

      <button 
        @click="cartStore.addToCart(product)"
        class="mt-auto w-full py-2 rounded-lg font-semibold transition hover:scale-105 text-white"
        :style="{ backgroundColor: isDark.value ? '#1e40af' : '#2563eb' }"
      >
        Add to Cart
      </button>
    </div>
  </div>
</template>