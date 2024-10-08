export const cardComponet = (title,Description,text) => {
    return `
    <div class="card ">

                <img src="./assets/anillo.jpeg" alt="">
                <div class="card-header">
                    ${title}
                </div>

                <div class="card-body">
                    ${Description}
                </div>

                <div class="card-span">
                    ${text}
                </div>

                <div>
                    <input type="number" name="0" id="cantidad" min="0" max="5" value="0">

                </div>
              
                <input type="button" value="Agregar al carrito" id ="Add">
            </div>
    `
}