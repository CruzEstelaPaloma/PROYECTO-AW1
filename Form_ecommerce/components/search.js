import { renderizarCards } from '../pages/home.js';

const API_URL = "http://localhost:3000/productos";

export function insertarSearchContainer() {
  const searchHTML = `
    <div id="search-container">
      <input type="search" id="search-input" placeholder="Buscar un producto por su nombre aquí...">
    </div>
  `;
  const contenedorSearch = document.getElementById("search-container-place");
  if (contenedorSearch) {
    contenedorSearch.innerHTML = searchHTML;
  } else {
    console.error('No se encontró el contenedor para insertar el search container.');
  }
}

export function actualizarTitulo(mensaje) {
  const titulo = document.querySelector(".page-title"); 
  if (titulo) {
    titulo.textContent = mensaje;
  }
}

export async function buscarProducto(nombreProducto) {
  try {
    const respuesta = await fetch(API_URL);
    if (!respuesta.ok) throw new Error("No se pudo cargar los productos del backend.");

    const data = await respuesta.json();

    const productos = [];
    for (const categoria in data.productos) {
      data.productos[categoria].forEach(prod => {
        productos.push({
          ...prod,
          categoria
        });
      });
    }

    const contenedorProductos = document.querySelector(".container");
    if (!contenedorProductos) {
      console.error("El contenedor '.container' no se encontró en el DOM.");
      return;
    }

    const productosEncontrados = productos.filter(producto =>
      producto.nombre.toLowerCase().includes(nombreProducto.toLowerCase()) ||
      producto.categoria.toLowerCase().includes(nombreProducto.toLowerCase())
    );

    if (productosEncontrados.length > 0) {
      actualizarTitulo("Resultados de la búsqueda");
      renderizarCards(productosEncontrados);
    } else {
      contenedorProductos.innerHTML = "<p>No se encontraron productos.</p>";
      actualizarTitulo("Sin resultados");
    }
  } catch (error) {
    console.error("Error al buscar productos:", error.message);
  }
}
