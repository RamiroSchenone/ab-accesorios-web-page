window.addEventListener('DOMContentLoaded', async (e) => {
    if (localStorage.getItem('cart') == null) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
});

function addToCart(event) {
    var products = getProductsInLocalStorage();
    var product = products.find(x => x.id === event);
    setProductInCart(product)    
}

