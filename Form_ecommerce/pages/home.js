import { cardComponet } from '../components/card.js';
import { insertarSearchContainer, buscarProducto, actualizarTitulo } from '../components/search.js';
import { cargarProductos } from '../components/dataLoader.js'; 
import { loadNavBar } from '../components/navbar.js';

const JSON_URL = "http://localhost:3000/api/Productos"; 

const TITULOS_CATEGORIAS = {
  maquillaje: "Productos de Maquillaje",
  ropa: "Prenda de Ropa",
  accesorios: "Accesorios",
};

loadNavBar();

document.addEventListener("DOMContentLoaded", () => {
  insertarSearchContainer();

  if (document.body.id === "principal") {
    cargarProductos(); 
  } else {
    cargarProductosPorCategoria(); 
  }

  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const searchValue = searchInput.value.trim();

      if (searchValue) {
        buscarProducto(searchValue); 
      } else {
        const tituloOriginal =
          document.body.id === "principal"
            ? "Tienda de belleza"
            : TITULOS_CATEGORIAS[document.body.id] || "Productos";
        actualizarTitulo(tituloOriginal);

        if (document.body.id === "principal") {
          cargarProductos();
        } else {
          cargarProductosPorCategoria();
        }
      }
    });
  }
});

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

  cardContainer.innerHTML = ""; 

  productos.forEach(producto => {
    
    const cardHTML = cardComponet(
      producto.nombre,
      producto.desc,
      `$${(producto.precio ?? 0).toFixed(2)}`,
      producto.imagen,
      producto._id 
    );
    cardContainer.innerHTML += cardHTML;
  });
}

export async function cargarProductosPorCategoria() {
  const categoria = document.body.id;
  const contenedorProductos = document.querySelector(".container");

  if (!contenedorProductos) {
    console.error("El contenedor de productos '.container' no se encontró en el DOM.");
    return;
  }

  try {
    if (!categoria) throw new Error("El atributo 'id' del body no está definido.");

    const respuesta = await fetch(JSON_URL);
    if (!respuesta.ok) throw new Error("No se pudo cargar el archivo de productos.");

    const productos = await respuesta.json(); 

    const productosFiltrados = productos.filter(p =>
      p.categoria?.toLowerCase() === categoria.toLowerCase()
    );

    if (!productosFiltrados.length) {
      throw new Error(`No se encontraron productos para la categoría: ${categoria}`);
    }

    renderizarCards(productosFiltrados);
  } catch (error) {
    console.error("Error al cargar los productos:", error.message);
    contenedorProductos.innerHTML = `<p>${error.message}</p>`;
  }
}
