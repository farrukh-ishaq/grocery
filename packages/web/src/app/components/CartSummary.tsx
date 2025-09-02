'use client'

import { useCart } from "@/app/context/CartContext"
import { formatPrice } from "@/app/lib/utils"

export default function CartSummary() {
    const { cart } = useCart()

    if (!cart || cart.items.length === 0) return <p>Your cart is empty</p>

    // Compute total using actual item price if available
    const total = cart.items.reduce((sum, item) => {
        const price = item.price || 0 // ensure item.price exists in your LineItem type
        return sum + price * item.quantity
    }, 0)

    return (
        <div className="mt-6 p-4 border rounded bg-gray-50">
            <h3 className="font-semibold text-lg mb-2">Summary</h3>

            <ul className="mb-2">
                {cart.items.map((item) => (
                    <li key={item.id} className="flex justify-between text-sm md:text-base">
                        <span>{item.title} x {item.quantity}</span>
                        <span>{formatPrice((item.price || 0) * item.quantity)}</span>
                    </li>
                ))}
            </ul>

            <p className="font-bold text-lg">Total: {formatPrice(total)}</p>
        </div>
    )
}
