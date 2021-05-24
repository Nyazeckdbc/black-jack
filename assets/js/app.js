
let deck = [];
const tipos = ['C','D','H','S'];
const especiales = ['A', 'J', 'Q', 'K'];

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

const valor = valorCarta(pedirCarta());
console.log( valor );


document.querySelector('.titulo-index').innerText = 'Prueba';



