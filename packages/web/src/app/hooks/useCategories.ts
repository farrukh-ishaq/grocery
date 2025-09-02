'use client'

import { useState, useEffect } from 'react'
import medusa from '@/app/lib/medusa'

// Define the Medusa Product Category type
export interface MedusaProductCategory {
    id: string
    name: string
    description?: string
    handle?: string
    parent_category_id?: string
    parent_category?: MedusaProductCategory
    category_children?: MedusaProductCategory[]
    metadata?: {
        image_url?: string
        [key: string]: any
    }
    created_at?: string
    updated_at?: string
}

// Define the UI Category type
export interface Category {
    id: string
    name: string
    description?: string
    image?: string
    product_count?: number
    isParent?: boolean
    children?: Category[]
}

interface UseCategoriesReturn {
    categories: Category[]
    loading: boolean
    error: string | null
    refresh: () => void
}

export function useCategories(): UseCategoriesReturn {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const loadCategories = async () => {
        try {
            setLoading(true)

            // Use productCategories.list() with proper parameters
            const response = await medusa.productCategories.list({
                include_descendants_tree: true, // Get hierarchical structure
                limit: 100 // Get enough categories
            })

            // Transform Medusa product categories to UI categories
            const transformedCategories: Category[] = response.product_categories.map((category: MedusaProductCategory) => ({
                id: category.id,
                name: category.name,
                description: category.description || category.handle,
                image: category.metadata?.image_url || undefined,
                isParent: !category.parent_category_id, // Check if it's a parent category
                // You can add children if needed for hierarchical display
                children: category.category_children?.map(child => ({
                    id: child.id,
                    name: child.name,
                    description: child.description,
                    image: child.metadata?.image_url
                }))
            }))

            setCategories(transformedCategories)
            setError(null)

        } catch (err) {
            console.error('Error fetching product categories:', err)
            setError('Failed to load categories. Please check if the API endpoint is correct.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadCategories()
    }, [])

    const refresh = () => {
        loadCategories()
    }

    return { categories, loading, error, refresh }
}
