<script setup lang="ts">
import { ref, onMounted, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCartStore } from '../stores/cart';
import type { Product } from '../types/Product';

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();
const isDark = inject('isDark', ref(false));

const product = ref<Product | null>(null);
const loading = ref(true);
const error = ref('');

onMounted(async () => {
  const productId = route.params.id;
  try {
    const res = await fetch(`https://dummyjson.com/products/${productId}`);
    if (!res.ok) throw new Error('Product not found');
    const data = await res.json();
    product.value = data;
  } catch (err) {
    error.value = 'Failed to load product details';
    console.error(err);
  } finally {
    loading.value = false;
  }
});

const addToCart = () => {
  if (product.value) {
    cartStore.addToCart(product.value);
  }
};

const goBack = () => {
  router.push('/');
};
</script>

<template>
  <div class="min-h-screen p-6 transition-colors duration-300" :style="{ backgroundColor: isDark ? '#020617' : '#ffffff' }">
    <div v-if="loading" class="text-center mt-10" :style="{ color: isDark ? '#9ca3af' : '#4b5563' }">
      Loading product details...
    </div>

    <div v-else-if="error" class="text-center mt-10" :style="{ color: isDark ? '#ef4444' : '#dc2626' }">
      {{ error }}
    </div>

    <div v-else-if="product" class="max-w-4xl mx-auto">
      <button
        @click="goBack"
        class="mb-6 px-4 py-2 rounded-lg font-medium transition hover:shadow-md"
        :style="{
          backgroundColor: isDark ? '#374151' : '#f3f4f6',
          color: isDark ? '#d1d5db' : '#374151'
        }"
      >
        ← Back to Products
      </button>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Product Image -->
        <div class="space-y-4">
          <div class="aspect-square rounded-2xl overflow-hidden shadow-xl" :style="{ backgroundColor: isDark ? '#0f172a' : '#ffffff' }">
            <img :src="product.thumbnail" :alt="product.title" class="w-full h-full object-cover" />
          </div>
        </div>

        <!-- Product Details -->
        <div class="space-y-6">
          <div>
            <span class="inline-block uppercase tracking-[0.2em] font-semibold rounded-full px-3 py-1 text-xs mb-3" :style="{
              color: isDark ? '#a7f3d0' : '#065f46',
              backgroundColor: isDark ? 'rgba(16,185,129,0.12)' : 'rgba(16,185,129,0.08)'
            }">
              {{ product.category }}
            </span>
            <h1 class="text-3xl font-bold mb-2" :style="{ color: isDark ? '#f8fafc' : '#111827' }">
              {{ product.title }}
            </h1>
            <div class="flex items-center gap-2 mb-4">
              <span class="text-yellow-500">★</span>
              <span class="font-semibold" :style="{ color: isDark ? '#f8fafc' : '#1f2937' }">
                {{ product.rating.toFixed(1) }}
              </span>
            </div>
          </div>

          <div class="text-4xl font-bold" :style="{ color: isDark ? '#34d399' : '#10b981' }">
            ${{ product.price }}
          </div>

          <div v-if="product.description" class="text-lg leading-relaxed" :style="{ color: isDark ? '#cbd5e1' : '#4b5563' }">
            {{ product.description }}
          </div>

          <div class="flex items-center gap-4 text-sm" :style="{ color: isDark ? '#94a3b8' : '#6b7280' }">
            <span>Stock: {{ product.stock || 'N/A' }}</span>
          </div>

          <button
            @click="addToCart"
            class="w-full py-4 px-6 rounded-2xl font-semibold text-white text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            :style="{ backgroundColor: isDark ? '#10b981' : '#16a34a' }"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>