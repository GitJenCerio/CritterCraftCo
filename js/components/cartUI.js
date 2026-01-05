// Cart UI Component - Handles rendering cart-related UI

import { cartService } from '../services/cartService.js';
import { formatPrice } from '../utils/uiHelpers.js';

class CartUI {
    constructor() {
        this.cartService = cartService;
        this.init();
    }

    init() {
        this.updateCartCount();
        window.addEventListener('cartUpdated', () => this.updateCartCount());
    }

    // Update cart count badge
    updateCartCount() {
        const count = this.cartService.getCartCount();
        const cartCountElements = document.querySelectorAll('.cart-count');
        
        cartCountElements.forEach(element => {
            element.textContent = count;
            element.style.display = count > 0 ? 'inline-block' : 'none';
        });
    }

    // Render cart items
    renderCartItems(container) {
        const cart = this.cartService.getCart();
        const template = document.getElementById('cart-item-template');
        
        if (!container) return;

        // Clear existing items
        container.innerHTML = `
            <div class="cart-table-header">
                <span>Item</span>
                <span>Quantity</span>
                <span>Total</span>
            </div>
        `;

        if (cart.length === 0) {
            container.innerHTML += `
                <div class="cart-empty">
                    <p>Your cart is empty</p>
                    <a href="./shop.html" class="btn btn-warning">Continue Shopping</a>
                </div>
            `;
            // Update total to 0
            const totalElement = document.querySelector('.estimated-total span:last-child');
            if (totalElement) {
                totalElement.textContent = formatPrice(0);
            }
            return;
        }

        let total = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            if (template) {
                const cartItem = document.importNode(template.content, true);
                cartItem.querySelector('.item-image').src = item.image;
                cartItem.querySelector('.item-image').alt = item.name;
                cartItem.querySelector('.product-name').textContent = item.name;
                cartItem.querySelector('.product-price').textContent = formatPrice(item.price);
                cartItem.querySelector('.quantity').value = item.quantity;
                cartItem.querySelector('.quantity').setAttribute('data-id', item.id || item.name);
                cartItem.querySelector('.total-price').textContent = formatPrice(itemTotal);
                const removeBtn = cartItem.querySelector('.remove-btn');
                if (removeBtn) {
                    removeBtn.setAttribute('data-id', item.id || item.name);
                }

                container.appendChild(cartItem);
            }
        });

        // Update total
        const totalElement = document.querySelector('.estimated-total span:last-child');
        if (totalElement) {
            totalElement.textContent = formatPrice(total);
        }

        this.setupCartControls(container);
    }

    // Setup cart item controls
    setupCartControls(container) {
        // Quantity inputs
        container.querySelectorAll('.quantity').forEach(input => {
            // Remove existing listeners to prevent duplicates
            const newInput = input.cloneNode(true);
            input.parentNode.replaceChild(newInput, input);
            
            newInput.addEventListener('input', (e) => {
                const id = e.target.getAttribute('data-id');
                const quantity = parseInt(e.target.value) || 1;
                if (quantity < 1) {
                    e.target.value = 1;
                    return;
                }
                this.cartService.updateQuantity(id, quantity);
                this.renderCartItems(container);
            });
        });

        // Remove buttons
        container.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = button.getAttribute('data-id');
                if (id) {
                    this.cartService.removeItem(id);
                    this.renderCartItems(container);
                }
            });
        });
    }

    // Render order summary
    renderOrderSummary(container) {
        const cart = this.cartService.getCart();
        const template = document.getElementById('order-item-template');
        
        if (!container) return;

        container.innerHTML = '';

        let total = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const orderItem = document.importNode(template.content, true);
            orderItem.querySelector('.order-item-image').src = item.image;
            orderItem.querySelector('.order-item-image').alt = item.name;
            orderItem.querySelector('.product-name').textContent = item.name;
            orderItem.querySelector('.product-price').textContent = 
                `${formatPrice(item.price)} x ${item.quantity}`;
            orderItem.querySelector('.total-price').textContent = formatPrice(itemTotal);

            container.appendChild(orderItem);
        });

        // Update total
        const totalElement = document.querySelector('.total-amount');
        if (totalElement) {
            totalElement.textContent = formatPrice(total);
        }
    }
}

export const cartUI = new CartUI();

