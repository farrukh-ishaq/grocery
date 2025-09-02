// app/components/Header.tsx
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useCart } from '@/app/context/CartContext'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const pathname = usePathname()
    const router = useRouter()
    const isHomePage = pathname === '/'

    const { cart } = useCart()

    // Always safe: reduce to 0 if cart/items are undefined
    const cartCount = cart?.items?.reduce((total, item) => total + (item.quantity || 0), 0) || 0

    const handleBack = () => {
        router.back()
    }

    return (
        <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Back button (not on homepage) */}
                    {!isHomePage && (
                        <button
                            onClick={handleBack}
                            aria-label="Go back"
                            className="p-1"
                        >
                            <svg
                                className="w-6 h-6 text-gray-700"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>
                    )}

                    {/* Logo */}
                    <Link href="/" className="text-xl font-bold text-gray-900">
                        GrocerStore
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        <Link href="/products" className="text-gray-700 hover:text-gray-900">
                            Products
                        </Link>
                        <Link href="/offers" className="text-gray-700 hover:text-gray-900">
                            Offers
                        </Link>
                        <Link href="/orders" className="text-gray-700 hover:text-gray-900">
                            Orders
                        </Link>
                        <Link href="/account" className="text-gray-700 hover:text-gray-900">
                            My Account
                        </Link>
                    </nav>

                    {/* Right side: Auth + Cart */}
                    <div className="flex items-center space-x-4">
                        {/* Auth */}
                        {isLoggedIn ? (
                            <button
                                onClick={() => setIsLoggedIn(false)}
                                className="text-gray-700 hover:text-gray-900"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link href="/login" className="text-gray-700 hover:text-gray-900">
                                Login
                            </Link>
                        )}

                        {/* Cart */}
                        <Link href="/cart" className="relative">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-gray-700 hover:text-gray-900"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7h13l-1.5-7M7 13h10M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"
                                />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
                            )}
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span className="sr-only">Open menu</span>
                        <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                            <span className="block w-6 h-0.5 bg-gray-900"></span>
                            <span className="block w-6 h-0.5 bg-gray-900"></span>
                            <span className="block w-6 h-0.5 bg-gray-900"></span>
                        </div>
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <nav className="md:hidden py-4 space-y-4 border-t">
                        <Link href="/products" className="block text-gray-700 hover:text-gray-900">
                            Products
                        </Link>
                        <Link href="/offers" className="block text-gray-700 hover:text-gray-900">
                            Offers
                        </Link>
                        <Link href="/orders" className="block text-gray-700 hover:text-gray-900">
                            Orders
                        </Link>
                        <Link href="/account" className="block text-gray-700 hover:text-gray-900">
                            My Account
                        </Link>

                        <div className="pt-4 border-t">
                            {isLoggedIn ? (
                                <button
                                    onClick={() => setIsLoggedIn(false)}
                                    className="text-gray-700 hover:text-gray-900"
                                >
                                    Logout
                                </button>
                            ) : (
                                <Link href="/login" className="text-gray-700 hover:text-gray-900">
                                    Login
                                </Link>
                            )}
                        </div>

                        {/* Mobile Cart */}
                        <Link
                            href="/cart"
                            className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7h13l-1.5-7M7 13h10M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"
                                />
                            </svg>
                            {cartCount > 0 && (
                                <span className="bg-blue-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
                  {cartCount}
                </span>
                            )}
                            <span>Cart</span>
                        </Link>
                    </nav>
                )}
            </div>
        </header>
    )
}
