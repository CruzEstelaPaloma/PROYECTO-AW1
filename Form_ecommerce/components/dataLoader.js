
import { renderizarCards } from '../pages/home.js';

const JSON_URL = "./data.json";


export async function cargarProductos() {
  try {
    const respuesta = await fetch(JSON_URL);
    if (!respuesta.ok) throw new Error("No se pudo cargar el archivo JSON.");

    const data = await respuesta.json();
    const categorias = Object.keys(data.productos);
    let productosLimitados = [];

    
    categorias.forEach((categoria) => {
      const productosCategoria = data.productos[categoria];
      productosLimitados = productosLimitados.concat(productosCategoria.slice(0, 3)); 
    });

    renderizarCards(productosLimitados); 
  } catch (error) {
    console.error("Error al cargar los productos:", error.message);
    const contenedorProductos = document.querySelector(".container");
    if (contenedorProductos) {
      contenedorProductos.innerHTML = `<p>${error.message}</p>`;
    }
  }
}
