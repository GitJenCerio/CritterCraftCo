// Function to handle form submission
function submitForm(event) {
    event.preventDefault(); 
    alert("Form submitted successfully!");
}

// Function to show notification when item is added to cart
document.addEventListener("DOMContentLoaded", function () {
    // Function to show "Item added to cart" notification
    function showAddToCartNotification() {
        const notification = document.createElement("div");
        notification.classList.add("cart-notification");
        notification.textContent = "Item added to cart successfully!";

        // Position the notification near the cart icon
        const cartIcon = document.querySelector(".cart-icon");
        if (cartIcon) {
            cartIcon.parentElement.insertBefore(notification, cartIcon.nextSibling);
        } else {
            document.body.appendChild(notification);
        }

        // Remove the notification after 2 seconds
        setTimeout(() => {
            notification.remove();
        }, 2000);
    }

    // Add event listeners to all "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault(); 
            showAddToCartNotification();
        });
    });
});


function updateTotalPrice() {
    let estimatedTotal = 0;

    document.querySelectorAll(".cart-item").forEach(cartItem => {
        // Get the quantity and price of the item
        const quantityElement = cartItem.querySelector(".quantity");
        const quantity = parseInt(quantityElement.value); // Updated to use value from input
        const priceText = cartItem.querySelector(".product-price").textContent;
        
        // Extract price as a number
        const price = parseFloat(priceText.replace(/[^0-9.-]+/g, ""));
        
        // Calculate total price for the item
        const itemTotal = quantity * price;
        cartItem.querySelector(".total-price").textContent = `₱${itemTotal.toFixed(2)}`;
        
        // Add item total to the estimated total
        estimatedTotal += itemTotal;
    });

    // Update the estimated total in the cart summary
    document.querySelector(".estimated-total span:last-child").textContent = `₱${estimatedTotal.toFixed(2)}`;
}

// Event listeners for quantity buttons and input change
document.querySelectorAll(".cart-item").forEach(cartItem => {
    const quantityInput = cartItem.querySelector(".quantity");

    // Increase/decrease buttons
    cartItem.querySelector(".increase").addEventListener("click", () => {
        quantityInput.value = parseInt(quantityInput.value) + 1;
        updateTotalPrice();
    });
    
    cartItem.querySelector(".decrease").addEventListener("click", () => {
        if (quantityInput.value > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
            updateTotalPrice();
        }
    });

    // Allow direct editing in quantity input field
    quantityInput.addEventListener("input", () => {
        if (quantityInput.value < 1) quantityInput.value = 1; // Ensure minimum quantity of 1
        updateTotalPrice();
    });

    // Remove button functionality
    const removeButton = cartItem.querySelector(".remove-btn");
    removeButton.addEventListener("click", () => {
        cartItem.remove();
        updateTotalPrice();
    });
});

// Initial calculation of total prices when the page loads
document.addEventListener("DOMContentLoaded", updateTotalPrice);
// Function to handle adding an item to the cart
function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the item already exists in the cart
    const existingItemIndex = cart.findIndex(cartItem => cartItem.name === item.name);
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += item.quantity;
    } else {
        cart.push(item);
    }

    // Save the updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update the cart count after adding the item
    updateCartCount();

    // Display notification or alert
    alert(`${item.name} has been added to the cart!`);
}

// Function to update cart count in the header
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.querySelector(".cart-count");

    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

// Function to handle "Add to Cart" button clicks
function setupAddToCartButtons() {
    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

    addToCartButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();

            // Extract item details from the product card
            const productCard = button.closest(".product-card");
            const productName = productCard.querySelector(".product-name").textContent;
            const productPrice = parseFloat(productCard.querySelector(".product-price").textContent.replace(/[^0-9.-]+/g, ""));
            const productImage = productCard.querySelector("img").src;

            // Create the item object
            const cartItem = {
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            };

            // Add the item to cart
            addToCart(cartItem);
        });
    });
}

function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartTable = document.querySelector(".cart-table");
    const template = document.getElementById("cart-item-template").content;
    
    // Clear existing items in the cart table
    cartTable.innerHTML = `
        <div class="cart-table-header">
            <span>Item</span>
            <span>Quantity</span>
            <span>Total</span>
        </div>
    `;

    let estimatedTotal = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        estimatedTotal += itemTotal;

        const cartItem = document.importNode(template, true);
        cartItem.querySelector(".item-image").src = item.image;
        cartItem.querySelector(".item-image").alt = item.name;
        cartItem.querySelector(".product-name").textContent = item.name;
        cartItem.querySelector(".product-price").textContent = `₱${item.price.toFixed(2)}`;
        cartItem.querySelector(".quantity").value = item.quantity;
        cartItem.querySelector(".quantity").setAttribute("data-name", item.name);
        cartItem.querySelector(".total-price").textContent = `₱${itemTotal.toFixed(2)}`;
        cartItem.querySelector(".delete-icon").setAttribute("data-name", item.name);

        cartTable.appendChild(cartItem);
    });

    document.querySelector(".estimated-total span:last-child").textContent = `₱${estimatedTotal.toFixed(2)}`;
    setupCartItemControls();
}

function setupCartItemControls() {
    document.querySelectorAll(".quantity").forEach(input => {
        input.addEventListener("input", updateQuantity);
    });

    document.querySelectorAll(".delete-icon").forEach(icon => {
        icon.addEventListener("click", removeFromCart);
    });
}

function updateQuantity(event) {
    const itemName = event.target.getAttribute("data-name");
    const newQuantity = parseInt(event.target.value);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.map(item => item.name === itemName ? { ...item, quantity: newQuantity } : item);
    localStorage.setItem("cart", JSON.stringify(cart));

    displayCartItems();
}

function removeFromCart(event) {
    const itemName = event.target.getAttribute("data-name");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.name !== itemName);
    localStorage.setItem("cart", JSON.stringify(cart));

    displayCartItems();
    updateCartCount();
}

document.addEventListener("DOMContentLoaded", () => {
    setupAddToCartButtons();
    updateCartCount();
    if (document.querySelector(".cart-page")) {
        displayCartItems();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    displayOrderSummary();
});

function displayOrderSummary() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const orderItemsContainer = document.querySelector(".order-items");
    const template = document.getElementById("order-item-template").content;
    let totalAmount = 0;

    orderItemsContainer.innerHTML = ""; // Clear existing items

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalAmount += itemTotal;

        const orderItem = document.importNode(template, true);
        orderItem.querySelector(".order-item-image").src = item.image;
        orderItem.querySelector(".order-item-image").alt = item.name;
        orderItem.querySelector(".product-name").textContent = item.name;
        orderItem.querySelector(".product-price").textContent = `₱${item.price.toFixed(2)} x ${item.quantity}`;
        orderItem.querySelector(".total-price").textContent = `₱${itemTotal.toFixed(2)}`; // Show total for each item

        orderItemsContainer.appendChild(orderItem);
    });

    document.querySelector(".total-amount").textContent = `₱${totalAmount.toFixed(2)}`;
}


