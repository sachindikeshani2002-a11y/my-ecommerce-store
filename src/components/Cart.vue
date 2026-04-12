<script lang="ts">
import { defineComponent, computed, inject, ref } from 'vue';
import { useCartStore } from '../stores/cart';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const cartStore = useCartStore();
    const router = useRouter();
    const isDark = inject('isDark', ref(false));

    const removeFromCart = (productId: number) => {
      cartStore.removeFromCart(productId);
    };

    const updateQuantity = (productId: number, quantity: number) => {
      cartStore.updateQuantity(productId, quantity);
    };

    const clearCart = () => {
      if (confirm('Are you sure you want to clear your cart?')) {
        cartStore.clearCart();
      }
    };

    const goToCheckout = () => {
      alert('Checkout functionality would be implemented here!');
    };

    const continueShopping = () => {
      router.push('/');
    };

    const cartItems = computed(() => cartStore.cartItems);
    const totalItems = computed(() => cartStore.itemCount);
    const totalPrice = computed(() => cartStore.totalPrice);

    return {
      isDark,
      cartItems,
      totalItems,
      totalPrice,
      removeFromCart,
      updateQuantity,
      clearCart,
      goToCheckout,
      continueShopping
    };
  }
});
</script>

<template>
  <div class="min-h-screen p-6 transition-colors duration-300" :style="{ backgroundColor: isDark ? '#020617' : '#ffffff' }">
    <div class="max-w-4xl mx-auto">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold" :style="{ color: isDark ? '#f8fafc' : '#111827' }">
          Shopping Cart
        </h1>
        <button
          @click="continueShopping"
          class="px-4 py-2 rounded-lg font-medium transition hover:shadow-md"
          :style="{
            backgroundColor: isDark ? '#374151' : '#f3f4f6',
            color: isDark ? '#d1d5db' : '#374151'
          }"
        >
          ← Continue Shopping
        </button>
      </div>

      <!-- Empty Cart State -->
      <div v-if="totalItems === 0" class="text-center py-16">
        <div class="text-6xl mb-4">🛒</div>
        <h2 class="text-2xl font-semibold mb-4" :style="{ color: isDark ? '#f8fafc' : '#111827' }">
          Your cart is empty
        </h2>
        <p class="text-lg mb-8" :style="{ color: isDark ? '#9ca3af' : '#6b7280' }">
          Add some products to get started!
        </p>
        <button
          @click="continueShopping"
          class="px-8 py-3 rounded-lg font-semibold transition shadow-lg hover:shadow-xl"
          :style="{
            backgroundColor: isDark ? '#10b981' : '#16a34a',
            color: '#ffffff'
          }"
        >
          Start Shopping
        </button>
      </div>

      <!-- Cart Items -->
      <div v-else class="space-y-6">
        <div v-for="item in cartItems" :key="item.id" class="border rounded-2xl p-6 shadow-lg" :style="{
          backgroundColor: isDark ? '#0f172a' : '#ffffff',
          borderColor: isDark ? '#334155' : '#e5e7eb'
        }">
          <div class="flex gap-6">
            <!-- Product Image -->
            <div class="shrink-0">
              <img :src="item.thumbnail" :alt="item.title" class="w-24 h-24 object-cover rounded-lg" />
            </div>

            <!-- Product Details -->
            <div class="grow">
              <h3 class="text-xl font-semibold mb-2" :style="{ color: isDark ? '#f8fafc' : '#111827' }">
                {{ item.title }}
              </h3>
              <p class="text-sm mb-3" :style="{ color: isDark ? '#94a3b8' : '#6b7280' }">
                Category: {{ item.category }}
              </p>
              <div class="flex items-center gap-4 text-sm" :style="{ color: isDark ? '#cbd5e1' : '#4b5563' }">
                <span>Rating: ⭐ {{ item.rating.toFixed(1) }}</span>
                <span>Stock: {{ item.stock }}</span>
              </div>
            </div>

            <!-- Quantity and Price -->
            <div class="flex flex-col items-end gap-2">
              <div class="text-right">
                <p class="text-2xl font-bold" :style="{ color: isDark ? '#34d399' : '#10b981' }">
                  ${{ item.price }}
                </p>
                
                <!-- Quantity Controls -->
                <div class="flex items-center gap-2 mb-2">
                  <button
                    @click="updateQuantity(item.id, item.quantity - 1)"
                    class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition"
                    :style="{
                      backgroundColor: isDark ? '#374151' : '#f3f4f6',
                      color: isDark ? '#d1d5db' : '#374151'
                    }"
                    :disabled="item.quantity <= 1"
                  >
                    -
                  </button>
                  <span class="w-8 text-center font-semibold" :style="{ color: isDark ? '#f8fafc' : '#111827' }">
                    {{ item.quantity }}
                  </span>
                  <button
                    @click="updateQuantity(item.id, item.quantity + 1)"
                    class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition"
                    :style="{
                      backgroundColor: isDark ? '#374151' : '#f3f4f6',
                      color: isDark ? '#d1d5db' : '#374151'
                    }"
                  >
                    +
                  </button>
                </div>
                
                <p class="text-lg font-semibold" :style="{ color: isDark ? '#f8fafc' : '#111827' }">
                  Subtotal: ${{ (item.price * item.quantity).toFixed(2) }}
                </p>
              </div>

              <button
                @click="removeFromCart(item.id)"
                class="px-3 py-1 text-sm rounded-lg transition hover:shadow-md"
                :style="{
                  backgroundColor: isDark ? '#dc2626' : '#ef4444',
                  color: '#ffffff'
                }"
              >
                Remove
              </button>
            </div>
          </div>
        </div>

        <!-- Cart Summary -->
        <div class="border rounded-2xl p-6 shadow-lg" :style="{
          backgroundColor: isDark ? '#0f172a' : '#ffffff',
          borderColor: isDark ? '#334155' : '#e5e7eb'
        }">
          <div class="flex justify-between items-center mb-4">
            <span class="text-xl font-semibold" :style="{ color: isDark ? '#f8fafc' : '#111827' }">
              Cart Summary
            </span>
            <button
              @click="clearCart"
              class="px-4 py-2 text-sm rounded-lg transition hover:shadow-md"
              :style="{
                backgroundColor: isDark ? '#374151' : '#f3f4f6',
                color: isDark ? '#d1d5db' : '#374151'
              }"
            >
              Clear Cart
            </button>
          </div>

          <div class="space-y-2 mb-6">
            <div class="flex justify-between">
              <span :style="{ color: isDark ? '#cbd5e1' : '#4b5563' }">Total Items:</span>
              <span class="font-semibold" :style="{ color: isDark ? '#f8fafc' : '#111827' }">{{ totalItems }}</span>
            </div>
            <div class="flex justify-between text-xl font-bold">
              <span :style="{ color: isDark ? '#cbd5e1' : '#4b5563' }">Total Price:</span>
              <span :style="{ color: isDark ? '#34d399' : '#10b981' }">${{ totalPrice.toFixed(2) }}</span>
            </div>
          </div>

          <button
            @click="goToCheckout"
            class="w-full py-4 px-6 rounded-2xl font-semibold text-white text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            :style="{ backgroundColor: isDark ? '#10b981' : '#16a34a' }"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>