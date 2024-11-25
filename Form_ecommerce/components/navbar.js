 const navElements =[
    { titile: 'Home', link: '/Form_ecommerce/index.html'},
    { titile: 'Ropa', link: '/Form_ecommerce/pages/ropa.html'},
    { titile: 'Maquillaje', link: '/Form_ecommerce/pages/maquillaje.html'},
    { titile: 'Accesorios', link: '/Form_ecommerce/pages/accesorios.html'},
    { titile: 'Logout', link:'/Form_ecommerce/auth/login/login.html', id:'logout'},
]
export const navBarComponent = `
    <nav>
        <input type="checkbox" id="check">
        <label for="check" class="checkbtn">
            <img src="/Form_ecommerce/assets/menu.png" alt="Icono de Menu" style="width: 13px; height: 20px;">
        </label>
        <a href="#" class="enlace">
            <img src="/Form_ecommerce/assets/Logo Belleza Minimalista Rosa (1).jpg" class="LogoSolito" style="height: 80px; width: 50px;">
        </a>
        <a href="#" class="titulo">Amelia</a>
        <ul>
            ${
                navElements.map(e => {
                    const idAttribute = e.id ? `id="${e.id}"` : '';
                    return `<li class="nav-item">
                        <a class="nav-link" href="${e.link}" ${idAttribute}>${e.titile}</a>
                    </li>`;
                }).join('')
            }
            <li class="nav-item">
                <a href="/Form_ecommerce/pages/carrito.html" class="nav-link">Carrito (<span id="cart-indicator"></span>)</a>
            </li>
        </ul>
    </nav>
`;


export const loadNavBar = () => {
    const navContainer = document.querySelector('header');
    window.addEventListener('load', () => {
        navContainer.innerHTML = navBarComponent;

        
        const logoutButton = document.getElementById('logout');
        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                sessionStorage.removeItem('active_user');
                alert('Has cerrado sesión.');
                window.location.href = '/Form_ecommerce/auth/login/login.html';
            });
        }

        const cartIndicator = document.getElementById('cart-indicator');
        const updateCartIndicator = () => {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartIndicator.textContent = totalItems > 0 ? totalItems : '';
        };

        updateCartIndicator();

    
        window.addEventListener('storage', updateCartIndicator);
    });
};




