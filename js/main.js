// Main Application Entry Point
// This file initializes all components and handles page-specific logic

import { cartUI } from './components/cartUI.js';
import { productUI } from './components/productUI.js';
import { cartService } from './services/cartService.js';
import { showNotification, validateEmail, validatePhone } from './utils/uiHelpers.js';

// Initialize cart UI on all pages
cartUI.init();

// Page-specific initializations
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = getCurrentPage();

    switch (currentPage) {
        case 'shop':
            initShopPage();
            break;
        case 'cart':
            initCartPage();
            break;
        case 'checkout':
            initCheckoutPage();
            break;
        case 'payment':
            initPaymentPage();
            break;
        case 'contact':
            initContactPage();
            break;
    }
});

// Get current page name
function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('shop')) return 'shop';
    if (path.includes('cart')) return 'cart';
    if (path.includes('checkout')) return 'checkout';
    if (path.includes('payment')) return 'payment';
    if (path.includes('contact')) return 'contact';
    return 'home';
}

// Initialize shop page
function initShopPage() {
    const productList = document.getElementById('product-list');
    if (productList) {
        productUI.initProductList(productList);
    }
}

// Initialize cart page
function initCartPage() {
    const cartTable = document.querySelector('.cart-table');
    if (cartTable) {
        cartUI.renderCartItems(cartTable);
    }
}

// Initialize checkout page
function initCheckoutPage() {
    const orderItems = document.querySelector('.order-items');
    if (orderItems) {
        cartUI.renderOrderSummary(orderItems);
    }

    // Setup form validation
    const checkoutForm = document.querySelector('.checkout-info');
    if (checkoutForm) {
        setupCheckoutForm(checkoutForm);
    }
}

// Initialize payment page
function initPaymentPage() {
    const orderItems = document.querySelector('.summary-items');
    if (orderItems) {
        renderPaymentSummary(orderItems);
    }

    const payNowBtn = document.getElementById('pay-now-btn');
    if (payNowBtn) {
        payNowBtn.addEventListener('click', handlePayment);
    }
}

// Initialize contact page
function initContactPage() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

// Setup checkout form validation
function setupCheckoutForm(form) {
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateInput(input));
    });
}

// Validate input field
function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';

    if (input.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (input.type === 'email' && value && !validateEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
    }

    // Show/hide error message
    let errorElement = input.parentElement.querySelector('.error-message');
    if (!isValid) {
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'error-message text-danger small';
            input.parentElement.appendChild(errorElement);
        }
        errorElement.textContent = errorMessage;
        input.classList.add('is-invalid');
    } else {
        if (errorElement) errorElement.remove();
        input.classList.remove('is-invalid');
    }

    return isValid;
}

// Handle contact form submission
function handleContactSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    // Validate form
    const email = formData.get('email');
    const name = formData.get('name');
    const contact = formData.get('contact');
    const inquiry = formData.get('inquiry');

    if (!validateEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    if (!name || name.trim().length < 2) {
        showNotification('Please enter your name', 'error');
        return;
    }

    if (!validatePhone(contact)) {
        showNotification('Please enter a valid contact number', 'error');
        return;
    }

    if (!inquiry || inquiry.trim().length < 10) {
        showNotification('Please enter your inquiry (at least 10 characters)', 'error');
        return;
    }

    // TODO: Send to API when backend is ready
    // const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CONTACT}`, {
    //     method: 'POST',
    //     body: JSON.stringify(Object.fromEntries(formData))
    // });

    // For now, just show success message
    showNotification('Thank you! We received your inquiry and will get back to you soon.', 'success', 5000);
    form.reset();
}

// Render payment summary
function renderPaymentSummary(container) {
    const cart = cartService.getCart();
    const template = document.getElementById('summary-item-template');
    
    if (!container || !template) return;

    container.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const summaryItem = document.importNode(template.content, true);
        summaryItem.querySelector('.item-name').textContent = item.name;
        summaryItem.querySelector('.item-quantity').textContent = `x${item.quantity}`;
        summaryItem.querySelector('.item-total').textContent = `₱${itemTotal.toFixed(2)}`;

        container.appendChild(summaryItem);
    });

    const totalElement = document.querySelector('.total-amount');
    if (totalElement) {
        totalElement.textContent = `₱${total.toFixed(2)}`;
    }
}

// Handle payment
function handlePayment(e) {
    e.preventDefault();
    
    const total = cartService.getCartTotal();
    
    if (total <= 0) {
        showNotification('Your cart is empty. Please add items before proceeding to payment.', 'error');
        return;
    }

    // TODO: Integrate with payment API when backend is ready
    // For now, simulate payment success
    showNotification('Payment successful! Redirecting...', 'success', 2000);
    
    setTimeout(() => {
        cartService.clearCart();
        window.location.href = '../index.html';
    }, 2000);
}

