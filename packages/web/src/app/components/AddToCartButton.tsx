'use client'

import { useState } from 'react'
import { useCart } from '@/app/contexts/CartContext'

interface AddToCartButtonProps {
    variantId: string
    className?: string
}

export default function AddToCartButton({ variantId, className = "" }: AddToCartButtonProps) {
    const { addItem, updateItem, getItemQuantity, cart } = useCart()
    const [isUpdating, setIsUpdating] = useState(false)

    const currentQuantity = getItemQuantity(variantId)

    const handleAdd = async () => {
        setIsUpdating(true)
        try {
            if (currentQuantity > 0) {
                const lineId = cart?.items.find(i => i.variant_id === variantId)?.id
                if (lineId) await updateItem(lineId, currentQuantity + 1)
            } else {
                await addItem(variantId, 1)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsUpdating(false)
        }
    }

    const handleRemove = async () => {
        if (currentQuantity <= 0) return
        setIsUpdating(true)
        try {
            const lineId = cart?.items.find(i => i.variant_id === variantId)?.id
            if (lineId) await updateItem(lineId, currentQuantity - 1)
        } catch (error) {
            console.error(error)
        } finally {
            setIsUpdating(false)
        }
    }

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <button onClick={handleRemove} disabled={currentQuantity === 0 || isUpdating} className="px-2 py-1 bg-gray-300 rounded disabled:opacity-50">-</button>
            <span>{currentQuantity}</span>
            <button onClick={handleAdd} disabled={isUpdating} className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                {isUpdating ? "..." : "+"}
            </button>
        </div>
    )
}
