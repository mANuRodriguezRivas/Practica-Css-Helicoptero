let contenedorPrincipal = document.querySelector('.gameBg');
let pantallaX = window.innerWidth;
let pantallaY = window.innerHeight;

let arrayComida = [
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0}
];

let anchoComida = 50;
let altComida = 50;


let subreviviente = document.querySelector('.superviviente');
let helicopteroActivo = true;
let subrevivientesX = 0;
let subrevivientesY = 0;
generaPosicionComida(pantallaX, pantallaY)

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
        divComida.innerHTML = `Comida: ${i}`;
        divComida.id = `comida_${i}`;
        contenedorComida.appendChild(divComida);
    }
}

//Recolección comida
/*Programar la mecánica de recolección de comida: al pulsar en un superviviente, este podrá moverse hasta la comida si el helicóptero está en vuelo.*/
function recoleccionComida(){
    subreviviente.style.animation = 'none';
    void subreviviente.offsetWidth;
    let closestComidaCoords = [];
    let closestComida = 0;
    if (helicopteroActivo && arrayComida.length > 0){
        for (let i=0; i<arrayComida.length; i++){
            let distance = Math.sqrt(Math.pow(arrayComida[i].x - subrevivientesX, 2) + Math.pow(arrayComida[i].y - subrevivientesY, 2));
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
        subreviviente.style.setProperty('--endY', `${closestComidaCoords[0].y}px`);
        subreviviente.style.setProperty('--endX', `${closestComidaCoords[0].x}px`);
        subreviviente.style.animation = 'comida 1.5s ease-out 2 alternate';
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