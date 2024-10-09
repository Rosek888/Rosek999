let cart = [];
let cartCount = 0;

// Dodawanie produktu do koszyka
function addToCart(name, pricePerKg, quantity) {
    const weightInKg = quantity / 1000;
    const price = pricePerKg * weightInKg;

    // Sprawdzanie czy produkt już istnieje w koszyku
    const existingProduct = cart.find(item => item.name === name);
    if (existingProduct) {
        existingProduct.quantity += parseInt(quantity);
        existingProduct.price += price;
    } else {
        cart.push({ name, quantity: parseInt(quantity), price });
        cartCount++;
        updateCartCount();
    }

    displayTemporaryCart();
    renderCart();
}

// Aktualizacja ilości produktów w koszyku
function updateCartCount() {
    document.getElementById('cartCount').textContent = cartCount;
}

// Wyświetlenie koszyka tymczasowo w prawym górnym rogu
function displayTemporaryCart() {
    const cartWindow = document.getElementById('cartWindow');
    cartWindow.style.display = 'block';
    setTimeout(() => {
        cartWindow.style.display = 'none';
    }, 3000); // Koszyk znika po 3 sekundach
}

// Renderowanie produktów w koszyku
function renderCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';

    let totalPrice = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name}: ${item.quantity}g - ${item.price.toFixed(2)} zł`;
        cartItems.appendChild(li);
        totalPrice += item.price;
    });

    document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);
}

// Otwieranie okna koszyka
document.getElementById('cartIcon').addEventListener('click', () => {
    const cartWindow = document.getElementById('cartWindow');
    if (cartWindow.style.display === 'block') {
        cartWindow.style.display = 'none';
    } else {
        cartWindow.style.display = 'block';
    }
});

// Zamykanie koszyka
function closeCart() {
    document.getElementById('cartWindow').style.display = 'none';
}
