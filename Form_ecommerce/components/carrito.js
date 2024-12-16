

document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cartContainer');
    const comprarBtn = document.getElementById('buyButton');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTotalElement = document.createElement('div'); 
    cartTotalElement.id = 'cartTotal';
    cartTotalElement.style.marginTop = '20px'; 


    if (!cartContainer) {
        console.error("No se encontró el contenedor con ID 'cartContainer'.");
        return;
    }

    if (!comprarBtn) {
        console.error("No se encontró el botón con ID 'buyButton'.");
    }

    // mensaje y boton si el carrito está vacío
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <p>Tu carrito está vacío.</p>
            <input type="button" value="Volver a comprar" id="goToIndex" style="padding: 10px; background-color: #5e278e; color: white; border: none; border-radius: 5px; cursor: pointer;">
        `;

        const goToIndexButton = document.getElementById('goToIndex');
        goToIndexButton.addEventListener('click', () => {
            window.location.href = '/Form_ecommerce/index.html'; 
        });

        return;
    }

   
    let totalCarrito = 0;

    // Añadir encabezados al carrito
    const headersHTML = `
        <div class="cart-headers">
            <p class="header-title">Producto</p>
            <p class="header-quantity">Cantidad</p>
            <p class="header-price">Subtotal</p>
        </div>
    `;
    cartContainer.innerHTML = headersHTML; 

    // Renderizar productos en el carrito
    cart.forEach((item, index) => {
        const totalItemPrice = item.quantity * parseFloat(item.price.replace('$', '')); 
        totalCarrito += totalItemPrice; 

        const productHTML = `
            <div class="cart-item">
                <p class="item-title">${item.title}</p>
                <p class="item-quantity"> ${item.quantity}</p>
                <p class="item-price"> $${totalItemPrice.toFixed(2)}</p>
                <button class="remove-item" data-index="${index}">Eliminar</button>
            </div>
        `;
        cartContainer.innerHTML += productHTML;
    });

    cartTotalElement.innerHTML = `<strong>Total del carrito: $${totalCarrito.toFixed(2)}</strong>`;
    cartContainer.appendChild(cartTotalElement);

  
    cartContainer.addEventListener('click', (event) => {
        if (event.target && event.target.classList.contains('remove-item')) {
            const index = event.target.getAttribute('data-index');
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            location.reload(); // Recargar para actualizar la vista
        }
    });

    
    if (comprarBtn) {
        comprarBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert("El carrito está vacío.");
                return;
            }
            alert("Gracias por tu compra.");
            localStorage.removeItem('cart');
            location.reload(); // Vaciar el carrito
        });
    }

   
});


