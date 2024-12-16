// dataLoader.js
import { renderizarCards } from '../pages/home.js';

const JSON_URL = "./data.json";

// Función para cargar los primeros 3 productos de cada categoría
export async function cargarProductos() {
  try {
    const respuesta = await fetch(JSON_URL);
    if (!respuesta.ok) throw new Error("No se pudo cargar el archivo JSON.");

    const data = await respuesta.json();
    const categorias = Object.keys(data.productos);
    let productosLimitados = [];

    // Seleccionamos los primeros 3 productos de cada categoría
    categorias.forEach((categoria) => {
      const productosCategoria = data.productos[categoria];
      productosLimitados = productosLimitados.concat(productosCategoria.slice(0, 3)); // Solo los 3 primeros
    });

    renderizarCards(productosLimitados); // Renderiza los 3 primeros productos de cada categoría
  } catch (error) {
    console.error("Error al cargar los productos:", error.message);
    const contenedorProductos = document.querySelector(".container");
    if (contenedorProductos) {
      contenedorProductos.innerHTML = `<p>${error.message}</p>`;
    }
  }
}
