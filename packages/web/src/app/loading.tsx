export default function Loading() {
    return (
        <div className="container mx-auto px-4 pb-20">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
                        <div className="bg-gray-200 h-48 w-full"></div>
                        <div className="p-3">
                            <div className="h-4 bg-gray-200 rounded mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
