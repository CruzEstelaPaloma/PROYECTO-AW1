import { renderizarCards } from '../pages/home.js';
const JSON_URL = "/Form_ecommerce/data.json"; 


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
    const respuesta = await fetch(JSON_URL);
    if (!respuesta.ok) throw new Error("No se pudo cargar el archivo JSON.");

    const data = await respuesta.json();
    const categorias = Object.keys(data.productos);
    let productosEncontrados = [];

    const contenedorProductos = document.querySelector(".container");
    if (!contenedorProductos) {
      console.error("El contenedor '.container' no se encontró en el DOM.");
      return;
    }

    contenedorProductos.innerHTML = ""; 

    
    const categoriaMatch = categorias.find((categoria) =>
      categoria.toLowerCase().includes(nombreProducto.toLowerCase())
    );

    if (categoriaMatch) {
      
      productosEncontrados = data.productos[categoriaMatch];
    } else {
      
      categorias.forEach((categoria) => {
        const productosCategoria = data.productos[categoria].filter((producto) =>
          producto.nombre.toLowerCase().includes(nombreProducto.toLowerCase())
        );
        productosEncontrados = productosEncontrados.concat(productosCategoria);
      });
    }

   
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
