let contenedorPrincipal = document.querySelector('.gameBg');
let listaSupervivientes = document.getElementsByClassName("superviviente");
let superviviente = document.querySelector('.superviviente');
let pantallaX = window.innerWidth;
let pantallaY = window.innerHeight;

/* ¡¡¡¡¡¡¡¡¡VARIABLE TEMPORAL (QUITARLA CUANDO TENAMOS LA MECANICA DE MOVIMIENTO DEL HELICOPTERO)!!!!!!!! */
let helicopteroActivo = true;


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


//Genera posición aleatoria para las comida sin que se solapen
function generaPosicionComida(){
    for (let i=0; i<arrayComida.length; i++){
        let randomX;
        let randomY;
        let overlap;
        do{
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

//Recolección comida
function recoleccionComida(supervivienteSeleccionado){
    supervivienteSeleccionadoY = parseFloat(supervivienteSeleccionado.style.top);
    supervivienteSeleccionadoX = parseFloat(supervivienteSeleccionado.style.left);

    supervivienteSeleccionado.style.animation = 'none';
    void supervivienteSeleccionado.offsetWidth;

    let closestComidaCoords = [];
    let closestComida = 0;

    if (helicopteroActivo && arrayComida.length > 0){
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

function desaparicionComida(idComida){
    let comida = document.getElementById(idComida);
    comida.style.animation = 'desaparicion 0.5s 3s ease-out forwards';
    setTimeout(pintarComidas, 4000, contenedorPrincipal)

}
// Cambio cursor cuando hover sobre superviviente (si helicoptero es activo)
document.addEventListener('mouseover', function(e){
    if (e.target.classList.contains('superviviente') && helicopteroActivo){
        e.target.style.cursor = 'url("media/cursorComida.png"), auto';
    }
})

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

function rescatarSuperviviente(supervivienteSeleccionado) {
    if (helicopteroActivo) {
        recoleccionComida(supervivienteSeleccionado); // Si está activo, sigue con la lógica de comida
        return;
    }

    let heli = document.querySelector('.heli');
    let heliX = heli.offsetLeft;
    let heliY = heli.offsetTop;
    let supX = supervivienteSeleccionado.offsetLeft;
    let supY = supervivienteSeleccionado.offsetTop;

    // Desactivar interacción mientras el helicóptero está en movimiento
    helicopteroActivo = true;

    // Mover el helicóptero hasta el superviviente con animación
    heli.style.transition = 'top 2s linear, left 2s linear';
    heli.style.left = supX + 'px';
    heli.style.top = supY + 'px';

    setTimeout(() => {
        // Ocultar al superviviente (simulando que fue rescatado)
        supervivienteSeleccionado.style.opacity = 0;

        setTimeout(() => {
            // Regresar el helicóptero a la base
            heli.style.left = heliX + 'px';
            heli.style.top = heliY + 'px';

            setTimeout(() => {
                helicopteroActivo = false; // Reactivar el helicóptero después del rescate
            }, 2000);
        }, 2000);
    }, 2000);
}
