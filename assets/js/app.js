
let deck = [];
const tipos = ['C','D','H','S'];
const especiales = ['A', 'J', 'Q', 'K'];

const btnNuevo = document.querySelector('#btnNuevo');
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const puntosHTML = document.querySelectorAll('small');

const cartasJugadorHTML = document.querySelector('.jugador-cartas');
const cartasComputadoraHTML = document.querySelector('.computadora-cartas');

let puntosJugador = 0,
    puntosComputador = 0;

// crear la baraja


let crearDeck = () => {

    for( let i=2; i<=10; i++){
        for( let tipo of tipos){
            deck.push( i + tipo);
        }
    }

    for( let tipo of tipos){
        for( let especial of especiales){
            deck.push( especial + tipo );
        }
    }

    deck = _.shuffle(deck);
    return deck;
}


crearDeck();


// tomar una carta

const pedirCarta = () => {
    
    if( deck.length===0){
        throw 'No hay cartas en el deck';
    }

    const carta = deck.pop();
    return carta;
}


const valorCarta = ( carta ) =>{

    const valor = carta.substring(0, carta.length - 1);
    
    return (isNaN( valor )) ?
            ( valor==='A') ? 11 : 10
            : valor * 1;

}

btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();
    puntosJugador +=valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    const nuevaCartaHTML = document.createElement('img');

    nuevaCartaHTML.classList.add('carta');

    nuevaCartaHTML.src = `assets/cartas/${carta}.png`;
    cartasJugadorHTML.append( nuevaCartaHTML);

    if ( puntosJugador >21 ){
        console.warn (' Has perdido ');
        btnPedir.disabled = true;
    }
});


