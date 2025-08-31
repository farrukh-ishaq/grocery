import type { Metadata } from 'next'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import './globals.css'

export const metadata: Metadata = {
    title: 'GrocerStore - Fresh Products Delivered',
    description: 'Your favorite grocery store online',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
            {children}
        </main>
        <Footer />
        </body>
        </html>
    )
}
