'use client'

import Link from 'next/link'
import Image from 'next/image'
import AddToCartButton from './AddToCartButton'
import { formatPrice } from '@/app/lib/formatPrice'

interface ProductCardProps {
    id: string
    title: string
    description?: string | null
    price: number | null
    imageUrl?: string | null
    variantId?: string | null
}

export default function ProductCard({
                                        id,
                                        title,
                                        description,
                                        price,
                                        imageUrl,
                                        variantId
                                    }: ProductCardProps) {
    const hasImage = !!imageUrl

    return (
        <div className="group bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200">
            {/* Link for image + title */}
            <Link href={`/products/${id}`} className="block">
                <div className="relative aspect-square bg-gray-50">
                    {hasImage ? (
                        <Image
                            src={imageUrl!}
                            alt={title || 'Product image'}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                            <span className="text-gray-400 text-sm">No image</span>
                        </div>
                    )}
                </div>

                <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{title}</h3>
                    {description && (
                        <p className="text-gray-600 text-xs md:text-sm mb-3 line-clamp-2 leading-relaxed">
                            {description}
                        </p>
                    )}
                </div>
            </Link>

            {/* Price + Add to Cart button */}
            <div className="p-4 flex items-center justify-between">
                <span className="font-bold text-primary text-sm md:text-base">{formatPrice(price ?? 0)}</span>
                {variantId && <AddToCartButton variantId={variantId} />}
            </div>
        </div>
    )
}
