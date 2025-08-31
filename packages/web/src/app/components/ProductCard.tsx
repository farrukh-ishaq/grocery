'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Product } from "grocer/.medusa/types/query-entry-points"
import { formatPrice } from '@/app/lib/utils'

interface ProductCardProps {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    // Extract price safely
    const getPrice = () => {
        try {
            return (
                product.variants?.[0]?.price_set?.prices?.[0]?.amount ||
                0
            )
        } catch {
            return 0
        }
    }

    const price = getPrice()
    const imageUrl = product.thumbnail || product.images?.[0]?.url
    const hasImage = !!imageUrl

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault() // Prevent navigation when clicking button
        e.stopPropagation()
        console.log('Add to cart:', product.id)
        // Add your cart logic here
    }

    return (
        <div className="group bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200">
            <Link href={`/products/${product.id}`} className="block">
                {/* Image Container */}
                <div className="relative aspect-square bg-gray-50">
                    {hasImage ? (
                        <Image
                            src={imageUrl}
                            alt={product.title || 'Product image'}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-200"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                            <span className="text-gray-400 text-sm">No image</span>
                        </div>
                    )}

                    {/* Quick add to cart button (hover on desktop) */}
                    <button
                        onClick={handleAddToCart}
                        className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 md:block hidden"
                        aria-label="Add to cart"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-4">
                    {/* Title */}
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight text-sm md:text-base">
                        {product.title}
                    </h3>

                    {/* Description */}
                    {product.description && (
                        <p className="text-gray-600 text-xs md:text-sm mb-3 line-clamp-2 leading-relaxed">
                            {product.description}
                        </p>
                    )}

                    {/* Price and Action */}
                    <div className="flex items-center justify-between">
            <span className="font-bold text-primary text-sm md:text-base">
              {formatPrice(price)}
            </span>

                        {/* Mobile add to cart button */}
                        <button
                            onClick={handleAddToCart}
                            className="bg-primary text-white px-3 py-1.5 rounded text-xs md:text-sm hover:bg-primary-dark transition-colors duration-200 md:hidden"
                        >
                            Add +
                        </button>

                        {/* Desktop add to cart button */}
                        <button
                            onClick={handleAddToCart}
                            className="bg-primary text-white px-3 py-1.5 rounded text-xs md:text-sm hover:bg-primary-dark transition-colors duration-200 hidden md:block"
                        >
                            Add to Cart
                        </button>
                    </div>

                    {/* Stock status */}
                    {product.variants?.[0]?.allow_backorder && (
                        <p className="text-xs text-green-600 mt-2">Available for backorder</p>
                    )}
                </div>
            </Link>
        </div>
    )
}
