// Product UI Component - Handles product display and interactions

import { fetchProducts, getProductById } from '../data/products.js';
import { cartService } from '../services/cartService.js';
import { cartUI } from './cartUI.js';
import { showNotification } from '../utils/uiHelpers.js';
import { formatPrice } from '../utils/uiHelpers.js';

class ProductUI {
    constructor() {
        this.products = [];
        this.currentImageIndex = 0;
    }

    // Initialize product listing
    async initProductList(container) {
        try {
            this.products = await fetchProducts();
            this.renderProductList(container);
            this.setupProductInteractions();
        } catch (error) {
            console.error('Error loading products:', error);
            container.innerHTML = '<p>Error loading products. Please try again later.</p>';
        }
    }

    // Render product list
    renderProductList(container) {
        if (!container) return;

        container.innerHTML = '';

        this.products.forEach((product, index) => {
            const productCard = document.createElement('div');
            productCard.className = 'col-md-4 col-sm-6 col-12 mb-4';
            productCard.innerHTML = `
                <div class="card product-card h-100" data-product-id="${product.id}">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}" loading="lazy">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title product-name">${product.name}</h5>
                        <p class="card-text product-price">${formatPrice(product.price)}</p>
                        <button class="btn btn-warning add-to-cart-btn mt-auto"
                            data-product-id="${product.id}"
                            aria-label="Add ${product.name} to cart">
                            Add to Cart
                        </button>
                    </div>
                </div>
            `;
            container.appendChild(productCard);
        });
    }

    // Setup product interactions
    setupProductInteractions() {
        const productList = document.getElementById('product-list');
        if (!productList) return;

        // Handle card clicks (open modal)
        productList.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            if (!card) return;

            // Don't open modal if clicking Add to Cart button
            if (e.target.classList.contains('add-to-cart-btn')) {
                return;
            }

            const productId = parseInt(card.getAttribute('data-product-id'));
            const product = getProductById(productId);
            if (product) {
                this.showProductModal(product);
            }
        });

        // Handle Add to Cart button clicks
        productList.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart-btn')) {
                e.stopPropagation();
                const productId = parseInt(e.target.getAttribute('data-product-id'));
                const product = getProductById(productId);
                if (product) {
                    this.addToCart(product);
                }
            }
        });
    }

    // Show product modal
    showProductModal(product) {
        const modal = document.getElementById('product-details-modal');
        if (!modal) return;

        const images = [product.image, ...(product.thumbnails || [])];
        this.currentImageIndex = 0;

        // Populate modal
        modal.querySelector('#product-details-title').textContent = product.name;
        modal.querySelector('.main-product-image').src = images[0];
        modal.querySelector('.main-product-image').alt = product.name;
        modal.querySelector('.product-price').textContent = formatPrice(product.price);
        modal.querySelector('.product-description').textContent = product.description;

        // Setup thumbnails
        const thumbnailContainer = modal.querySelector('.thumbnail-container');
        thumbnailContainer.innerHTML = '';
        images.forEach((image, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = image;
            thumbnail.alt = `Thumbnail ${index + 1}`;
            thumbnail.className = 'img-thumbnail';
            thumbnail.style.cssText = 'width: 100px; cursor: pointer; margin: 5px;';
            thumbnail.addEventListener('click', () => {
                this.currentImageIndex = index;
                modal.querySelector('.main-product-image').src = image;
            });
            thumbnailContainer.appendChild(thumbnail);
        });

        // Setup navigation arrows
        modal.querySelectorAll('.image-nav-btn').forEach(button => {
            button.onclick = () => {
                const direction = button.getAttribute('data-direction');
                if (direction === 'left') {
                    this.currentImageIndex = (this.currentImageIndex - 1 + images.length) % images.length;
                } else {
                    this.currentImageIndex = (this.currentImageIndex + 1) % images.length;
                }
                modal.querySelector('.main-product-image').src = images[this.currentImageIndex];
            };
        });

        // Setup Add to Cart button in modal
        const addToCartBtn = modal.querySelector('.add-to-cart-modal-btn');
        if (addToCartBtn) {
            addToCartBtn.onclick = () => {
                this.addToCart(product);
                const bootstrapModal = bootstrap.Modal.getInstance(modal);
                if (bootstrapModal) bootstrapModal.hide();
            };
        }

        // Show modal
        const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.show();
    }

    // Add product to cart
    addToCart(product) {
        cartService.addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
        
        showNotification(`${product.name} added to cart!`, 'success');
    }
}

export const productUI = new ProductUI();

