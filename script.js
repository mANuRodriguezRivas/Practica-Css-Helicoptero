let arrayComida = [
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0}
];

let anchoComida = 50;
let altComida = 50;

//Genera posición aleatoria para las comida sin que se sobrelapan
function generaPosicionComida(contenedorComidaX, contenedorComidaY){
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