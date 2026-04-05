import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as any[]
  }),
  actions: {
    addToCart(product: any) {
      this.items.push(product)
      alert(`${product.title} added to cart!`)
    }
  }
})