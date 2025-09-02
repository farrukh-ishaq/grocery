import medusa from '@/app/lib/medusa'
import {Cart, LineItem} from "grocer/.medusa/types/query-entry-points";

class CartService {
    async initializeCart(regionId: string): Promise<Cart> {
        const storedCartId = localStorage.getItem('cart_id')
        let currentCart: Cart | null = null

        if (storedCartId) {
            try {
                const response = await medusa.carts.retrieve(storedCartId)
                currentCart = response.cart
            } catch {
                localStorage.removeItem('cart_id')
            }
        }

        if (!currentCart) {
            const response = await medusa.carts.create({ region_id: regionId })
            currentCart = response.cart
            if (currentCart?.id) localStorage.setItem('cart_id', currentCart.id)
        }

        return currentCart!
    }

    async addItem(cartId: string, variantId: string, quantity: number, price?: number): Promise<LineItem[]> {
        const response = await medusa.carts.lineItems.create(cartId, { variant_id: variantId, quantity })
        return response.cart.items.map((item: LineItem) => ({ ...item, price: price ?? 0 }))
    }

    async updateItem(cartId: string, lineItemId: string, quantity: number) {
        const response = await medusa.carts.lineItems.update(cartId, lineItemId, { quantity })
        return response.cart
    }

    async removeItem(cartId: string, lineItemId: string) {
        const response = await medusa.carts.lineItems.delete(cartId, lineItemId)
        return response.cart
    }
}

export const cartService = new CartService()
