
( () => {


    let deck = [];
    const tipos = ['C','D','H','S'],
          especiales = ['A', 'J', 'Q', 'K'];

    const btnNuevo = document.querySelector('#btnNuevo'),
          btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          puntosHTML = document.querySelectorAll('small'),
          cartasJugadorHTML = document.querySelector('.jugador-cartas'),
          cartasComputadoraHTML = document.querySelector('.computadora-cartas');

    let puntosJugador = 0,
        puntosComputador = 0;

    // crear la baraja

    const iniciarJuego = () => {
        deck = crearDeck();
    }

    let crearDeck = () => {

        deck = [];
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

        return _.shuffle(deck);
    }

    // tomar una carta

    const pedirCarta = () => {
        
        if( deck.length===0){
            throw 'No hay cartas en el deck';
        }        
        return deck.pop();
    }

    const valorCarta = ( carta ) =>{

        const valor = carta.substring(0, carta.length - 1);
        
        return (isNaN( valor )) ?
                ( valor==='A') ? 11 : 10
                : valor * 1;
    }

    //Turno computadora
    const turnoComputadora = ( puntosMinimos ) =>{

        do{
            const carta = pedirCarta();
            puntosComputador +=valorCarta(carta);
            puntosHTML[1].innerText = puntosComputador;
        
            const nuevaCartaHTML = document.createElement('img');
        
            nuevaCartaHTML.classList.add('carta');
        
            nuevaCartaHTML.src = `assets/cartas/${carta}.png`;
            cartasComputadoraHTML.append( nuevaCartaHTML );

            if(puntosMinimos > 21){
                break;
            }
        }while( (puntosComputador < puntosMinimos) && (puntosMinimos<=21));
        
        setTimeout(() =>{
            
            if( puntosComputador === puntosMinimos ){
                alert('Nadie ganó');
            } else if(puntosMinimos > 21){
                alert('La computadora ganó');
            } else if( puntosComputador > 21){
                alert('Has ganado!');
            } else{
                alert('La computadora ganó');
            }
        }, 60);
    }

    //Evento pedir

    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        puntosJugador +=valorCarta(carta);
        puntosHTML[0].innerText = puntosJugador;

        const nuevaCartaHTML = document.createElement('img');

        nuevaCartaHTML.classList.add('carta');

        nuevaCartaHTML.src = `assets/cartas/${carta}.png`;
        cartasJugadorHTML.append( nuevaCartaHTML );

        if ( puntosJugador >21 ){
            console.warn (' Has perdido ');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if ( puntosJugador === 21 ) {
            console.warn(' 21, Excelente!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });

    // Evento detener

    btnDetener.addEventListener('click', () =>{
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );

        
    });


    // Evento nuevo

    btnNuevo.addEventListener('click', () => {

        iniciarJuego();
        // deck = [];
        // deck = crearDeck();

        puntosComputador = 0;
        puntosJugador = 0;
        
        puntosHTML[0].innerText = 0;
        puntosHTML[1].innerText  = 0;

        cartasComputadoraHTML.innerHTML = '';
        cartasJugadorHTML.innerHTML = '';

        btnPedir.disabled = false;
        btnDetener.disabled = false;

    });

})();