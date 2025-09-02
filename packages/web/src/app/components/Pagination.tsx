// app/components/ui/Pagination.tsx
interface PaginationProps {
    currentPage: number
    totalPages: number
    baseUrl: string
    sort?: string
}

export default function Pagination({ currentPage, totalPages, baseUrl, sort }: PaginationProps) {
    if (totalPages <= 1) return null

    const getPageUrl = (page: number) => {
        const params = new URLSearchParams()
        params.set('page', page.toString())
        if (sort) params.set('sort', sort)
        return `${baseUrl}?${params.toString()}`
    }

    return (
        <div className="flex justify-center mt-12">
            <nav className="flex items-center space-x-2">
                {currentPage > 1 && (
                    <a
                        href={getPageUrl(currentPage - 1)}
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
                    >
                        Previous
                    </a>
                )}

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = Math.max(1, Math.min(currentPage - 2, totalPages - 4)) + i
                    return (
                        <a
                            key={pageNum}
                            href={getPageUrl(pageNum)}
                            className={`px-3 py-2 border rounded-md text-sm ${
                                pageNum === currentPage
                                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                                    : 'border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                            {pageNum}
                        </a>
                    )
                })}

                {currentPage < totalPages && (
                    <a
                        href={getPageUrl(currentPage + 1)}
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
                    >
                        Next
                    </a>
                )}
            </nav>
        </div>
    )
}
