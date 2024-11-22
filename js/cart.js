document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");
    const modal = document.getElementById("product-details-modal");

    if (!productList || !modal) {
        console.error("Error: Product list or modal container not found.");
        return;
    }

    // Dynamically create product cards
    products.forEach((product, index) => {
        const productCard = document.createElement("div");
        productCard.className = "col-md-4"; // Bootstrap column class
        productCard.innerHTML = `
            <div class="card" data-index="${index}">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">₱${product.price}</p>
                    <button class="btn btn-warning add-to-cart-btn"
                        data-name="${product.name}"
                        data-price="${product.price}"
                        data-image="${product.image}">Add to Cart</button>
                </div>
            </div>`;
        productList.appendChild(productCard);
    });

    // Add event listener for product card clicks (excluding Add to Cart button)
    productList.addEventListener("click", (event) => {
        // Check if the Add to Cart button was clicked
        if (event.target.classList.contains("add-to-cart-btn")) {
            // Add product to cart
            const button = event.target;
            const product = {
                name: button.getAttribute("data-name"),
                price: parseFloat(button.getAttribute("data-price")),
                image: button.getAttribute("data-image"),
                quantity: 1
            };
            addToCart(product); // Add product to cart
            return; // Prevent modal from opening
        }

        // Open modal for product card clicks
        const card = event.target.closest(".card");
        if (card) {
            const productIndex = card.getAttribute("data-index");
            const product = products[productIndex];
            if (product) {
                showModal(product, modal);
            }
        }
    });

    // Add functionality for Add to Cart button on cards
    setupAddToCartButtons();
});

function showModal(product, modal) {
    let images = [product.image, ...product.thumbnails]; // Include main image as the first image in the sequence
    let currentImageIndex = 0; // Initialize current image index to 0 (main image)

    // Populate modal details
    modal.querySelector(".modal-title").textContent = product.name;
    modal.querySelector(".main-product-image").src = images[currentImageIndex]; // Set the main product image
    modal.querySelector(".product-price").textContent = `₱${product.price}`;
    modal.querySelector(".product-description").textContent = product.description;

    // Add the Add to Cart button
    const addToCartButton = modal.querySelector(".add-to-cart-modal-btn");
    if (addToCartButton) {
        addToCartButton.onclick = () => {
            addToCart({
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        };
    }

    // Populate thumbnails
    const thumbnailContainer = modal.querySelector(".thumbnail-container");
    thumbnailContainer.innerHTML = ""; // Clear existing thumbnails

    images.forEach((image, index) => {
        const thumbnailImg = document.createElement("img");
        thumbnailImg.src = image;
        thumbnailImg.alt = `Thumbnail ${index + 1}`;
        thumbnailImg.className = "img-thumbnail";
        thumbnailImg.style.cursor = "pointer";
        thumbnailImg.style.width = "100px";

        // Change main image on thumbnail click
        thumbnailImg.addEventListener("click", () => {
            currentImageIndex = index; // Update current index
            modal.querySelector(".main-product-image").src = image;
        });

        thumbnailContainer.appendChild(thumbnailImg);
    });

    // Add navigation functionality to arrows
    const navButtons = modal.querySelectorAll(".image-nav-btn");
    navButtons.forEach(button => {
        button.onclick = () => {
            const direction = button.getAttribute("data-direction");
            if (direction === "left") {
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            } else if (direction === "right") {
                currentImageIndex = (currentImageIndex + 1) % images.length;
            }
            modal.querySelector(".main-product-image").src = images[currentImageIndex];
        };
    });

    // Show modal using Bootstrap API
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
}



const products = [
    {
        name: "Customized Keychain",
        price: 50,
        image: "../public/images/item-image.png",
        description: "A personalized keychain that adds a unique touch to your daily essentials. Perfect for gifts and giveaways.",
        thumbnails: [
            "../public/images/thumbnail1.png",
            "../public/images/thumbnail2.png"
        ]
    },
    {
        name: "Birthday Magnet",
        price: 70,
        image: "../public/images/item-image.png",
        description: "Celebrate special birthdays with a custom magnet that serves as a memorable keepsake.",
        thumbnails: [
            "../public/images/thumbnail1.png",
            "../public/images/thumbnail2.png"
        ]
    },
    {
        name: "Christening Souvenir",
        price: 80,
        image: "../public/images/item-image.png",
        description: "Elegant and meaningful souvenirs to commemorate a christening ceremony.",
        thumbnails: [
            "../public/images/thumbnail1.png",
            "../public/images/thumbnail2.png"
        ]
    },
    {
        name: "Customized Chip Bag",
        price: 60,
        image: "../public/images/item-image.png",
        description: "Add a creative flair to your events with these customized chip bags. Perfect for party favors!",
        thumbnails: [
            "../public/images/thumbnail1.png",
            "../public/images/thumbnail2.png"
        ]
    },
    {
        name: "Fridge Magnet",
        price: 65,
        image: "../public/images/item-image.png",
        description: "Decorate your fridge with a personalized magnet that keeps your memories alive every day.",
        thumbnails: [
            "../public/images/thumbnail1.png",
            "../public/images/thumbnail2.png"
        ]
    },
    {
        name: "Personalized Mug",
        price: 90,
        image: "../public/images/item-image.png",
        description: "Start your day with your favorite beverage in a mug personalized just for you.",
        thumbnails: [
            "../public/images/thumbnail1.png",
            "../public/images/thumbnail2.png"
        ]
    },
    {
        name: "Wedding Favor",
        price: 120,
        image: "../public/images/item-image.png",
        description: "Charming wedding favors to thank your guests for sharing in your special day.",
        thumbnails: [
            "../public/images/thumbnail1.png",
            "../public/images/thumbnail2.png"
        ]
    },
    {
        name: "Anniversary Gift",
        price: 150,
        image: "../public/images/item-image.png",
        description: "Celebrate love and milestones with a heartfelt anniversary gift tailored to your liking.",
        thumbnails: [
            "../public/images/thumbnail1.png",
            "../public/images/thumbnail2.png"
        ]
    },
    {
        name: "Graduation Keepsake",
        price: 85,
        image: "../public/images/item-image.png",
        description: "Mark a proud moment with a keepsake that celebrates academic achievements.",
        thumbnails: [
            "../public/images/thumbnail1.png",
            "../public/images/thumbnail2.png"
        ]
    },
    {
        name: "Holiday Ornament",
        price: 95,
        image: "../public/images/item-image.png",
        description: "Decorate your home for the holidays with a personalized ornament that spreads cheer.",
        thumbnails: [
            "../public/images/thumbnail1.png",
            "../public/images/thumbnail2.png"
        ]
    },
    {
        name: "Custom Notebook",
        price: 75,
        image: "../public/images/item-image.png",
        description: "A practical and stylish custom notebook for jotting down thoughts, ideas, and plans.",
        thumbnails: [
            "../public/images/thumbnail1.png",
            "../public/images/thumbnail2.png"
        ]
    },
    {
        name: "Personalized Pen",
        price: 30,
        image: "../public/images/item-image.png",
        description: "A sleek pen with a personal touch – perfect for daily use or as a thoughtful gift.",
        thumbnails: [
            "../public/images/thumbnail1.png",
            "../public/images/thumbnail2.png"
        ]
    },
];



// Function to add an item to the cart
function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem("cart")) || []; // Retrieve cart from localStorage or initialize an empty array

    // Check if the item already exists in the cart
    const existingItemIndex = cart.findIndex(cartItem => cartItem.name === item.name);
    if (existingItemIndex > -1) {
        // If item exists, update its quantity
        cart[existingItemIndex].quantity += item.quantity;
    } else {
        // If item does not exist, add it to the cart
        cart.push(item);
    }

    // Save the updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update the cart count in the header
    updateCartCount();

    // Show a custom notification instead of alert
    showAddToCartNotification(item.name);
}


function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.querySelector(".cart-count");

    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
        cartCountElement.style.display = cartCount > 0 ? "inline-block" : "none";
    }
}



// Function to display cart items on the cart page
function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartTable = document.querySelector(".cart-table");
    let estimatedTotal = 0;

    // Clear existing cart table content
    cartTable.innerHTML = `
        <div class="cart-table-header">
            <span>Item</span>
            <span>Quantity</span>
            <span>Total</span>
        </div>
    `;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        estimatedTotal += itemTotal;

        const cartRow = `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="item-image">
                <span class="product-name">${item.name}</span>
                <input type="number" class="quantity" value="${item.quantity}" data-name="${item.name}" min="1">
                <span class="total-price">₱${itemTotal.toFixed(2)}</span>
                <button class="remove-btn" data-name="${item.name}">Remove</button>
            </div>
        `;

        cartTable.insertAdjacentHTML("beforeend", cartRow);
    });

    // Update the total in the cart summary
    document.querySelector(".estimated-total span:last-child").textContent = `₱${estimatedTotal.toFixed(2)}`;

    setupCartItemControls();
}

// Function to handle cart item controls (quantity change, remove button)
function setupCartItemControls() {
    // Quantity change
    document.querySelectorAll(".quantity").forEach(input => {
        input.addEventListener("input", (event) => {
            const itemName = event.target.getAttribute("data-name");
            const newQuantity = parseInt(event.target.value);

            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart = cart.map(item => item.name === itemName ? { ...item, quantity: newQuantity } : item);
            localStorage.setItem("cart", JSON.stringify(cart));

            displayCartItems();
        });
    });

    // Remove button
    document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            const itemName = event.target.getAttribute("data-name");

            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart = cart.filter(item => item.name !== itemName);
            localStorage.setItem("cart", JSON.stringify(cart));

            displayCartItems();
            updateCartCount();
        });
    });
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
});

// Function to calculate and display the total amount
function displayTotalAmount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalAmountElement = document.querySelector(".total-amount");
    let totalAmount = 0;

    // Calculate the total amount from the cart
    cart.forEach(item => {
        totalAmount += item.price * item.quantity;
    });

    // Update the total amount element
    totalAmountElement.textContent = `₱${totalAmount.toFixed(2)}`;
}

// Event listener to display total amount on page load
document.addEventListener("DOMContentLoaded", () => {
    displayTotalAmount(); // Call the function to display the total amount
});



// Function to show payment notification and redirect to the home page
function showPaymentNotification() {
    const notification = document.createElement("div");
    notification.classList.add("payment-notification");
    notification.textContent = "Payment successful!";
    
    // Center the notification on the page
    notification.style.position = "fixed";
    notification.style.top = "50%";
    notification.style.left = "50%";
    notification.style.transform = "translate(-50%, -50%)";
    notification.style.padding = "1em";
    notification.style.backgroundColor = "#333";
    notification.style.color = "#fff";
    notification.style.borderRadius = "8px";
    notification.style.zIndex = "1000";

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
        window.location.href = "../index.html"; // Redirect to the home page
    }, 3000);
}

// Function to update the cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.querySelector(".cart-count");

    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
        cartCountElement.style.display = cartCount > 0 ? "inline-block" : "none";
    }
}

// Function to add an item to the cart
function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem("cart")) || []; // Retrieve cart from localStorage or initialize an empty array

    // Check if the item already exists in the cart
    const existingItemIndex = cart.findIndex(cartItem => cartItem.name === item.name);
    if (existingItemIndex > -1) {
        // If item exists, update its quantity
        cart[existingItemIndex].quantity += item.quantity;
    } else {
        // If item does not exist, add it to the cart
        cart.push(item);
    }

    // Save the updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update the cart count in the header
    updateCartCount();

    // Notify the user
    alert(`${item.name} has been added to the cart!`);
}



// Function to handle the "Pay Now" button click
function handlePayNow(event) {
    event.preventDefault(); // Prevent default behavior

    const totalAmountElement = document.querySelector(".total-amount");
    const totalAmountText = totalAmountElement ? totalAmountElement.textContent : "₱0.00";
    const totalAmount = parseFloat(totalAmountText.replace(/[^0-9.-]+/g, "")); // Extract numeric value

    if (totalAmount > 0) {
        // Clear the cart from localStorage
        localStorage.removeItem("cart");

        // Reset the cart count
        updateCartCount();

        // Show payment notification
        showPaymentNotification();
    } else {
        alert("Your cart is empty. Please add items before proceeding to payment.");
    }
}

// Event listener for initializing functionality on page load
document.addEventListener("DOMContentLoaded", () => {
    setupAddToCartButtons(); // Set up Add to Cart buttons
    updateCartCount(); // Update cart count on all pages

    // Attach the payment handler if the "Pay Now" button exists
    const payNowButton = document.getElementById("pay-now-btn");
    if (payNowButton) {
        payNowButton.addEventListener("click", handlePayNow); // Attach the checkout handler
    }
});
