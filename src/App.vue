<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { Product } from './types/Product'
import ProductCard from './components/ProductCard.vue'

// State
const products = ref<Product[]>([])
const searchQuery = ref('')
const cart = ref<Product[]>([])

// Fetch Products
onMounted(async () => {
  try {
    const res = await fetch('https://fakestoreapi.com/products')
    const data: Product[] = await res.json()
    products.value = data
  } catch (error) {
    console.error('Error fetching products:', error)
  }
})

// Search Filter
const filteredProducts = computed(() => {
  return products.value.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Add to Cart
const handleAddToCart = (item: Product) => {
  cart.value.push(item)
}

// Cart Total
const cartTotal = computed(() => {
  const total = cart.value.reduce((sum, item) => sum + item.price, 0)
  return total.toFixed(2)
})
</script>

<template>
  <div class="p-6 bg-gray-50 min-h-screen font-sans text-gray-900">
    
    <!-- Header -->
    <header
      class="flex flex-col md:flex-row justify-between items-center mb-10 bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
    >
      <div>
        <h1 class="text-4xl font-black text-blue-700 tracking-tight">
          MODERN STORE
        </h1>
        <p class="text-gray-500 font-medium italic">
          University Project 2026
        </p>
      </div>

      <div class="flex items-center gap-6 mt-4 md:mt-0">
        <div class="text-right">
          <p class="text-xs text-gray-400 uppercase font-bold tracking-widest">
            Total Balance
          </p>
          <p class="text-2xl font-bold text-green-600">
            ${{ cartTotal }}
          </p>
        </div>

        <div
          class="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2"
        >
          <span>🛒</span>
          <span>Cart: {{ cart.length }}</span>
        </div>
      </div>
    </header>

    <!-- Search -->
    <div class="max-w-2xl mx-auto mb-12">
      <div class="relative group">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search items..."
          class="w-full p-5 pl-14 border-2 border-blue-50 bg-white rounded-2xl shadow-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
        />
        <span class="absolute left-5 top-5 text-2xl">🔍</span>
      </div>
    </div>

    <!-- Products -->
    <div
      v-if="filteredProducts.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
    >
      <ProductCard
        v-for="item in filteredProducts"
        :key="item.id"
        :product="item"
        @add-to-cart="handleAddToCart"
      />
    </div>

    <!-- Empty State -->
    <div
      v-else
      class="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200"
    >
      <p class="text-xl text-gray-400 font-medium">
        No products match your search.
      </p>
    </div>
  </div>
</template>