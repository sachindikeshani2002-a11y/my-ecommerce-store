<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import ProductCard from './components/ProductCard.vue'
// Import the interfaces from your Product.ts file
import type { Product, ProductResponse } from './types/Product'

// 1. Strictly typed state management [cite: 15, 51]
const products = ref<Product[]>([])
const searchQuery = ref('')
const loading = ref(true)

// 2. Fetch data from the MANDATORY DummyJSON API 
const fetchProducts = async () => {
  try {
    const response = await fetch('https://dummyjson.com/products')
    const data: ProductResponse = await response.json()
    
    // DummyJSON returns an object with a .products array [cite: 56]
    products.value = data.products
  } catch (error) {
    console.error('Error fetching products:', error)
  } finally {
    loading.value = false
  }
}

// 3. Search functionality [cite: 21]
const filteredProducts = computed(() => {
  return products.value.filter(product =>
    product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

onMounted(fetchProducts)
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <header class="max-w-6xl mx-auto mb-10 text-center">
      <h1 class="text-3xl font-extrabold text-blue-800 mb-6">Modern E-Commerce Store</h1>
      
      <div class="max-w-md mx-auto relative">
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search items..." 
          class="w-full p-4 pl-12 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
        />
        <span class="absolute left-4 top-4 text-gray-400">🔍</span>
      </div>
    </header>

    <main class="max-w-6xl mx-auto">
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <ProductCard 
          v-for="product in filteredProducts" 
          :key="product.id" 
          :product="product" 
        />
      </div>

      <div v-if="!loading && filteredProducts.length === 0" class="text-center py-20 text-gray-400">
        No products found for "{{ searchQuery }}"
      </div>
    </main>
  </div>
</template>