// components/CategoryCard.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Category } from '@/app/hooks/useCategories'

interface CategoryCardProps {
    category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
    return (
        <Link href={`/products?category=${category.id}`}> {/* Changed from collection to category */}
            <div className="group bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer">
                {/* Image and content remains the same */}
                <div className="relative aspect-video bg-gray-50">
                    {category.image ? (
                        <Image
                            src={category.image}
                            alt={category.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-200"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100">
                            <div className="text-gray-600 text-4xl">🛒</div>
                        </div>
                    )}
                </div>

                <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                        {category.name}
                    </h3>

                    {category.description && (
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {category.description}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    )
}
