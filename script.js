let contenedorPrincipal = document.querySelector('.gameBg');
let listaSupervivientes = document.getElementsByClassName("superviviente");
let superviviente = document.querySelector('.superviviente');
let pantallaX = window.innerWidth;
let pantallaY = window.innerHeight;

let helicopteroActivo = true;


let arrayComida = [
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0}
];
let anchoComida = 50;
let altComida = 50;
let supervivienteX = 0;
let supervivienteY = 0;
let coordenadasAleatorias = [];

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
    console.log()
    supervivienteSeleccionado.style.animation = 'none';
    void supervivienteSeleccionado.offsetWidth;
    let closestComidaCoords = [];
    let closestComida = 0;
    if (helicopteroActivo && arrayComida.length > 0){
        for (let i=0; i<arrayComida.length; i++){
            let distance = Math.sqrt(Math.pow(arrayComida[i].x - supervivienteSeleccionadoX, 2) + Math.pow(arrayComida[i].y - supervivienteSeleccionadoY, 2));
            if (i == 0) {
                closestComida = distance;
                closestComidaCoords.push(arrayComida[i])
            } else {
                if (distance < closestComida) {
                    closestComidaCoords.splice(0, 1, arrayComida[i]);
                    closestComida = distance;
                }
            }
        }
        supervivienteSeleccionado.style.setProperty('--endY', `${closestComidaCoords[0].y}px`);
        supervivienteSeleccionado.style.setProperty('--endX', `${closestComidaCoords[0].x}px`);
        supervivienteSeleccionado.style.animation = 'comida 1.5s ease-out 2 alternate';
        for (let i=0; i<arrayComida.length; i++){
            if (arrayComida[i].x == closestComidaCoords[0].x && arrayComida[i].y == closestComidaCoords[0].y){
                arrayComida.splice(i, 1);
                desaparicionComida(`comida_${i}`);
            }
        }
    }
}

function desaparicionComida(idComida){
    let comida = document.getElementById(idComida);
    comida.style.animation = 'desaparicion 0.5s 1.5s ease-out forwards';
    setTimeout(pintarComidas, 2000, contenedorPrincipal)
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
}
function coordenadasAleatoriasSupervivientes() {
    let coordRandomX = Math.round(Math.random()* pantallaX - superviviente.offsetWidth);
    let coordRandomY = Math.round(Math.random()* pantallaY - superviviente.offsetHeight);
    coordenadasAleatorias = [coordRandomX, coordRandomY];
}

function posicionarSupervivientes(supervivientes) {
    for (let i = 0; i < supervivientes.length; i++) {
        coordenadasAleatoriasSupervivientes();
        let coordenadas = coordenadasAleatorias; 
        supervivientes[i].style.left = coordenadas[0] + 'px';
        supervivientes[i].style.top = coordenadas[1] + 'px';
    }
    generaPosicionComida()
}
