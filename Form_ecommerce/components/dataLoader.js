import { renderizarCards } from '../pages/home.js';

const API_URL = "http://localhost:3000/api/Productos"; // Ruta correcta del backend

export async function cargarProductos() {
  try {
    const respuesta = await fetch(API_URL);
    if (!respuesta.ok) throw new Error("No se pudo cargar el archivo del backend.");

    const productos = await respuesta.json(); // Recibe un array plano

    // Agrupar productos por categoría
    const productosPorCategoria = {};
    productos.forEach(prod => {
      const categoria = prod.categoria || 'otros';
      if (!productosPorCategoria[categoria]) {
        productosPorCategoria[categoria] = [];
      }
      productosPorCategoria[categoria].push(prod);
    });

    // Obtener los primeros 3 productos de cada categoría
    let productosLimitados = [];
    Object.values(productosPorCategoria).forEach(lista => {
      productosLimitados = productosLimitados.concat(lista.slice(0, 3));
    });

    // Renderizar los productos en la interfaz
    renderizarCards(productosLimitados);
  } catch (error) {
    console.error("Error al cargar los productos:", error.message);
    const contenedorProductos = document.querySelector(".container");
    if (contenedorProductos) {
      contenedorProductos.innerHTML = `<p>${error.message}</p>`;
    }
  }
}
