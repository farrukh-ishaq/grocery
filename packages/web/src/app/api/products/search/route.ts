// app/api/products/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import medusa from '@/app/lib/medusa';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q');
        const limit = searchParams.get('limit') || '10';
        const offset = searchParams.get('offset') || '0';

        if (!query) {
            return NextResponse.json(
                { error: 'Search query is required' },
                { status: 400 }
            );
        }

        // Search products using Medusa client
        const { products } = await medusa.products.list({
            q: query,
            limit: parseInt(limit),
            offset: parseInt(offset)
        });

        return NextResponse.json({
            products,
            total: products.length,
            has_more: products.length === parseInt(limit)
        });

    } catch (error) {
        console.error('Search API error:', error);
        return NextResponse.json(
            { error: 'Failed to search products' },
            { status: 500 }
        );
    }
}
