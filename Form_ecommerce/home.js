import { cardComponet } from "./card.js";

let cardData =[
    {title: 'Anillo 1', Description: 'anillo de plata , con perla de oro', Text: '$300', },
    {title: 'Anillo 2', Description: 'anillo de oro, con perla de oro', Text: '$380'},
    {title: 'Anillo 3', Description: 'anillo de bronce, con perla de oro', Text: '$400'},
]

let cardConteiner=document.getElementById('cardContainer')
window.addEventListener('load', () => {

    const cards = cardData.map(e=> {
        return  cardComponet (e.title, e.Description, e.Text)
    
    }).join('')
    cardConteiner.innerHTML = cards
})