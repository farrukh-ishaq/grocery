'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import SearchInput from './SearchInput'

interface ProductSearchProps {
    initialQuery?: string
}

export default function ProductSearch({ initialQuery = '' }: ProductSearchProps) {
    const router = useRouter()
    const [query, setQuery] = useState(initialQuery)

    useEffect(() => {
        setQuery(initialQuery)
    }, [initialQuery])

    const handleSearch = (searchQuery: string) => {
        const params = new URLSearchParams()
        if (searchQuery.trim()) {
            params.set('q', searchQuery.trim())
        }
        // Remove pagination and sort when searching
        params.delete('page')
        params.delete('sort')

        router.push(`/products?${params.toString()}`)
    }

    const handleClear = () => {
        setQuery('')
        router.push('/products')
    }

    return (
        <div className="max-w-2xl mx-auto">
            <SearchInput
                onSearch={handleSearch}
                onClear={handleClear}
                initialValue={initialQuery}
                placeholder="Search products by name, description..."
            />
        </div>
    )
}
