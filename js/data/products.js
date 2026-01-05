// Mock Product Data - Ready to be replaced with API calls
export const PRODUCTS = [
    {
        id: 1,
        name: "Customized Keychain",
        price: 50,
        image: "../public/images/item-image.png",
        description: "A personalized keychain that adds a unique touch to your daily essentials. Perfect for gifts and giveaways.",
        thumbnails: [
            "../public/images/thumbnail1.png",
            "../public/images/thumbnail2.png"
        ],
        category: "accessories",
        inStock: true
    },
    {
        id: 2,
        name: "Birthday Magnet",
        price: 70,
        image: "../public/images/item-image.png",
        description: "Celebrate special birthdays with a custom magnet that serves as a memorable keepsake.",
        thumbnails: [
            "../public/images/thumbnail1.png",
            "../public/images/thumbnail2.png"
        ],
        category: "magnets",
        inStock: true
    },
    {
        id: 3,
        name: "Christening Souvenir",
        price: 80,
        image: "../public/images/item-image.png",
        description: "Elegant and meaningful souvenirs to commemorate a christening ceremony.",
        thumbnails: [
            "../public/images/thumbnail1.png",
            "../public/images/thumbnail2.png"
        ],
        category: "souvenirs",
        inStock: true
    },
    {
        id: 4,
        name: "Customized Chip Bag",
        price: 60,
        image: "../public/images/item-image.png",
        description: "Add a creative flair to your events with these customized chip bags. Perfect for party favors!",
        thumbnails: [
            "../public/images/thumbnail1.png",
            "../public/images/thumbnail2.png"
        ],
        category: "party",
        inStock: true
    },
    {
        id: 5,
        name: "Fridge Magnet",
        price: 65,
        image: "../public/images/item-image.png",
        description: "Decorate your fridge with a personalized magnet that keeps your memories alive every day.",
        thumbnails: [
            "../public/images/thumbnail1.png",
            "../public/images/thumbnail2.png"
        ],
        category: "magnets",
        inStock: true
    },
    {
        id: 6,
        name: "Personalized Mug",
        price: 90,
        image: "../public/images/item-image.png",
        description: "Start your day with your favorite beverage in a mug personalized just for you.",
        thumbnails: [
            "../public/images/thumbnail1.png",
            "../public/images/thumbnail2.png"
        ],
        category: "drinkware",
        inStock: true
    },
    {
        id: 7,
        name: "Wedding Favor",
        price: 120,
        image: "../public/images/item-image.png",
        description: "Charming wedding favors to thank your guests for sharing in your special day.",
        thumbnails: [
            "../public/images/thumbnail1.png",
            "../public/images/thumbnail2.png"
        ],
        category: "wedding",
        inStock: true
    },
    {
        id: 8,
        name: "Anniversary Gift",
        price: 150,
        image: "../public/images/item-image.png",
        description: "Celebrate love and milestones with a heartfelt anniversary gift tailored to your liking.",
        thumbnails: [
            "../public/images/thumbnail1.png",
            "../public/images/thumbnail2.png"
        ],
        category: "gifts",
        inStock: true
    },
    {
        id: 9,
        name: "Graduation Keepsake",
        price: 85,
        image: "../public/images/item-image.png",
        description: "Mark a proud moment with a keepsake that celebrates academic achievements.",
        thumbnails: [
            "../public/images/thumbnail1.png",
            "../public/images/thumbnail2.png"
        ],
        category: "keepsakes",
        inStock: true
    },
    {
        id: 10,
        name: "Holiday Ornament",
        price: 95,
        image: "../public/images/item-image.png",
        description: "Decorate your home for the holidays with a personalized ornament that spreads cheer.",
        thumbnails: [
            "../public/images/thumbnail1.png",
            "../public/images/thumbnail2.png"
        ],
        category: "holiday",
        inStock: true
    },
    {
        id: 11,
        name: "Custom Notebook",
        price: 75,
        image: "../public/images/item-image.png",
        description: "A practical and stylish custom notebook for jotting down thoughts, ideas, and plans.",
        thumbnails: [
            "../public/images/thumbnail1.png",
            "../public/images/thumbnail2.png"
        ],
        category: "stationery",
        inStock: true
    },
    {
        id: 12,
        name: "Personalized Pen",
        price: 30,
        image: "../public/images/item-image.png",
        description: "A sleek pen with a personal touch – perfect for daily use or as a thoughtful gift.",
        thumbnails: [
            "../public/images/thumbnail1.png",
            "../public/images/thumbnail2.png"
        ],
        category: "stationery",
        inStock: true
    }
];

// API-ready function to fetch products (currently returns mock data)
export async function fetchProducts() {
    // TODO: Replace with actual API call when backend is ready
    // const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PRODUCTS}`);
    // return await response.json();
    
    return new Promise((resolve) => {
        setTimeout(() => resolve(PRODUCTS), 100); // Simulate API delay
    });
}

// Get product by ID
export function getProductById(id) {
    return PRODUCTS.find(product => product.id === parseInt(id));
}

