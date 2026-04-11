<script setup lang="ts">
import { useCartStore } from '../stores/cart'
import { inject, ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';

interface Product {
  id: number
  title: string
  price: number
  thumbnail: string
  category: string
  stock: number
  rating: number
}

const props = defineProps<{ product: Product }>()
const cartStore = useCartStore()
const router = useRouter()
const isDark = inject<Ref<boolean>>('isDark') ?? ref(false)

const viewDetails = () => {
  router.push(`/product/${props.product.id}`)
}
</script>

<template>
  <article class="border rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col h-full" :style="{
    backgroundColor: isDark ? '#0f172a' : '#ffffff',
    borderColor: isDark ? '#334155' : '#e5e7eb'
  }">
    <div class="overflow-hidden rounded-t-3xl bg-slate-950">
      <img :src="props.product.thumbnail" alt="{{ props.product.title }}" class="w-full h-52 object-cover transition-transform duration-500 hover:scale-105" />
    </div>

    <div class="px-5 py-4 flex flex-col grow">
      <div class="flex items-center justify-between mb-3 gap-3">
        <span class="uppercase tracking-[0.2em] font-semibold rounded-full px-3 py-1 text-xs" :style="{
          color: isDark ? '#a7f3d0' : '#065f46',
          backgroundColor: isDark ? 'rgba(16,185,129,0.12)' : 'rgba(16,185,129,0.08)'
        }">{{ props.product.category }}</span>

        <span class="inline-flex items-center gap-1 text-sm font-semibold" :style="{ color: isDark ? '#f8fafc' : '#1f2937' }">
          <span>★</span>{{ props.product.rating.toFixed(1) }}
        </span>
      </div>

      <h3 class="font-semibold text-lg leading-7 mb-3 truncate" :style="{ color: isDark ? '#f8fafc' : '#111827' }">{{ props.product.title }}</h3>

      <div class="flex items-end justify-between gap-3 mb-5">
        <div>
          <p class="text-2xl font-bold" :style="{ color: isDark ? '#34d399' : '#10b981' }">${{ props.product.price }}</p>
          <p class="text-sm mt-1" :style="{ color: isDark ? '#94a3b8' : '#6b7280' }">Stock: {{ props.product.stock }}</p>
        </div>
        <span class="text-sm font-medium" :style="{ color: isDark ? '#cbd5e1' : '#4b5563' }">Available</span>
      </div>

      <div class="flex gap-2 mb-4">
        <button
          @click="viewDetails"
          class="flex-1 rounded-2xl py-3 font-semibold transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          :style="{
            backgroundColor: isDark ? '#065f46' : '#d1fae5',
            color: isDark ? '#ecfdf5' : '#065f46'
          }"
        >
          View Details
        </button>
      </div>

      <button
        @click="cartStore.addToCart(props.product)"
        class="w-full rounded-2xl py-3 font-semibold transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        :style="{
          backgroundColor: isDark ? '#10b981' : '#16a34a',
          color: '#ffffff'
        }"
      >
        Add to Cart
      </button>
    </div>
  </article>
</template>