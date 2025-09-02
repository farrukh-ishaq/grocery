// app/components/ui/Breadcrumb.tsx
interface BreadcrumbItem {
    label: string
    href?: string
}

interface BreadcrumbProps {
    items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
                {items.map((item, index) => (
                    <li key={index} className="flex items-center">
                        {index > 0 && <span className="mx-2">/</span>}
                        {item.href ? (
                            <a href={item.href} className="hover:text-gray-900">
                                {item.label}
                            </a>
                        ) : (
                            <span className="text-gray-900">{item.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    )
}
