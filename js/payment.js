document.addEventListener("DOMContentLoaded", function () {
    const payNowBtn = document.getElementById("pay-now-btn");

    payNowBtn.addEventListener("click", async function () {
        try {
            // Get the total amount from your order summary
            const totalAmount = document.querySelector(".total-amount").textContent.replace("₱", "").trim();
            const amountInCents = parseFloat(totalAmount) * 100; // Convert PHP to centavos

            if (amountInCents <= 0) {
                alert("Invalid amount. Please add items to your cart.");
                return;
            }

            // Call the PayMongo API to create a payment intent
            const response = await fetch("https://api.paymongo.com/v1/payment_intents", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Basic " + btoa("sk_test_YOUR_SECRET_KEY") // Replace with your secret key
                },
                body: JSON.stringify({
                    data: {
                        attributes: {
                            amount: amountInCents,
                            currency: "PHP",
                            payment_method_allowed: ["gcash", "paymaya"],
                            capture_type: "automatic",
                        }
                    }
                })
            });

            const data = await response.json();

            if (data.errors) {
                console.error("Payment Error:", data.errors);
                alert("Payment failed. Please try again.");
                return;
            }

            // Redirect user to the checkout URL
            const checkoutUrl = data.data.attributes.next_action.redirect.url;
            window.location.href = checkoutUrl;

        } catch (error) {
            console.error("Error processing payment:", error);
            alert("Something went wrong. Please try again later.");
        }
    });
});
