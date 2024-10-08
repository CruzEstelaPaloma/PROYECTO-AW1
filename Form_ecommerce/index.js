

const navElements =[
    { titile: 'Home', link: './index.html'},
    { titile: 'Ropa', link: './ropa.html'},
    { titile: 'Maquillaje', link: './maquillaje.html'},
    { titile: 'Accesorios', link: './accesorios.html'},
    { titile: 'Logout', link:'./login.html'},
]
 const navBarComponent = `
    <nav>
        <input type="checkbox"  id="check">
            <label for="check" class =" checkbtn">
                <img src="./assets/menu.png" alt="Icono de Menu" style = "width: 13px; height: 20px;">
            </label>
            <a href="#" class="enlace">
                <img src="./assets/Logo Belleza Minimalista Rosa (1).jpg" class="LogoSolito" style="height: 80px; width: 50px;">
            </a>
            <a href="#" class="titulo">Amelia</a>
            
            
            <ul>
               
               ${
                navElements.map (e=> {
                    return ` <li class = "nav-item">
                    <a class ="nav-link" href=  ${e.link}>${e.titile} </a></li>`
                }).join('')
               }
               
            </ul>
    
          
    </nav>
`


let navContainer = document.querySelector('header')
window.addEventListener('load',() =>{

    navContainer.innerHTML = navBarComponent
})

