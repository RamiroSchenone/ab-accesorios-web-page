import { onGetProducts } from './connectionDB.js';

window.addEventListener('DOMContentLoaded', async (e) => {
    const productsContainer = document.getElementById('products-container');
    const messageNotFound = document.getElementById('message-not-found');
    
    if (localStorage.getItem('currentProducts') == null) {
        localStorage.setItem('currentProducts', JSON.stringify([]));
    }

    const querySnapshot = await onGetProducts();

    if(querySnapshot.size == 0){
        clearLocalStorage();
        messageNotFound.innerHTML = 'Actualmente no hay artículos disponibles.';
        return;
    }

    let html = '<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">';
    querySnapshot.forEach((doc) => {
        const product = doc.data();

        setProductsInLocalStorage(product);

        const medidas = product.medidas;
        html += `
            <div class="col">
                <div class="card shadow-sm">
                    <img src="${product.imageURL}" />
                    <div class="card-body">
                        <h5 class="card-title">${product.nombre} - ${product.marca}</h5>
                        <p class="card-text">${product.descripcion}.</p>
                        <p class="card-text">Medidas: ${medidas.alto}cm de alto x ${medidas.ancho
            }cm de ancho x ${medidas.profundidad}cm de profundidad.</p>
                        <p class="card-text price">$ ${product.precio}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                    <i class="fas ${product.disponible
                ? 'fa-check-circle available'
                : 'fa-exclamation-circle sold-out'
            }">${product.disponible ? 'Disponible' : 'Agotado'} </i>
                            </div>
                            <a id="product-${product.id}" onclick="addToCart(${product.id})" class="btn btn-success">
                                    <i class="fas fa-cart-plus">Agregar al carrito</i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    html += `</div>`;
    productsContainer.innerHTML = html;
});