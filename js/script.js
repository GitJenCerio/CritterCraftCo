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


// Function to show payment notification and redirect to home page
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
    
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
        window.location.href = "../index.html"; 
    }, 3000);
}

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("product-modal");
    const modalContent = document.getElementById("product-modal-content");
    const productImages = document.querySelectorAll(".product-image");
    const productNames = document.querySelectorAll(".product-name");

    // Function to open modal and load product details
    function openProductModal(event) {
        event.preventDefault(); // Prevent default link behavior

        // Get the product name and price from the clicked element's data attributes
        const productName = event.target.getAttribute("data-name");
        const productPrice = event.target.getAttribute("data-price");

        // Fetch the product-details.html content and inject the product name and price
        fetch("product-details.html")
            .then(response => response.text())
            .then(data => {
                modalContent.innerHTML = data;
                modal.style.display = "flex";

                // Populate the product name and price in the modal
                modalContent.querySelector(".product-title").textContent = productName;
                modalContent.querySelector(".product-price").textContent = productPrice;

                // Add close functionality
                const closeButton = modalContent.querySelector(".close-button");
                closeButton.addEventListener("click", () => {
                    modal.style.display = "none";
                });

                // Close modal when clicking outside of the modal content
                modal.addEventListener("click", (event) => {
                    if (event.target === modal) {
                        modal.style.display = "none";
                    }
                });
            })
            .catch(error => console.error("Error loading product details:", error));
    }

    // Add event listeners to product images and names to open modal
    productImages.forEach(image => {
        image.addEventListener("click", openProductModal);
    });

    productNames.forEach(name => {
        name.addEventListener("click", openProductModal);
    });
});
