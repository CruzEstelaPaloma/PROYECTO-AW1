import { cardComponet } from '../components/card.js';
import { loadNavBar } from '/Form_ecommerce/components/navbar.js';
loadNavBar();


const JSON_URL = "../data.json";


async function cargarProductosPorCategoria() {
  const contenedorProductos = document.querySelector(".container");
  const categoria = document.body.id;
  console.log("Categoria del body:", categoria);

  if (!contenedorProductos) {
    console.error("El contenedor de productos '.container' no se encontró en el DOM.");
    return;
  }

  try {
    if (!categoria) {
      throw new Error("El atributo 'id' del body no está definido.");
    }

    const respuesta = await fetch(JSON_URL);

    if (!respuesta.ok) {
      throw new Error("No se pudo cargar el archivo JSON.");
    }

    const data = await respuesta.json();

    
    const productos = data.productos[categoria];

    if (!productos || !Array.isArray(productos)) {
      throw new Error(`No se encontraron productos para la categoría: ${categoria}`);
    }

    
    renderizarCards(productos);
  } catch (error) {
    console.error("Error al cargar los productos:", error.message);
    contenedorProductos.innerHTML = `<p>${error.message}</p>`;
  }
}


function renderizarCards(productos) {
  const cardContainer = document.getElementById('cardContainer');
  if (!cardContainer) {
    console.error("El contenedor de tarjetas no se encontró en el DOM.");
    return;
  }

  if (!Array.isArray(productos)) {
    console.error("Error: 'productos' no es un array. Valor recibido:", productos);
    return;
  }

  cardContainer.innerHTML = ""; 

  
  productos.forEach(producto => {
    const cardHTML = cardComponet(
      producto.nombre, // Título
      producto.descripcion, // Descripción
      `$${producto.precio.toFixed(2)}`, // Precio
      producto.imagen, // Imagen principal
      producto.id 
    );
    cardContainer.innerHTML += cardHTML;

  
    const addButton = cardContainer.querySelector(`#Add`);
    addButton.addEventListener('click', () => {
      const quantity = parseInt(card.querySelector('#cantidad').value);

      if (quantity <= 0) {
        alert("Selecciona una cantidad válida.");
        return;
      }

    
      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      const existingProduct = cart.find(item => item.id === producto.id);

      if (existingProduct) {
        
        existingProduct.quantity += quantity;
      } else {
        
        cart.push({
          id: producto.id, 
          title: producto.nombre,
          price: producto.precio.toFixed(2),
          quantity: quantity
        });
      }

      
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${producto.nombre} agregado al carrito.`);
    });
  });
}

document.addEventListener("DOMContentLoaded", cargarProductosPorCategoria);




