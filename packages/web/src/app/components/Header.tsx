'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false) // You'll update this with auth state
    const pathname = usePathname()
    const router = useRouter()
    const isHomePage = pathname === '/'

    const handleBack = () => {
        router.back()
    }
    return (
        <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {!isHomePage && (
                        <button
                            onClick={handleBack}
                            aria-label="Go back"
                        >
                            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
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

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
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
                    </nav>
                )}
            </div>
        </header>
    )
}
