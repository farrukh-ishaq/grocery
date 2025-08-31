'use client'

import { useRouter } from 'next/navigation'

interface SortDropdownProps {
    currentSort: string
}

export default function SortDropdown({ currentSort }: SortDropdownProps) {
    const router = useRouter()

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const url = new URL(window.location.href)
        url.searchParams.set('sort', e.target.value)
        router.push(url.toString())
    }

    return (
        <select
            value={currentSort}
            onChange={handleSortChange}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
        >
            <option value="created_at">Newest First</option>
            <option value="-created_at">Oldest First</option>
            <option value="title">Name A-Z</option>
            <option value="-title">Name Z-A</option>
        </select>
    )
}
