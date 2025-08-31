'use client'

interface AddToCartButtonProps {
    productId: string
    className?: string
}

export default function AddToCartButton({ productId, className = '' }: AddToCartButtonProps) {
    const handleAddToCart = () => {
        console.log('Add to cart:', productId)
        // Add your cart logic here
    }

    return (
        <button
            onClick={handleAddToCart}
            className={`bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors duration-200 font-medium ${className}`}
        >
            Add to Cart
        </button>
    )
}
