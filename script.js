<<<<<<< Updated upstream
=======
let contenedorPrincipal = document.querySelector('.gameBg');
let listaSupervivientes = document.getElementsByClassName("superviviente");
let superviviente = document.querySelector('.superviviente');
let pantallaX = window.innerWidth;
let pantallaY = window.innerHeight;

/* ¡¡¡¡¡¡¡¡¡VARIABLE TEMPORAL (QUITARLA CUANDO TENAMOS LA MECANICA DE MOVIMIENTO DEL HELICOPTERO)!!!!!!!! */
let helicopteroActivo = true;


>>>>>>> Stashed changes
let arrayComida = [
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0}
];

let anchoComida = 50;
let altComida = 50;

<<<<<<< Updated upstream
//Genera posición aleatoria para las comida sin que se sobrelapan
function generaPosicionComida(contenedorComidaX, contenedorComidaY){
=======
posicionarSupervivientes(listaSupervivientes);


//Genera posición aleatoria para las comida sin que se solapen
function generaPosicionComida(){
>>>>>>> Stashed changes
    for (let i=0; i<arrayComida.length; i++){
        let randomX;
        let randomY;
        let overlap;
        do{
            randomX = Math.random() * (contenedorComidaX - anchoComida);
            randomY = Math.random() * (contenedorComidaY - altComida);
            overlap = false;
            for (let j=0; j<i; j++) {
                if (Math.abs(randomX - arrayComida[j].x) < anchoComida && Math.abs(randomY - arrayComida[j].y) < altComida){
                    overlap = true;
                    break;
                }
            }
        } while (overlap);
        arrayComida[i].x = randomX;
        arrayComida[i].y = randomY;
    }
    pintarComidas();
}
// Pinta las comidas
function pintarComidas(contenedorComida){
    for (let i=0; i<arrayComida.length; i++){
        let divComida = document.createElement('div');
        divComida.classList.add('comida');
        divComida.style.top = arrayComida[i].y + 'px';
        divComida.style.left = arrayComida[i].x + 'px';
        contenedorComida.appendChild(divComida);
    }
}

// Aparición aleatoria de supervivientes.

function aleatorio() {
    let coordRandomX = Math.round(Math.random()* window.innerWidth);
    let coordRandomY = Math.round(Math.random()* window.innerHeight);
}

// Musica
function r1() {
    audio.pause();
    audio.src = 'media/creedence.mp3';
    audio.play();
}
function r2() {
    audio.pause();
    audio.src = 'media/wagner.mp3';
    audio.play();
}
function r3() {
    audio.pause();
    audio.src = 'media/acdc.mp3';
    audio.play();
}
function mute(){
    audio.pause();
<<<<<<< Updated upstream
}
=======
}

// Aparición aleatoria de supervivientes.
function coordenadasAleatoriasSupervivientes() {
    let coordRandomX = Math.round(Math.random() * (pantallaX - anchoSuperviviente));
    let coordRandomY = Math.round(Math.random() * (pantallaY - altoSuperviviente));
    return [coordRandomX, coordRandomY];
}

// Posiciona a los supervivientes en la pantalla
function posicionarSupervivientes(supervivientes) {
    for (let i = 0; i < supervivientes.length; i++) {
        let coordenadas = coordenadasAleatoriasSupervivientes();
        supervivientes[i].style.left = coordenadas[0] + 'px';
        supervivientes[i].style.top = coordenadas[1] + 'px';
    }
    generaPosicionComida()
}


// Obtiene la lista de supervivientes y los posiciona cuando la página carga
window.onload = function() {
    let elementos = document.getElementsByClassName("superviviente");
    let listaSupervivientes = [];

    for (let i = 0; i < elementos.length; i++) {
        listaSupervivientes[i] = elementos[i];
    }

    posicionarSupervivientes(listaSupervivientes);
};

function rescatarSuperviviente(superviviente) {
    if (!helicopteroActivo) return;
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
=======

    let heli = document.querySelector('.heli');
    let heliPic = document.querySelector('.heliPic');

    let heliX = heli.getBoundingClientRect().left;
    let heliY = heli.getBoundingClientRect().top;
    let supX = superviviente.getBoundingClientRect().left;
    let supY = superviviente.getBoundingClientRect().top;

    // Mover el helicóptero al superviviente
    heli.style.transition = 'top 2s linear, left 2s linear';
    heli.style.left = supX + 'px';
    heli.style.top = supY + 'px';

    setTimeout(() => {
        // Ocultar al superviviente (simular que subió)
        superviviente.style.transition = 'opacity 0.5s';
        superviviente.style.opacity = 0;

        setTimeout(() => {
            // Regresar el helicóptero a la base
            heli.style.left = heliX + 'px';
            heli.style.top = heliY + 'px';
        }, 2000);
    }, 2000);
}
>>>>>>> Stashed changes

    let heli = document.querySelector('.heli');
    let heliPic = document.querySelector('.heliPic');

    let heliX = heli.getBoundingClientRect().left;
    let heliY = heli.getBoundingClientRect().top;
    let supX = superviviente.getBoundingClientRect().left;
    let supY = superviviente.getBoundingClientRect().top;

    // Mover el helicóptero al superviviente
    heli.style.transition = 'top 2s linear, left 2s linear';
    heli.style.left = supX + 'px';
    heli.style.top = supY + 'px';

    setTimeout(() => {
        // Ocultar al superviviente (simular que subió)
        superviviente.style.transition = 'opacity 0.5s';
        superviviente.style.opacity = 0;

        setTimeout(() => {
            // Regresar el helicóptero a la base
            heli.style.left = heliX + 'px';
            heli.style.top = heliY + 'px';
        }, 2000);
    }, 2000);
}
>>>>>>> Stashed changes

    let heli = document.querySelector('.heli');
    let heliPic = document.querySelector('.heliPic');

    let heliX = heli.getBoundingClientRect().left;
    let heliY = heli.getBoundingClientRect().top;
    let supX = superviviente.getBoundingClientRect().left;
    let supY = superviviente.getBoundingClientRect().top;

    // Mover el helicóptero al superviviente
    heli.style.transition = 'top 2s linear, left 2s linear';
    heli.style.left = supX + 'px';
    heli.style.top = supY + 'px';

    setTimeout(() => {
        // Ocultar al superviviente (simular que subió)
        superviviente.style.transition = 'opacity 0.5s';
        superviviente.style.opacity = 0;

        setTimeout(() => {
            // Regresar el helicóptero a la base
            heli.style.left = heliX + 'px';
            heli.style.top = heliY + 'px';
        }, 2000);
    }, 2000);
}

>>>>>>> Stashed changes
