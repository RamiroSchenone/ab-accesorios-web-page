function setProductsInLocalStorage(product) {
    var currentProducts = getProductsInLocalStorage();
    var productExist = currentProducts.find(x => x.id === product.id);

    if (!productExist) {
        currentProducts.push(product);
    }

    localStorage.setItem('currentProducts', JSON.stringify(currentProducts));
}

function setProductInCart(product) {
    var cart = getCartInLocalStorage();
    var productExist = cart.find(x => x.id === product.id);

    if (!productExist) {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

function getProductsInLocalStorage() {
    return localStorage.getItem('currentProducts') ? JSON.parse(localStorage.getItem('currentProducts')) : null;
}

function getCartInLocalStorage() {
    return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : null;
}

function clearLocalStorage() {
    localStorage.clear();
}