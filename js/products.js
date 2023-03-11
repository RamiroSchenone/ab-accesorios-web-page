import {onGetProducts} from './connectionDB.js';

window.addEventListener('DOMContentLoaded', async (e) => {
   console.log('dom construction finished');

     const querySnapshot = await onGetProducts();
     const productsContainer = document.getElementById('products-container');
     let html = '';
     querySnapshot.forEach((doc) => {
          const product = doc.data();
          const medidas = product.medidas;
          html += `
            <div class="col">
                <div class="card shadow-sm">
                    <img src="${product.imageURL}" />
                    <div class="card-body">
                        <h5 class="card-title">${product.name} - ${product.marca}</h5>
                        <p class="card-text">${product.description}.</p>
                        <p class="card-text">Medidas: ${medidas.alto}cm de alto x ${medidas.ancho}cm de ancho x ${medidas.profundidad}cm de profundidad.</p>
                        <p class="card-text price">$ ${product.price}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                    <i class="fas ${product.disponible ? "fa-check-circle available" : "fa-exclamation-circle sold-out"}">${product.disponible ? "Disponible" : "Agotado" } </i>
                            </div>
                            <a href="#" class="btn btn-success">
                                    <i class="fas fa-cart-plus">Agregar al carrito</i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;

        productsContainer.innerHTML = html;
     });
});
