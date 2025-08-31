// app/products/page.tsx
import ProductCard from '@/app/components/ProductCard'
import ProductSearch from '@/app/components/ProductSearch'
import SortDropdown from '@/app/components/SortDropdown'
import medusa from '@/app/lib/medusa'
import { Product } from "grocer/.medusa/types/query-entry-points";

interface ProductsPageProps {
    searchParams: Promise<{
        q?: string
        page?: string
        sort?: string
    }>
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
    const params = await searchParams
    const searchQuery = params.q
    const page = parseInt(params.page || '1')
    const sort = params.sort || 'created_at'
    const limit = 12
    const offset = (page - 1) * limit

    let products: Product[] = [];
    let totalCount = 0

    try {
        const response = await medusa.products.list({
            ...(searchQuery && { q: searchQuery }),
            limit,
            offset,
            order: sort
        })
        products = response.products
        totalCount = response.count || 0
    } catch (error) {
        console.error('Error fetching products:', error)
        products = []
    }

    const totalPages = Math.ceil(totalCount / limit)

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Our Products</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Discover our wide range of high-quality products.
                    </p>
                </div>

                {/* Search */}
                <div className="mb-8">
                    <ProductSearch initialQuery={searchQuery} />
                </div>

                {/* Results Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">
                        {searchQuery ? `Search Results for "${searchQuery}"` : 'All Products'}
                        <span className="text-gray-500 text-sm ml-2">
              ({products.length} of {totalCount} {totalCount === 1 ? 'product' : 'products'})
            </span>
                    </h2>

                    {!searchQuery && (
                        <SortDropdown currentSort={sort} />
                    )}
                </div>

                {/* Products Grid */}
                {products.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No products found</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products.map((product: Product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && !searchQuery && (
                            <div className="flex justify-center mt-12">
                                <nav className="flex items-center space-x-2">
                                    {page > 1 && (
                                        <a
                                            href={`/products?page=${page - 1}&sort=${sort}`}
                                            className="px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
                                        >
                                            Previous
                                        </a>
                                    )}

                                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                        const pageNum = Math.max(1, Math.min(page - 2, totalPages - 4)) + i
                                        return (
                                            <a
                                                key={pageNum}
                                                href={`/products?page=${pageNum}&sort=${sort}`}
                                                className={`px-3 py-2 border rounded-md text-sm ${
                                                    pageNum === page
                                                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                                                        : 'border-gray-300 hover:bg-gray-50'
                                                }`}
                                            >
                                                {pageNum}
                                            </a>
                                        )
                                    })}

                                    {page < totalPages && (
                                        <a
                                            href={`/products?page=${page + 1}&sort=${sort}`}
                                            className="px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
                                        >
                                            Next
                                        </a>
                                    )}
                                </nav>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
