'use client'

import { useState, useCallback } from 'react'

interface SearchInputProps {
    onSearch: (query: string) => void
    onClear: () => void
    initialValue?: string
    placeholder?: string
}

export default function SearchInput({
                                        onSearch,
                                        onClear,
                                        initialValue = '',
                                        placeholder = "Search products..."
                                    }: SearchInputProps) {
    const [query, setQuery] = useState(initialValue)

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault()
        onSearch(query)
    }, [query, onSearch])

    const handleClear = useCallback(() => {
        setQuery('')
        onClear()
    }, [onClear])

    return (
        <form onSubmit={handleSubmit} className="relative w-full">
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                {query && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-16 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                    >
                        ✕
                    </button>
                )}
                <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-1.5 rounded-md hover:bg-blue-600 text-sm"
                >
                    Search
                </button>
            </div>
        </form>
    )
}
