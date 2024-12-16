import { cardComponet } from '../components/card.js';
import { insertarSearchContainer, buscarProducto, actualizarTitulo } from '../components/search.js';
import { cargarProductos } from '../components/dataLoader.js'; // Importación desde el nuevo archivo
import { loadNavBar } from '../components/navbar.js';

const JSON_URL = "../data.json"; // Ruta al archivo JSON

loadNavBar();

// Mapear títulos de categorías para un manejo más limpio
const TITULOS_CATEGORIAS = {
  maquillaje: "Productos de Maquillaje",
  ropa: "Prenda de Ropa",
  accesorios: "Accesorios",

};

document.addEventListener("DOMContentLoaded", () => {
  insertarSearchContainer();

  // Cargar productos según la página actual
  if (document.body.id === "principal") {
    cargarProductos();
  } else {
    cargarProductosPorCategoria();
  }

  // Configurar búsqueda en tiempo real
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const searchValue = searchInput.value.trim();

      if (searchValue) {
        buscarProducto(searchValue); // Realiza la búsqueda
      } else {
        // Restaurar el título original
        const tituloOriginal =
          document.body.id === "principal"
            ? "Tienda de belleza"
            : TITULOS_CATEGORIAS[document.body.id] || "Productos";
        actualizarTitulo(tituloOriginal);

        // Restaurar la carga de productos
        if (document.body.id === "principal") {
          cargarProductos();
        } else {
          cargarProductosPorCategoria();
        }
      }
    });
  }
});

// Renderiza tarjetas de productos
export function renderizarCards(productos) {
  const cardContainer = document.getElementById('cardContainer');
  if (!cardContainer) {
    console.error("El contenedor de tarjetas no se encontró en el DOM.");
    return;
  }

  if (!Array.isArray(productos)) {
    console.error("Error: 'productos' no es un array. Valor recibido:", productos);
    return;
  }

  cardContainer.innerHTML = ""; // Limpia el contenedor antes de renderizar

  productos.forEach(producto => {
    const cardHTML = cardComponet(
      producto.nombre,        // Título
      producto.descripcion,   // Descripción
      `$${producto.precio.toFixed(2)}`, // Precio
      producto.imagen,        // Imagen
      producto.id             // ID del producto
    );
    cardContainer.innerHTML += cardHTML;
  });
}

// Carga productos según la categoría
export async function cargarProductosPorCategoria() {
  const categoria = document.body.id; // ID del body como categoría
  const contenedorProductos = document.querySelector(".container");

  if (!contenedorProductos) {
    console.error("El contenedor de productos '.container' no se encontró en el DOM.");
    return;
  }

  try {
    if (!categoria) throw new Error("El atributo 'id' del body no está definido.");

    const respuesta = await fetch(JSON_URL);
    if (!respuesta.ok) throw new Error("No se pudo cargar el archivo JSON.");

    const data = await respuesta.json();
    const productos = data.productos[categoria];

    if (!productos || !Array.isArray(productos)) {
      throw new Error(`No se encontraron productos para la categoría: ${categoria}`);
    }

    renderizarCards(productos); // Muestra todos los productos de la categoría
  } catch (error) {
    console.error("Error al cargar los productos:", error.message);
    contenedorProductos.innerHTML = `<p>${error.message}</p>`;
  }
}
