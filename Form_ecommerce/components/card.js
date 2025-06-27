export const cardComponet = (title, description, price, imageUrl, id) => {

    
    return `
    <div class="card" data-id="${id}">
        <img src="${imageUrl}" alt="" class="card-imag" style="width: 220px; height: 220px;">
        <div class="card-header">${title}</div>
        <div class="card-body">${description}</div>
        <div class="card-span">${price}</div>
        <div>
            <input type="number" name="0" id="cantidad" min="0" max="10" value="0">
        </div>
        <input type="button" value="Agregar al carrito" id="Add" class="boton-item">
    </div>
    `;
};


document.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('boton-item')) {
        const card = event.target.closest('.card');
        const title = card.querySelector('.card-header').innerText;
        const priceText = card.querySelector('.card-span').innerText;
        const price = parseFloat(priceText.replace('$', ''));
        const quantity = parseInt(card.querySelector('#cantidad').value);
        const id = String(card.getAttribute('data-id'));


        if (quantity <= 0) {
            alert("Selecciona una cantidad válida.");
            return;
        }

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find(item => item.id === id);

     

       if (existingProduct) {
        if (existingProduct.quantity + quantity > 5) {
          alert("Lo sentimos! Solo podés agregar hasta 5 unidades del mismo producto.");
          return;
        }
        existingProduct.quantity += quantity;
      } else {
        if (quantity > 5) {
          alert("Lo sentimos! Solo podés agregar hasta 5 unidades del mismo producto.");
          return;
        }
        cart.push({ id: card.getAttribute('data-id'), title, price: `$${price.toFixed(2)}`, quantity });
      }
      


        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${title} agregado al carrito.`);

        card.querySelector('#cantidad').value = 0;
    }
});
