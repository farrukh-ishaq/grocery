'use client'

import { Product } from "grocer/.medusa/types/query-entry-points";
import ProductCard from '@/app/components/ProductCard';

interface SearchResultsProps {
    products: Product[];
    loading: boolean;
    error: string | null;
    onRetry?: () => void;
}

export default function SearchResults({
                                          products,
                                          loading,
                                          error,
                                          onRetry
                                      }: SearchResultsProps) {
    if (loading) {
        return (
            <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8">
                <p className="text-red-500 mb-4">{error}</p>
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Try Again
                    </button>
                )}
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                No products found. Try a different search term.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-8">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
