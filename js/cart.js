const currentCart = document.getElementById('current-cart');
const currentCartNotFound = document.getElementById('current-cart-not-found');
const cartNotification = document.getElementById('cart-notification');

window.addEventListener('DOMContentLoaded', async (e) => {
    if (localStorage.getItem('cart') == null) {
        localStorage.setItem('cart', JSON.stringify([]));
    }

    verifyCartNotification();
});

function addToCart(event) {
    var products = getProductsInLocalStorage();
    var product = products.find(x => x.id === event);

    const spinnerCartProduct = document.getElementById(`spinner-cart-product-${product.id}`);
    const addToCartButton = document.getElementById(`button-product-${product.id}`);

    hidden(addToCartButton)
    show(spinnerCartProduct);

    setTimeout(() => {
        hidden(spinnerCartProduct);
        show(addToCartButton);
        verifyCartNotification();
    }, 1500);

    setProductInCart(product);
}

function getProductsToCart() {
    let html = ``;

    var productsToCart = getCartInLocalStorage();

    if (productsToCart.length == 0) {
        currentCartNotFound.innerHTML = 'Actualmente no hay elementos agregados al carrito.';
        return;
    } else {
        currentCartNotFound.innerHTML = '';
    }

    productsToCart.forEach(product => {
        const medidas = product.medidas;
        html += `
            <div class="card shadow-sm">
                <div class="card-body">
                    <div class="row">
                        <div class="col-5 mr-3">
                            <img
                                src="${product.imageURL}"
                                style="height: 165px; width: 165px" />
                        </div>
                        <div class="col-7">
                            <h5 class="card-title">
                                ${product.nombre} - ${product.marca}
                            </h5>
                            <p class="card-text">${product.descripcion}.</p>
                            <p class="card-text">
                                Medidas: ${medidas.alto}cm de alto x
                                ${medidas.ancho}cm de ancho x
                                ${medidas.profundidad}cm de profundidad.
                            </p>
                            <p class="card-text price">$ ${product.precio}</p>
                        </div>
                    </div>
                </div>
            </div>
        `
    });

    currentCart.innerHTML = html;
}

function verifyCartNotification() {
    var productsToCart = getCartInLocalStorage();
    if (productsToCart.length > 0) {
        cartNotification.classList.add('cart-notification')
        cartNotification.innerHTML = 1;
    } else {
        cartNotification.classList.remove('cart-notification')
        cartNotification.innerHTML = '';
    }
}

function showNotification() {
    var options = {
        animation: true,
        delay: 2000
    }
    const liveToast = document.getElementById('live-toast');
    var toastElement = new bootstrap.Toast(liveToast, options);
    toastElement.show();
}