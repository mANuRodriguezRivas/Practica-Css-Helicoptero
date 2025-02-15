let arrayComida = [
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0}
];

let anchoSuperviviente = 50;
let altoSuperviviente = 50;
let coordenadasAleatorias = [];
let anchoComida = 50;
let altComida = 50;

// Genera posición aleatoria para las comida sin que se sobrelapan
function generaPosicionComida(contenedorComidaX, contenedorComidaY) {
    for (let i = 0; i < arrayComida.length; i++) {
        let randomX, randomY, overlap;
        do {
            randomX = Math.random() * (contenedorComidaX - anchoComida);
            randomY = Math.random() * (contenedorComidaY - altComida);
            overlap = false;
            for (let j = 0; j < i; j++) {
                if (Math.abs(randomX - arrayComida[j].x) < anchoComida && Math.abs(randomY - arrayComida[j].y) < altComida) {
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
function pintarComidas(contenedorComida) {
    for (let i = 0; i < arrayComida.length; i++) {
        let divComida = document.createElement('div');
        divComida.classList.add('comida');
        divComida.style.top = arrayComida[i].y + 'px';
        divComida.style.left = arrayComida[i].x + 'px';
        contenedorComida.appendChild(divComida);
    }
}

// Aparición aleatoria de supervivientes.
function aleatorio() {
    let coordRandomX = Math.round(Math.random() * window.innerWidth);
    let coordRandomY = Math.round(Math.random() * window.innerHeight);
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

function mute() {
    audio.pause();
}

// Aparición aleatoria de supervivientes.
function coordenadasAleatoriasSupervivientes() {
    let coordRandomX = Math.round(Math.random() * (window.innerWidth - anchoSuperviviente));
    let coordRandomY = Math.round(Math.random() * (window.innerHeight - altoSuperviviente));
    return [coordRandomX, coordRandomY];
}

// Posiciona a los supervivientes en la pantalla
function posicionarSupervivientes(supervivientes) {
    for (let i = 0; i < supervivientes.length; i++) {
        let coordenadas = coordenadasAleatoriasSupervivientes();
        supervivientes[i].style.left = coordenadas[0] + 'px';
        supervivientes[i].style.top = coordenadas[1] + 'px';
    }
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
