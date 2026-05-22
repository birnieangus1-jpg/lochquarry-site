/* ------------------------------
   SIMPLE USER SYSTEM (localStorage)
--------------------------------*/

// Save new user
function registerUser(name, email, password) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Check if email already exists
    if (users.some(u => u.email === email)) {
        alert("Email already registered.");
        return false;
    }

    users.push({ name, email, password, orders: [] });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful!");
    return true;
}

// Login user
function loginUser(email, password) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        alert("Invalid login.");
        return false;
    }

    localStorage.setItem("loggedInUser", email);
    alert("Logged in!");
    return true;
}

// Get logged-in user object
function getCurrentUser() {
    const email = localStorage.getItem("loggedInUser");
    if (!email) return null;

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    return users.find(u => u.email === email);
}

// logo-greenut
function logo-greenut() {
    localStorage.removeItem("loggedInUser");
    alert("Logged out.");
    window.location.href = "login.html";
}

/* ------------------------------
   CART SYSTEM
--------------------------------*/

function addToCart(productName, price) {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push({ productName, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
}

function getCart() {
    return JSON.parse(localStorage.getItem("cart") || "[]");
}

function clearCart() {
    localStorage.removeItem("cart");
}

/* ------------------------------
   CHECKOUT → Save order to user
--------------------------------*/

function checkout() {
    const user = getCurrentUser();
    if (!user) {
        alert("You must be logged in to checkout.");
        return;
    }

    const cart = getCart();
    if (cart.length === 0) {
        alert("Cart is empty.");
        return;
    }

    user.orders.push({
        id: Date.now(),
        items: cart,
        date: new Date().toLocaleDateString(),
        total: cart.reduce((sum, item) => sum + item.price, 0)
    });

    // Save updated user list
    const users = JSON.parse(localStorage.getItem("users"));
    const updated = users.map(u => u.email === user.email ? user : u);
    localStorage.setItem("users", JSON.stringify(updated));

    clearCart();
    alert("Order placed!");
}

/* ------------------------------
   SEARCH SYSTEM
--------------------------------*/

function performSearch(query) {
    if (!query.trim()) {
        alert("Enter a search term.");
        return;
    }

    localStorage.setItem("searchQuery", query);
    window.location.href = "results.html";
}

function loadSearchResults() {
    const q = localStorage.getItem("searchQuery") || "";
    document.getElementById("results").innerText =
        `No results found for "${q}" (placeholder).`;
}

/* ------------------------------
   ADMIN PLACEHOLDERS
--------------------------------*/

function adminCheck() {
    const user = getCurrentUser();
    if (!user || user.email !== "admin@lochquarry.com") {
        alert("Admin access only.");
        window.location.href = "index.html";
    }
}
