// index.js
import { cargarProductos } from './components/dataLoader.js';
import { loadNavBar } from './components/navbar.js';

loadNavBar(); 

document.addEventListener("DOMContentLoaded", () => {
    if (document.body.id === "principal") {
        cargarProductos();
    }
});
