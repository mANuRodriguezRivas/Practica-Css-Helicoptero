let contenedorPrincipal = document.querySelector('.gameBg');
let listaSupervivientes = document.getElementsByClassName("superviviente");
let superviviente = document.querySelector('.superviviente');
let pantallaX = window.innerWidth;
let pantallaY = window.innerHeight;

/* ¡¡¡¡¡¡¡¡¡VARIABLE TEMPORANEA (QUITARLA CUANDO TENEMOS MECANICA DE MOVIMIENTO HELICOPTERO)!!!!!!!! */
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
let posicionesSupervivientes = [];


let anchoComida = 50;
let altComida = 50;

posicionarSupervivientes(listaSupervivientes);


//Genera posición aleatoria para las comida sin que se sobrelapan
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

// Rescatar superviviente con el helicóptero
function rescatarSuperviviente(supervivienteSeleccionado) {
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
    heliAnimacion();
    setTimeout(() => {
        supervivienteSeleccionado.style.opacity = 0; // Simula el rescate
        heliAnimacion()
        setTimeout(() => {
            heli.style.left = heliX + 'px';
            heli.style.top = heliY + 'px';
            heliAnimacion()
            setTimeout(() => {
                helicopteroActivo = false; // Reactivar el helicóptero después del rescate
            }, 6000); // Tiempo de espera para activar el heli de nuevo
        }, 1000); //tiempo de espera en el sitio del superviviente
    }, 6000); //tiempo de visualización del superviviente
    setTimeout(heliAnimacion, 13000);
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

// Aparición aleatoria de supervivientes sin colisiones.
function coordenadasAleatoriasSupervivientes() {
    let coordRandomX, coordRandomY, overlap;

    do {
        coordRandomX = Math.round(Math.random() * (pantallaX - anchoSuperviviente));
        coordRandomY = Math.round(Math.random() * (pantallaY - altoSuperviviente));
        overlap = false;
        for (let i = 0; i < posicionesSupervivientes.length; i++) {
            let otroSupervivienteX = posicionesSupervivientes[i]['x'];
            let otroSupervivienteY = posicionesSupervivientes[i]['y'];

            if (Math.abs(coordRandomX - otroSupervivienteX) < anchoSuperviviente && Math.abs(coordRandomY - otroSupervivienteY) < altoSuperviviente) {
                overlap = true; 
                break;
            }
        }
    } while (overlap); 

    return [coordRandomX, coordRandomY];
}

// Posiciona a los supervivientes en la pantalla.
function posicionarSupervivientes(supervivientes) {
    posicionesSupervivientes = []; 

    for (let i = 0; i < supervivientes.length; i++) {
        let coordenadas = coordenadasAleatoriasSupervivientes();

        posicionesSupervivientes[i] = [];
        posicionesSupervivientes[i]['x'] = coordenadas[0];
        posicionesSupervivientes[i]['y'] = coordenadas[1];

        supervivientes[i].style.left = coordenadas[0] + 'px';
        supervivientes[i].style.top = coordenadas[1] + 'px';


        let contador = document.createElement("div");
        contador.classList.add("contador");
        supervivientes[i].appendChild(contador);

        temporizadorVidaSuperviviente(supervivientes[i], contador);
    }

    generaPosicionComida();
}

// Lista de supervivientes y los posiciona cuando la página carga
window.onload = function() {
    let elementos = document.getElementsByClassName("superviviente");
    let listaSupervivientes = [];

    for (let i = 0; i < elementos.length; i++) {
        listaSupervivientes[i] = elementos[i];
    }

    posicionarSupervivientes(listaSupervivientes);
};

//Añadir clase de helicoptero Animado
function heliAnimacion(){
    let vuelo = document.getElementById('heliFoto');
    vuelo.classList.toggle('heliPic2');
}

function heliAnimacionDesact(){
    let vuelo = document.getElementById('heliFoto');
    vuelo.classList.add('heliPic');

    
}

// Gestión del tiempo de vida con contador
function temporizadorVidaSuperviviente(superviviente) {
    let contador = superviviente.querySelector(".contador"); 

    if (!contador) return; 

    let tiempoRestante = 20;
    contador.innerText = tiempoRestante; 

    // Si ya tiene un temporizador activo, lo detenemos antes de crear uno nuevo
    if (superviviente.intervalo) {
        clearInterval(superviviente.intervalo);
    }

    //  Guardamos el nuevo temporizador en el superviviente
    superviviente.intervalo = setInterval(function() {
        tiempoRestante--; 
        contador.innerText = tiempoRestante; 

        if (tiempoRestante <= 0) {
            clearInterval(superviviente.intervalo);
            superviviente.style.animation = 'desaparicion 3s ease-out forwards'; 

            setTimeout(function() { eliminarSuperviviente(superviviente); }, 3000); 
        }
    }, 1000);
}

// Función para reiniciar el contador cuando un superviviente recoge comida
function reiniciarContador(superviviente) {
    console.log(" Reiniciando contador para", superviviente);
    temporizadorVidaSuperviviente(superviviente);
}

// Eliminar superviviente después de la animación
function eliminarSuperviviente(superviviente) {
    if (superviviente) { 
        superviviente.style.display = "none"; 
    }
}

// Función que se llama cuando un superviviente recoge comida
function recogerComida(superviviente) {
    console.log("Superviviente ha recogido comida:", superviviente);
    reiniciarContador(superviviente); 
    recogerComida(superviviente);
}