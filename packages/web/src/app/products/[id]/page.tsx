import { notFound } from 'next/navigation'
import Image from 'next/image'
import medusa from '@/app/lib/medusa'
import { Product } from "grocer/.medusa/types/query-entry-points"
import { formatPrice } from '@/app/lib/utils'
import AddToCartButton from '@/app/components/AddToCartButton'

interface ProductPageProps {
    params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params

    let product: Product | null = null

    try {
        // Try different API endpoints - Medusa might use different endpoints
        try {
            // First try the regular retrieve endpoint
            const response = await medusa.products.retrieve(id)
            product = response.product
        } catch (firstError) {
            console.log('First attempt failed, trying admin endpoint...')
            // If that fails, try listing and filtering
            const allProducts = await medusa.products.list()
            product = allProducts.products.find(p => p.id === id) || null
        }

        if (!product) {
            console.log('Product not found with ID:', id)
            notFound()
        }
    } catch (error) {
        console.error('Error fetching product:', error)
        notFound()
    }

    const getPrice = () => {
        try {
            return (
                product!.variants?.[0]?.price_set?.prices?.[0]?.amount ||
                0
            )
        } catch {
            return 0
        }
    }

    const price = getPrice()
    const mainImage = product.thumbnail || product.images?.[0]?.url

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="mb-8">
                    <ol className="flex items-center space-x-2 text-sm text-gray-600">
                        <li><a href="/" className="hover:text-gray-900">Home</a></li>
                        <li className="before:content-['/'] before:mx-2">
                            <a href="/products" className="hover:text-gray-900">Products</a>
                        </li>
                        <li className="before:content-['/'] before:mx-2">
                            <span className="text-gray-900">{product.title}</span>
                        </li>
                    </ol>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Product Image */}
                    <div className="aspect-square bg-white rounded-lg border border-gray-200 overflow-hidden">
                        {mainImage ? (
                            <Image
                                src={mainImage}
                                alt={product.title}
                                width={600}
                                height={600}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                <span className="text-gray-400">No image</span>
                            </div>
                        )}
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

                        {/* Add to Cart - Using Client Component */}
                        <div className="pt-6 border-t border-gray-200">
                            <AddToCartButton productId={product.id} className="w-full" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
