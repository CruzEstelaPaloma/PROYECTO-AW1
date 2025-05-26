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

    // Mostrar mensaje si el carrito está vacío
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

    // Encabezados del carrito
    const headersHTML = `
        <div class="cart-headers">
            <p class="header-title">Producto</p>
            <p class="header-quantity">Cantidad</p>
            <p class="header-price">Subtotal</p>
        </div>
    `;
    cartContainer.innerHTML = headersHTML;

    // Renderizar productos
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

    // Eliminar producto
    cartContainer.addEventListener('click', (event) => {
        if (event.target && event.target.classList.contains('remove-item')) {
            const index = event.target.getAttribute('data-index');
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            location.reload(); // Recargar para actualizar la vista
        }
    });

    // Comprar y enviar al backend
    if (comprarBtn) {
        comprarBtn.addEventListener('click', async () => {
            if (cart.length === 0) {
                alert("El carrito está vacío.");
                return;
            }
        
            const usuario = JSON.parse(localStorage.getItem('usuario'));
            if (!usuario || !usuario.id) {
                alert("No se encontró el usuario. Iniciá sesión antes de comprar.");
                return;
            }
        
            const productos = cart.map(item => ({
                id: item.id,
                cantidad: item.quantity
            }));
        
            const total = cart.reduce((acc, item) => {
                const precioNumerico = parseFloat(item.price.replace('$', ''));
                return acc + (precioNumerico * item.quantity);
            }, 0);
        
            const venta = {
                id_usuario: usuario.id,
                direccion: usuario.direccion || 'Sin dirección',
                total,
                productos
            };
        
            try {
                const res = await fetch('http://localhost:3000/ventas', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(venta)
                });
        
                if (!res.ok) {
                    throw new Error("Error al guardar la venta");
                }
        
                alert("Gracias por tu compra. ¡Venta registrada!");
                localStorage.removeItem('cart');
                location.reload();
            } catch (error) {
                console.error(error);
                alert("Hubo un problema al procesar tu compra.");
            }
        });
        
    }
});
