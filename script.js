let arrayComida = [
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0}
];

let superviviente = document.querySelector(".superviviente");
let coordenadasAleatorias = [];
let listaSupervivientes = document.getElementsByClassName("superviviente");
posicionarSupervivientes(listaSupervivientes);


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

function coordenadasAleatoriasSupervivientes() {
    let coordRandomX = Math.round(Math.random()* window.innerWidth - superviviente.offsetWidth);
    let coordRandomY = Math.round(Math.random()* window.innerHeight - superviviente.offsetHeight);
    coordenadasAleatorias = [coordRandomX, coordRandomY];
}

function posicionarSupervivientes(supervivientes) {
    for (let i = 0; i < supervivientes.length; i++) {
        coordenadasAleatoriasSupervivientes();
        let coordenadas = coordenadasAleatorias; 
        supervivientes[i].style.left = coordenadas[0] + 'px';
        supervivientes[i].style.top = coordenadas[1] + 'px';
    }
}





