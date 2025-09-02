// app/products/page.tsx
import ProductCard from '@/app/components/ProductCard'
import ProductSearch from '@/app/components/ProductSearch'
import SortDropdown from '@/app/components/SortDropdown'
import {productService} from "@/app/services/productService";
import Pagination from "@/app/components/Pagination";

interface ProductsPageProps {
    searchParams: Promise<{
        q?: string
        page?: string
        sort?: string
        category?: string
    }>
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
    const params = await searchParams
    const searchQuery = params.q
    const categoryFilter = params.category
    const page = parseInt(params.page || '1')
    const sort = params.sort || 'created_at'

    const [productsData, currentCategory] = await Promise.all([
        productService.getProducts({
            q: searchQuery,
            category: categoryFilter,
            page,
            limit: 12,
            sort
        }),
        categoryFilter ? productService.getCategoryById(categoryFilter) : Promise.resolve(null)
    ])

    const { products, count: totalCount } = productsData
    const totalPages = Math.ceil(totalCount / 12)

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header with category info */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        {categoryFilter
                            ? `Category: ${currentCategory?.name || categoryFilter}`
                            : 'Our Products'
                        }
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        {categoryFilter
                            ? `Browse products in ${currentCategory?.name || 'this category'}`
                            : 'Discover our wide range of high-quality products.'
                        }
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="mb-8">
                    <ProductSearch initialQuery={searchQuery} />
                </div>

                {/* Results Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">
                        {searchQuery ? `Search Results for "${searchQuery}"` :
                            categoryFilter ? `Products in ${currentCategory?.name || 'Category'}` : 'All Products'}
                        <span className="text-gray-500 text-sm ml-2">
              ({products.length} of {totalCount} {totalCount === 1 ? 'product' : 'products'})
            </span>
                    </h2>

                    {!searchQuery && !categoryFilter && (
                        <SortDropdown currentSort={sort} />
                    )}
                </div>

                {/* Products Grid */}
                {products.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500">
                            {categoryFilter
                                ? `No products found in this category`
                                : 'No products found'
                            }
                        </p>
                        {categoryFilter && (
                            <a href="/products" className="text-blue-500 hover:text-blue-700 mt-2 inline-block">
                                View all products
                            </a>
                        )}
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {/* Pagination - show only if not filtering */}
                        {totalPages > 1 && !searchQuery && !categoryFilter && (
                            <Pagination
                                currentPage={page}
                                totalPages={totalPages}
                                baseUrl="/products"
                                sort={sort}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
