// app/components/ui/ProductImage.tsx
import Image from 'next/image'

interface ProductImageProps {
    src?: string | null
    alt: string
    className?: string
    width?: number
    height?: number
    fill?: boolean
}

export default function ProductImage({
                                         src,
                                         alt,
                                         className = "",
                                         width,
                                         height,
                                         fill = false
                                     }: ProductImageProps) {
    if (!src) {
        return (
            <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
                <span className="text-gray-400">No image</span>
            </div>
        )
    }

    if (fill) {
        return (
            <Image
                src={src}
                alt={alt}
                fill
                className={`object-cover ${className}`}
            />
        )
    }

    return (
        <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={`object-cover ${className}`}
        />
    )
}
