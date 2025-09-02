import medusa from "@/app/lib/medusa"
import {Product, ProductCategory, ProductVariant} from "grocer/.medusa/types/query-entry-points"

// todo: move to env
const REGION_ID = "reg_01K43DEVCMKZ1EJ0M7QDDK1NV1"

interface ProductFilters {
    q?: string
    category?: string
    page?: number
    limit?: number
    sort?: string
}

class ProductService {
    /**
     * Retrieve a product by ID with region context
     */
    async getProductById(id: string): Promise<Product | null> {
            try {
                const { products } = await medusa.products.list({
                    fields: `*variants.prices`,
                    region_id: REGION_ID })

                // @ts-ignore
                const productById = products.find(p => p.id === id) || null

                return productById
            } catch (e) {
                console.error("[ProductService] Both retrieval methods failed:", e)
                return null
            }
    }

    /**
     * List products with optional filters (search, category, pagination, sorting)
     */
    async getProducts(filters: ProductFilters = {}): Promise<{ products: Product[]; count: number }> {
        const { q, category, page = 1, limit = 12, sort = "created_at" } = filters
        const offset = (page - 1) * limit

        try {
            const { products = [], count = 0 } = await medusa.products.list({
                region_id: REGION_ID,
                ...(q && { q }),
                ...(category && { category_id: [category] }),
                limit,
                offset,
                order: sort,
            })

            return { products, count }
        } catch (error) {
            console.error("[ProductService] Error fetching products:", error)
            return { products: [], count: 0 }
        }
    }

    /**
     * Retrieve a category by ID
     */
    async getCategoryById(id: string): Promise<ProductCategory | null> {
        try {
            const { product_category } = await medusa.productCategories.retrieve(id)
            return product_category
        } catch (error) {
            console.error("[ProductService] Error fetching category:", error)
            return null
        }
    }

    /**
     * Extract the price from the first variant of a product
     */
    async getProductPrice(productId: string): Promise<number | null> {
        const productById = await this.getProductById(productId)
         // @ts-ignore
        const price  = await productById?.variants?.[0]?.prices?.[0]?.amount

        return price || 0
    }



    /**
     * Get the product's primary image
     */
    getProductImageUrl(product: Product): string | null {
        return product.thumbnail || product.images?.[0]?.url || null
    }

    /**
     * Get the first variant ID of a product
     */
    getFirstVariantId(product: Product): string | null {
        return product.variants?.[0]?.id || null
    }
}

export const productService = new ProductService()
