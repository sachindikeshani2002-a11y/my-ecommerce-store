import { defineStore } from 'pinia'
import type { Product } from '../types/Product'

const CART_STORAGE_KEY = 'shopping-cart'

interface CartItem extends Product {
  quantity: number;
}

export const useCartStore = defineStore('cart', {
  state: () => {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    let items: CartItem[] = []
    if (stored) {
      try {
        items = JSON.parse(stored)
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error)
      }
    }
    return {
      items
    }
  },
  getters: {
    itemCount: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((total, item) => total + (item.price * item.quantity), 0),
    cartItems: (state) => state.items
  },
  actions: {
    addToCart(product: Product) {
      const existingItem = this.items.find(item => item.id === product.id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
      this.saveCart()
      alert(`${product.title} added to cart!`)
    },
    removeFromCart(productId: number) {
      const index = this.items.findIndex(item => item.id === productId)
      if (index > -1) {
        this.items.splice(index, 1)
        this.saveCart()
      }
    },
    updateQuantity(productId: number, quantity: number) {
      const item = this.items.find(item => item.id === productId)
      if (item) {
        if (quantity <= 0) {
          this.removeFromCart(productId)
        } else {
          item.quantity = quantity
          this.saveCart()
        }
      }
    },
    clearCart() {
      this.items = []
      this.saveCart()
    },
    saveCart() {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.items))
    }
  }
})