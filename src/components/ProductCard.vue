<script setup lang="ts">
import type { Product } from '../types/Product'

// Strictly typed props for A+ engineering
defineProps<{
  product: Product
}>()
</script>

<template>
  <div class="bg-white rounded-4xl p-6 shadow-sm border border-gray-50 flex flex-col h-full hover:shadow-md transition-all duration-500 group">
    
    <div class="bg-gray-50 rounded-3xl aspect-square flex items-center justify-center overflow-hidden mb-6 p-8 group-hover:scale-105 transition-transform duration-500">
      <img 
        :src="product.thumbnail" 
        :alt="product.title"
        class="max-w-full max-h-full object-contain mix-blend-multiply" 
      />
    </div>

    <div class="grow text-center">
      <h2 class="text-sm font-bold text-gray-800 leading-tight line-clamp-2 min-h-10 mb-3 px-2 tracking-tight">
        {{ product.title }}
      </h2>
      <p class="text-lg font-black text-blue-600 tracking-tighter">
        ${{ product.price }}
      </p>
    </div>

    <button class="w-full mt-6 bg-blue-600 text-white py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all duration-300 active:scale-95">
      Add to Cart
    </button>
  </div>
</template>