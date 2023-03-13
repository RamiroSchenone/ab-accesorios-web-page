import { onGetProducts } from './connectionDB.js';

const productsContainer = document.getElementById('products-container');
const messageNotFound = document.getElementById('message-not-found');

window.addEventListener('DOMContentLoaded', async (e) => {
    if (localStorage.getItem('currentProducts') == null) {
        localStorage.setItem('currentProducts', JSON.stringify([]));
    }

    const querySnapshot = await onGetProducts();

    if (querySnapshot.size == 0) {
        clearLocalStorage();
        messageNotFound.innerHTML = 'Actualmente no hay artículos disponibles.';
        return;
    }

    let html = '<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">';
    querySnapshot.forEach((doc) => {
        const product = doc.data();
        const medidas = product.medidas;
        if (product.productInCart == null) {
            product.productInCart = verifyProductCart(product);
        }

        html += `
            <div class="col">
                <div class="card shadow-sm">
                    <img src="${product.imageURL}" />
                    <div class="card-body">
                        <h5 class="card-title">${product.nombre} - ${product.marca}</h5>
                        <p class="card-text">${product.descripcion}.</p>
                        <p class="card-text">Medidas: ${medidas.alto}cm de alto x ${medidas.ancho}cm de ancho x ${medidas.profundidad}cm de profundidad.</p>
                        <p class="card-text price">$ ${product.precio}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <i class="fas ${product.disponible ? 'fa-check-circle available' : 'fa-exclamation-circle sold-out'}">${product.disponible ? 'Disponible' : 'Agotado'} </i>
                            </div>
                            
                            ${labelInCart(product.productInCart)}

                            <button id="button-product-${product.id}" style="width: 160px" onclick="addToCart(${product.id})" class="btn btn-success" ${!product.disponible || product.productInCart ? 'disabled' : ''}>
                                    <i class="fas fa-cart-plus">Agregar al carrito</i>
                            </button>

                            <button id="spinner-cart-product-${product.id}" class="btn spinner-button btn-success hidden d-none">
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        setProductInLocalStorage(product);
    });
    html += `</div>`;
    productsContainer.innerHTML = html;
});

function verifyProductCart(product) {
    var productsCart = getCartInLocalStorage();
    var productCart = productsCart.find(x => x.id == product.id);

    if (!productCart || !productCart.productInCart) return false;

    return true;
}

function labelInCart(bool) {
    if (bool) return `<div class="btn-group"> <i class="fas fa-check-circle available"> En el carrito </i> </div> `;
    return '';
}