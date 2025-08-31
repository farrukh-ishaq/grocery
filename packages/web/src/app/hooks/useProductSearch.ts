'use client'

import { useState, useCallback } from 'react';
import { Product } from "grocer/.medusa/types/query-entry-points";

interface UseProductSearchReturn {
    products: Product[];
    loading: boolean;
    error: string | null;
    search: (query: string) => Promise<void>;
    clearResults: () => void;
}

export function useProductSearch(): UseProductSearchReturn {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const search = useCallback(async (query: string) => {
        if (!query.trim()) {
            setProducts([]);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/products/search?q=${encodeURIComponent(query)}`);

            if (!response.ok) {
                throw new Error('Search failed');
            }

            const data = await response.json();
            setProducts(data.products);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to search products');
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, []);

    const clearResults = useCallback(() => {
        setProducts([]);
        setError(null);
    }, []);

    return {
        products,
        loading,
        error,
        search,
        clearResults
    };
}
