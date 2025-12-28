// 1. DATA PRODUK
const products = [
    {
        id: 1,
        name: "STINQ WORLD BLACK - FRONT",
        price: 250000,
        image: "assets/clothes/STINQ WORLD BLACK FRONT.png"
    },
    {
        id: 2,
        name: "STINQ WORLD BLACK - BACK",
        price: 250000,
        image: "assets/clothes/STINQ WORLD BLACK BACK.png"
    }
];

let currentIndex = 0;
let carts = JSON.parse(localStorage.getItem('cart')) || [];

// 2. SELECTOR DOM
const productDisplay = document.getElementById('product-display');
const displayName = document.getElementById('display-name');
const displayPrice = document.getElementById('display-price');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const addToCartBtn = document.getElementById('add-to-cart-trigger');
const iconCart = document.getElementById('cart-icon');
const closeCart = document.querySelector('.close');
const body = document.querySelector('body');
const listCartHTML = document.querySelector('.ListCart');
const iconCartSpan = document.getElementById('.cart-count');

// 3. FUNGSI SLIDER
function updateSlider() {
    const item = products[currentIndex];
    productDisplay.innerHTML = `<img src="${item.image}" class="image slide-animation">`;
    displayName.innerText = item.name;
    displayPrice.innerText = `Rp ${item.price.toLocaleString()}`;
}

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % products.length;
    updateSlider();
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + products.length) % products.length;
    updateSlider();
});

// 4. FUNGSI KERANJANG
iconCart.addEventListener('click', () => body.classList.toggle('showCart'));
closeCart.addEventListener('click', () => body.classList.remove('showCart'));

const addToCart = () => {
    const product = products[currentIndex];
    let position = carts.findIndex((v) => v.product_id == product.id);
    
    if(position < 0) {
        carts.push({
            product_id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    } else {
        carts[position].quantity += 1;
    }
    refreshCart();
    body.classList.add('showCart');
}

const refreshCart = () => {
    localStorage.setItem('cart', JSON.stringify(carts));
    renderCart();
}

const renderCart = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;

    carts.forEach(item => {
        totalQuantity += item.quantity;
        let newItem = document.createElement('div');
        newItem.classList.add('item');
        newItem.innerHTML = `
            <img src="${item.image}">
            <div class="info">
                <div class="name">${item.name}</div>
                <div class="totalPrice">Rp ${(item.price * item.quantity).toLocaleString()}</div>
            </div>
            <div class="quantity">
                <span onclick="changeQuantity(${item.product_id}, 'minus')">-</span>
                <span>${item.quantity}</span>
                <span onclick="changeQuantity(${item.product_id}, 'plus')">+</span>
            </div>
        `;
        listCartHTML.appendChild(newItem);
    });
    iconCartSpan.innerText = totalQuantity;
}

// Dibuat window agar bisa dipanggil dari onclick HTML
window.changeQuantity = (id, type) => {
    let pos = carts.findIndex((v) => v.product_id == id);
    if(pos >= 0) {
        if(type === 'plus') carts[pos].quantity++;
        else {
            if(carts[pos].quantity > 1) carts[pos].quantity--;
            else carts.splice(pos, 1);
        }
    }
    refreshCart();
}

// 5. EVENT INITIALIZING
addToCartBtn.addEventListener('click', addToCart);
updateSlider();
renderCart();