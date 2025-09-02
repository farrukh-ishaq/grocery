'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Product } from "grocer/.medusa/types/query-entry-points"
import { formatPrice } from '@/app/lib/formatPrice'
import AddToCartButton from './AddToCartButton'
import {productService} from "@/app/services/productService";

interface ProductCardProps {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    // Extract price safely
    const price = productService.getProductPrice(product) || 0
    const imageUrl = product.thumbnail || product.images?.[0]?.url
    const hasImage = !!imageUrl
    const variantId = product.variants?.[0]?.id

    return (
        <div className="group bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200">
            {/* Link for image + title */}
            <Link href={`/products/${product.id}`} className="block">
                <div className="relative aspect-square bg-gray-50">
                    {hasImage ? (
                        <Image
                            src={imageUrl}
                            alt={product.title || 'Product image'}
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
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.title}</h3>
                    {product.description && (
                        <p className="text-gray-600 text-xs md:text-sm mb-3 line-clamp-2 leading-relaxed">
                            {product.description}
                        </p>
                    )}
                </div>
            </Link>

            {/* Price + Add to Cart button */}
            <div className="p-4 flex items-center justify-between">
                <span className="font-bold text-primary text-sm md:text-base">{formatPrice(price)}</span>
                {variantId && (
                    <AddToCartButton  variantId={product.variants[0].id}/>
                )}
            </div>
        </div>
    )
}
