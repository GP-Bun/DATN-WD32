import React, { createContext, useContext, useMemo, useState } from 'react'
import type { Product, ProductVariant } from './mockData'

export type CartItem = { 
  product: Product
  variant: ProductVariant
  quantity: number
}
type CartContextValue = {
  items: CartItem[]
  add: (product: Product, variant: ProductVariant, quantity?: number) => void
  remove: (productId: number, variant: ProductVariant) => void
  clear: () => void
  total: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const add = (product: Product, variant: ProductVariant, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => 
        i.product.id === product.id && 
        i.variant.size === variant.size && 
        i.variant.color === variant.color
      )
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && 
          i.variant.size === variant.size && 
          i.variant.color === variant.color
            ? { ...i, quantity: i.quantity + quantity }
            : i
        )
      }
      return [...prev, { product, variant, quantity }]
    })
  }

  const remove = (productId: number, variant: ProductVariant) => {
    setItems((prev) => prev.filter((i) => 
      !(i.product.id === productId && 
        i.variant.size === variant.size && 
        i.variant.color === variant.color)
    ))
  }

  const clear = () => setItems([])

  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    [items]
  )

  const value = useMemo(() => ({ items, add, remove, clear, total }), [items, total])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}


