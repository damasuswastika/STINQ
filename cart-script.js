let iconCart = document.querySelector('.nav-column.right img');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let listCartHTML = document.querySelector('.ListCart');

let carts = JSON.parse(localStorage.getItem('cart')) || [];

// Buka Tutup Cart
iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})
closeCart.addEventListener('click', () => {
    body.classList.remove('showCart');
})

// Fungsi Add To Cart (Panggil ini di button produk)
const addToCart = (product_id, name, price, image) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    if(positionThisProductInCart < 0){
        carts.push({
            product_id: product_id,
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }else{
        carts[positionThisProductInCart].quantity += 1;
    }
    refreshCart();
}

const refreshCart = () => {
    localStorage.setItem('cart', JSON.stringify(carts));
    renderCart();
}

const renderCart = () => {
    listCartHTML.innerHTML = '';
    if(carts.length > 0){
        carts.forEach(item => {
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
        })
    }
}

const changeQuantity = (product_id, type) => {
    let position = carts.findIndex((value) => value.product_id == product_id);
    if(position >= 0){
        if(type === 'plus'){
            carts[position].quantity += 1;
        }else{
            if(carts[position].quantity > 1){
                carts[position].quantity -= 1;
            }else{
                carts.splice(position, 1);
            }
        }
    }
    refreshCart();
}