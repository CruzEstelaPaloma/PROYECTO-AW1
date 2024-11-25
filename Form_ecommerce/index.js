import { loadNavBar } from './components/navbar.js';
import { cardComponet } from './components/card.js'; 

loadNavBar(); 


const JSON_URL = "./data.json";


async function cargarProductos() {
  const contenedorProductos = document.querySelector(".container");

  if (!contenedorProductos) {
    console.error("El contenedor de productos '.container' no se encontró en el DOM.");
    return;
  }

  try {
    const respuesta = await fetch(JSON_URL);

    if (!respuesta.ok) {
      throw new Error("No se pudo cargar el archivo JSON.");
    }

    const data = await respuesta.json();

    
    const categorias = Object.keys(data.productos);

  
    contenedorProductos.innerHTML = '';

   
    categorias.forEach(categoria => {
      const productos = data.productos[categoria]; 
      const productosAMostrar = productos.slice(0, 3); 
      productosAMostrar.forEach(producto => renderizarCard(producto));
    });

  } catch (error) {
    console.error("Error al cargar los productos:", error.message);
    contenedorProductos.innerHTML = `<p>${error.message}</p>`;
  }
}


function renderizarCard(producto) {
  const cardContainer = document.getElementById('cardContainer');
  if (!cardContainer) {
    console.error("El contenedor de tarjetas no se encontró en el DOM.");
    return;
  }

  if (!producto) {
    console.error("Producto no encontrado:", producto);
    return;
  }

  const cardHTML = cardComponet(
    producto.nombre, // Título
    producto.descripcion, // Descripción
    `$${producto.precio.toFixed(2)}`, // Precio
    producto.imagen // Imagen
  );

 
  cardContainer.innerHTML += cardHTML;
}


document.addEventListener("DOMContentLoaded", cargarProductos);



