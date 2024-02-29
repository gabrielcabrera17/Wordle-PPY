const button = document.getElementById("guess-button");
const GRID = document.getElementById("grid");
const INPUT = document.getElementById("guess-input");
let contenedor = document.getElementById("guesses");
const RECARGAR = document.getElementById("reload");

let palabra = ["Perro", "Burro", "Apple","Gatos"];
let intentos = 0;

const indiceAleatorio = Math.round(Math.random() * (palabra.length - 1));
const palabraSeleccionada = palabra[indiceAleatorio].toUpperCase();
console.log("Palabra seleccionada:", palabraSeleccionada);
function intentar() {
    if (intentos < 6) {
        const ROW = document.createElement('div');
        ROW.className = 'row';
    
        const INTENTO = leerIntento();
        console.log("Intento:", INTENTO);
        if (palabraSeleccionada.toUpperCase() === INTENTO.toUpperCase()) {
            terminar("<h1>GANASTE!</h1>");
            return;
        } else {
            for (let i in palabraSeleccionada) {
                const SPAN = document.createElement('span');
                SPAN.className='letter';
                // console.log(SPAN);
                console.log(palabraSeleccionada[i]);
                if(  INTENTO[i]===palabraSeleccionada[i]){
                    console.log(INTENTO[i],"verde");
                    SPAN.innerHTML = INTENTO[i];
                    SPAN.style.backgroundColor = "green";
                    

                }else if(palabraSeleccionada.includes(INTENTO[i])){
                    console.log(INTENTO[i],"amarillo");
                    SPAN.innerHTML = INTENTO[i];
                    SPAN.style.backgroundColor = "yellow";
                
                }else{
                    console.log(INTENTO[i],"Gris");
                    SPAN.innerHTML = INTENTO[i];
                    SPAN.style.backgroundColor = "gray";
                    
                }

                ROW.appendChild(SPAN);
            }
            ROW.style.textAlign = "center";
            GRID.appendChild(ROW);
        }

        intentos++;
        console.log("intento numero: ",intentos);
    } else {
        console.log("Has alcanzado el limite de 5 intentos");
        terminar("<h1>PERDISTE!</h1>");
    }

}

button.addEventListener("click", intentar);
RECARGAR.addEventListener("click",reload);
function reload(){
   location.reload();
}

function leerIntento() {
    let intento = document.getElementById("guess-input").value;
    intento = intento.toUpperCase();
    if (intento.length !== 5) {
        console.log("Inserto menos o más de cinco letras, vuelva a intentarlo");
        cantidadSuperada("<h1>Ingresaste menos o mas de 5 letras</h1>");
        return null; 
    }
    if(intento.typeof !== 'string' && !isNaN(intento)){
        console.log("Inserta solo letras por favor");
        cantidadSuperada("<h1>Debe ingresar solo letras</h1>");
        return null; 
    }
    return intento;
}
function terminar(mensaje){
    INPUT.disabled = true;
    button.disabled = true;
    contenedor.innerHTML = mensaje;
}
function cantidadSuperada(msj){
    INPUT.disabled = true;
    button.disabled = true;
    contenedor.innerHTML = msj;
}
