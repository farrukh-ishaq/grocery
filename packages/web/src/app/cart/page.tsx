'use client'

import { useEffect, useState } from "react"
import { useCart } from "@/app/context/CartContext"
import CartSummary from "@/app/components/CartSummary"
import PayNowButton from "@/app/components/PayNowButton"

export default function Page() {
    const { cart, isLoading } = useCart()
    const [products, setProducts] = useState<any[]>([])
    const [loadingProducts, setLoadingProducts] = useState(true)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/products") // create API route if needed
                const data = await res.json()
                setProducts(data.products)
            } catch (err) {
                console.error("Failed to fetch products", err)
            } finally {
                setLoadingProducts(false)
            }
        }
        fetchProducts()
    }, [])

    if (isLoading || loadingProducts) return <p>Loading...</p>

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

            {cart && cart.items.length > 0 && (
                <>
                    <CartSummary />
                    <PayNowButton />
                </>
            )}

            {cart && cart.items.length === 0 && (
                <p>Your cart is empty.</p>
            )}
        </div>
    )
}
