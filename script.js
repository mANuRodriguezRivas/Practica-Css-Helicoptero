let contenedorPrincipal = document.querySelector('.gameBg');
let listaSupervivientes = document.getElementsByClassName("superviviente");
let pantallaX = window.innerWidth;
let pantallaY = window.innerHeight;

/* ¡¡¡¡¡¡¡¡¡VARIABLE TEMPORAL (QUITARLA CUANDO TENAMOS LA MECANICA DE MOVIMIENTO DEL HELICOPTERO)!!!!!!!! */
let helicopteroActivo = false;

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

posicionarSupervivientes(listaSupervivientes);


// Genera posición aleatoria para la comida sin que se solape
function generaPosicionComida(){
    for (let i=0; i<arrayComida.length; i++){
        let randomX;
        let randomY;
        let overlap;
        do {
            randomX = Math.random() * (pantallaX - anchoComida);
            randomY = Math.random() * (pantallaY - altComida);

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
    pintarComidas(contenedorPrincipal);
}

// Pinta las comidas
function pintarComidas(contenedorComida){
    let comidas = document.querySelectorAll('.comida');
    for (let i=0; i<comidas.length; i++){
        comidas[i].remove();
    }
    for (let i=0; i<arrayComida.length; i++){
        let divComida = document.createElement('div');
        divComida.classList.add('comida');
        divComida.style.top = arrayComida[i].y + 'px';
        divComida.style.left = arrayComida[i].x + 'px';
        divComida.id = `comida_${i}`;
        contenedorComida.appendChild(divComida);
    }
}

// Recolección comida o rescate
function recoleccionComida(supervivienteSeleccionado) {
    if (!helicopteroActivo) {
        rescatarSuperviviente(supervivienteSeleccionado);
        return;
    }

    let supervivienteSeleccionadoY = parseFloat(supervivienteSeleccionado.style.top);
    let supervivienteSeleccionadoX = parseFloat(supervivienteSeleccionado.style.left);

    supervivienteSeleccionado.style.animation = 'none';
    void supervivienteSeleccionado.offsetWidth;

    let closestComidaCoords = [];
    let closestComida = 0;

    if (arrayComida.length > 0) {
        for (let i=0; i<arrayComida.length; i++){
            let distance = Math.sqrt(Math.pow(arrayComida[i].x - supervivienteSeleccionadoX, 2) + Math.pow(arrayComida[i].y - supervivienteSeleccionadoY, 2));
            if (i == 0 || distance < closestComida) {
                closestComidaCoords = { x: arrayComida[i].x, y: arrayComida[i].y };
                closestComida = distance;
            }
        }
        supervivienteSeleccionado.style.setProperty('--startX', `${supervivienteSeleccionadoX}px`);
        supervivienteSeleccionado.style.setProperty('--startY', `${supervivienteSeleccionadoY}px`);
        supervivienteSeleccionado.style.setProperty('--endX', `${closestComidaCoords.x}px`);
        supervivienteSeleccionado.style.setProperty('--endY', `${closestComidaCoords.y}px`);
        supervivienteSeleccionado.style.animation = 'comida 5s ease-out';

        for (let i=0; i<arrayComida.length; i++){
            if (arrayComida[i].x == closestComidaCoords.x && arrayComida[i].y == closestComidaCoords.y){
                arrayComida.splice(i, 1);
                desaparicionComida(`comida_${i}`);
                break;
            }
        }
    }
}

// Rescatar superviviente con el helicóptero
function rescatarSuperviviente(supervivienteSeleccionado) {
    heliAnimacionDesact()
    if (helicopteroActivo) return; // Si ya está en movimiento, no hacer nada

    let heli = document.querySelector('.heli');
    let heliX = heli.offsetLeft;
    let heliY = heli.offsetTop;
    let supX = supervivienteSeleccionado.offsetLeft;
    let supY = supervivienteSeleccionado.offsetTop;

    helicopteroActivo = true; // Bloquear nuevas órdenes mientras se mueve

    // Mover el helicóptero hasta el superviviente con animación
    heli.style.transition = 'top 6s linear, left 6s linear';
    heli.style.left = supX + 'px';
    heli.style.top = supY + 'px';

    setTimeout(() => {
        supervivienteSeleccionado.style.opacity = 0; // Simula el rescate

        setTimeout(() => {
            heli.style.left = heliX + 'px';
            heli.style.top = heliY + 'px';

            setTimeout(() => {
                helicopteroActivo = false; // Reactivar el helicóptero después del rescate
            }, 6000); // Tiempo de espera para activar el heli de nuevo
        }, 1000); //tiempo de espera en el sitio del superviviente
    }, 6000); //tiempo de visualización del superviviente
    heliAnimacion();
    
}

function desaparicionComida(idComida){
    let comida = document.getElementById(idComida);
    comida.style.animation = 'desaparicion 0.5s 3s ease-out forwards';
    setTimeout(pintarComidas, 4000, contenedorPrincipal);
}

// Cambio de cursor cuando el helicóptero está activo
document.addEventListener('mouseover', function(e){
    if (e.target.classList.contains('superviviente') && helicopteroActivo){
        e.target.style.cursor = 'url("media/cursorComida.png"), auto';
    }
});

// Música
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
    generaPosicionComida();
}

// Iniciar el posicionamiento cuando la página carga
window.onload = function() {
    let elementos = document.getElementsByClassName("superviviente");
    let listaSupervivientes = [];

    for (let i = 0; i < elementos.length; i++) {
        listaSupervivientes[i] = elementos[i];
    }

    posicionarSupervivientes(listaSupervivientes);
};

// Gestion del tiempo de vida

// function temporizadorVidaSuperviviente(superviviente) {
//     setTimeout(eliminarSuperviviente, 3000, superviviente); 
//     superviviente.style.animation = 'desaparicion 3s ease-out forwards';        // Cambiar tiempo de desaparicion.  ¿Desaparecen todos a la vez?
// }

// function eliminarSuperviviente(superviviente) {
//     if (superviviente) { 
//         superviviente.style.opacity = 1; 
//         superviviente.style.backgroundImage = "url('media/fallo.png')"; 
//     }
// }


//Añadir clase de helicoptero Animado
function heliAnimacion(){
    let vuelo = document.getElementById('heliFoto');
    vuelo.classList.add('heliPic2');
}

function heliAnimacionDesact(){
    let vuelo = document.getElementById('heliFoto');
    vuelo.classList.add('heliPic');

    
}

