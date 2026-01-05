// Cart Service - Handles all cart operations
// Ready for API integration

import { STORAGE_KEYS, CURRENCY_SYMBOL } from '../config/constants.js';

class CartService {
    constructor() {
        this.storageKey = STORAGE_KEYS.CART;
    }

    // Get cart from storage (or API in future)
    getCart() {
        const cartData = localStorage.getItem(this.storageKey);
        return cartData ? JSON.parse(cartData) : [];
    }

    // Save cart to storage (or API in future)
    saveCart(cart) {
        localStorage.setItem(this.storageKey, JSON.stringify(cart));
        this.notifyCartUpdate();
    }

    // Add item to cart
    addItem(item) {
        const cart = this.getCart();
        const existingItemIndex = cart.findIndex(
            cartItem => cartItem.id === item.id || cartItem.name === item.name
        );

        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += item.quantity || 1;
        } else {
            cart.push({
                ...item,
                quantity: item.quantity || 1
            });
        }

        this.saveCart(cart);
        return cart;
    }

    // Update item quantity
    updateQuantity(itemId, quantity) {
        if (quantity < 1) return this.removeItem(itemId);

        const cart = this.getCart();
        const itemIndex = cart.findIndex(item => 
            item.id === itemId || item.name === itemId
        );

        if (itemIndex > -1) {
            cart[itemIndex].quantity = quantity;
            this.saveCart(cart);
        }

        return cart;
    }

    // Remove item from cart
    removeItem(itemId) {
        const cart = this.getCart();
        const filteredCart = cart.filter(item => 
            item.id !== itemId && item.name !== itemId
        );
        this.saveCart(filteredCart);
        return filteredCart;
    }

    // Clear cart
    clearCart() {
        localStorage.removeItem(this.storageKey);
        this.notifyCartUpdate();
    }

    // Get cart count
    getCartCount() {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + (item.quantity || 0), 0);
    }

    // Get cart total
    getCartTotal() {
        const cart = this.getCart();
        return cart.reduce((total, item) => {
            return total + (item.price * (item.quantity || 0));
        }, 0);
    }

    // Format price
    formatPrice(price) {
        return `${CURRENCY_SYMBOL}${parseFloat(price).toFixed(2)}`;
    }

    // Notify listeners of cart updates
    notifyCartUpdate() {
        window.dispatchEvent(new CustomEvent('cartUpdated'));
    }

    // Future: API methods (commented out for now)
    /*
    async fetchCartFromAPI() {
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CART}`);
        return await response.json();
    }

    async syncCartToAPI(cart) {
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CART}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cart)
        });
        return await response.json();
    }
    */
}

// Export singleton instance
export const cartService = new CartService();

