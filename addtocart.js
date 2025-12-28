// 1. DATA PRODUK (Edit di sini jika ingin tambah produk)
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
const listCartHTML = document.querySelector('.ListCart');
const iconCartSpan = document.querySelector('#cart-count');

// 3. FUNGSI SLIDER (Update Tampilan)
function updateSlider() {
    const item = products[currentIndex];
    
    // Update Gambar dengan animasi sederhana
    productDisplay.innerHTML = `<img src="${item.image}" class="image slide-animation">`;
    
    // Update Teks
    displayName.innerText = item.name;
    displayPrice.innerText = `Rp ${item.price.toLocaleString()}`;
}

// Event Slider
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % products.length; // Mutar ke awal jika sudah habis
    updateSlider();
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + products.length) % products.length; // Mutar ke akhir jika awal
    updateSlider();
});

// 4. FUNGSI KERANJANG (CART)
const addToCart = () => {
    const product = products[currentIndex]; // Ambil produk yang sedang dilihat di slider
    
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
    document.body.classList.add('showCart'); // Buka keranjang otomatis
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
        newItem.classList.add('item'); // Sesuaikan CSS kamu
        newItem.innerHTML = `
            <img src="${item.image}" width="50">
            <div class="info">
                <div class="name">${item.name}</div>
                <div class="price">Rp ${(item.price * item.quantity).toLocaleString()}</div>
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

// Jalankan saat pertama kali load
updateSlider();
renderCart();