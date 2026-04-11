<script setup>
import { ref, onMounted, inject, computed } from 'vue';
import ProductCard from '../components/ProductCard.vue';

const products = ref([]);
const searchQuery = ref('');
const selectedCategory = ref('All Categories');
const isDark = inject('isDark', ref(false));

onMounted(async () => {
  const res = await fetch('https://dummyjson.com/products');
  const data = await res.json();
  products.value = data.products;
});

const categories = computed(() => {
  const cats = ['All Categories'];
  products.value.forEach(p => {
    if (!cats.includes(p.category)) {
      cats.push(p.category);
    }
  });
  return cats;
});

const filteredProducts = computed(() => {
  return products.value.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory = selectedCategory.value === 'All Categories' || p.category === selectedCategory.value;
    return matchesSearch && matchesCategory;
  });
});
</script>

<template>
  <div class="min-h-screen p-6 transition-colors duration-300" :style="{ backgroundColor: isDark ? '#020617' : '#ffffff' }">
    <!-- Search and Filter Section -->
    <div class="mb-8 flex flex-col md:flex-row gap-4">
      <!-- Search Bar -->
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search products..."
        class="flex-1 px-4 py-3 rounded-lg border-2 transition-colors duration-300"
        :style="{
          backgroundColor: isDark ? '#1e293b' : '#ffffff',
          borderColor: isDark ? '#475569' : '#ddd',
          color: isDark ? '#e2e8f0' : '#000'
        }"
      />
      
      <!-- Category Dropdown -->
      <select
        v-model="selectedCategory"
        class="md:w-64 px-4 py-3 rounded-lg border-2 transition-colors duration-300"
        :style="{
          backgroundColor: isDark ? '#1e293b' : '#ffffff',
          borderColor: isDark ? '#475569' : '#ddd',
          color: isDark ? '#e2e8f0' : '#000'
        }"
      >
        <option v-for="cat in categories" :key="cat" :value="cat">
          {{ cat }}
        </option>
      </select>
    </div>

    <!-- Products Grid -->
    <div v-if="filteredProducts.length > 0" class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard v-for="p in filteredProducts" :key="p.id" :product="p" />
    </div>
    <div v-else class="text-center mt-10" :style="{ color: isDark ? '#9ca3af' : '#4b5563' }">
      {{ products.length === 0 ? 'Loading Products...' : 'No products found' }}
    </div>
  </div>
</template>