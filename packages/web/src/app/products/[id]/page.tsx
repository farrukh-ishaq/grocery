// app/products/[id]/page.tsx
import { notFound } from 'next/navigation'
import AddToCartButton from '@/app/components/AddToCartButton'
import {productService} from "@/app/services/productService";
import Breadcrumb from "@/app/components/Breadcrumb";
import ProductImage from "@/app/components/ProductImage";
import {formatPrice} from "@/app/lib/formatPrice";

interface ProductPageProps {
    params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params
    const product = await productService.getProductById(id)

    if (!product) {
        notFound()
    }

    const price = productService.getProductPrice(product)
    const mainImage = productService.getProductImageUrl(product)
    const variantId = productService.getFirstVariantId(product)

    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: product.title }
    ]
        console.log('Rendering product page for:', product)
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Breadcrumb items={breadcrumbItems} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Product Image */}
                    <div className="aspect-square bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <ProductImage
                            src={mainImage}
                            alt={product.title}
                            width={600}
                            height={600}
                        />
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                {product.title}
                            </h1>
                            <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-primary">
                  {formatPrice(price)}
                </span>
                            </div>
                        </div>

                        {/* Description */}
                        {product.description && (
                            <div>
                                <h2 className="text-lg font-semibold mb-3">Description</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>
                        )}

                        {/* Add to Cart */}
                        <div className="pt-6 border-t border-gray-200">
                            {variantId && (
                                <AddToCartButton
                                    variantId={variantId}
                                    className="w-full"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
