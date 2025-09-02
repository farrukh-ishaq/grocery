'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import medusa from "@/app/lib/medusa"

interface LineItem {
    id: string
    title: string
    quantity: number
    variant_id: string
    price: number
}

interface Cart {
    id: string
    items: LineItem[]
}

interface CartContextType {
    cart: Cart | null
    isLoading: boolean
    addItem: (variantId: string, quantity?: number) => Promise<void>
    updateItem: (lineItemId: string, quantity: number) => Promise<void>
    removeItem: (lineItemId: string) => Promise<void>
    getItemQuantity: (variantId: string) => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<Cart | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const initializeCart = async () => {
            try {
                const storedCartId = localStorage.getItem("cart_id")
                let currentCart: Cart | null = null

                if (storedCartId) {
                    try {
                        const response = await medusa.carts.retrieve(storedCartId)
                        currentCart = response.cart
                    } catch (error) {
                        console.error("Failed to retrieve cart:", error)
                        localStorage.removeItem("cart_id")
                    }
                }

                if (!currentCart) {
                    const response = await medusa.carts.create(
                        {
                            region_id: "reg_01K43DEVCMKZ1EJ0M7QDDK1NV1"
                        }
                    )
                    currentCart = response.cart
                    if(currentCart)
                        localStorage.setItem("cart_id", currentCart.id)
                    else
                        console.error("Current cart is null after creation")
                }

                setCart(currentCart)
            } catch (error) {
                console.error("Cart initialization failed:", error)
            } finally {
                setIsLoading(false)
            }
        }

        initializeCart()
    }, [])

    const addItem = async (variantId: string, quantity: number = 1) => {
        if (!cart) return

        try {
            const response = await medusa.carts.lineItems.create(cart.id, {
                variant_id: variantId,
                quantity,
            })
            setCart(response.cart)
        } catch (error) {
            console.error("Failed to add item:", error)
        }
    }

    const updateItem = async (lineItemId: string, quantity: number) => {
        if (!cart) return

        try {
            const response = await medusa.carts.lineItems.update(cart.id, lineItemId, {
                quantity
            })
            setCart(response.cart)
        } catch (error) {
            console.error("Failed to update item:", error)
        }
    }

    const removeItem = async (lineItemId: string) => {
        if (!cart) return

        try {
            const response = await medusa.carts.lineItems.delete(cart.id, lineItemId)
            setCart(response.cart)
        } catch (error) {
            console.error("Failed to remove item:", error)
        }
    }

    const getItemQuantity = (variantId: string): number => {
        if (!cart || !cart.items) return 0
        const item = cart.items.find((item: LineItem) => item.variant_id === variantId)
        return item ? item.quantity : 0
    }

    return (
        <CartContext.Provider value={{
            cart,
            isLoading,
            addItem,
            updateItem,
            removeItem,
            getItemQuantity
        }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = (): CartContextType => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
