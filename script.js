const button = document.getElementById("guess-button");
const GRID = document.getElementById("grid");
const INPUT = document.getElementById("guess-input");
let contenedor = document.getElementById("guesses");
const RECARGAR = document.getElementById("reload");
let intentos = 0;



fetch('https://random-word-api.herokuapp.com/word?number=1&length=5&lang=es')
    //Le digo que lo formatee como un objeto json   
    .then(response => response.json())
    .then(response=>{
        console.log(response)
        palabra = response[0].toUpperCase();
        console.log(palabra);
    })
    .catch(handleError);

function handleError(err) {
    console.error(err);
    console.log("La API no responde");
    
    let palabra_error = ["Perro", "Burro", "Apple", "Gatos"];
    const palabraSeleccionada = obtenerPalabraSeleccionada(palabra_error);
    console.log("Palabra seleccionada:", palabraSeleccionada);

    function intentarSegundaOpcion() {
        if (intentos < 6) {
            const ROW = document.createElement('div');
            ROW.className = 'row';
            
            const INTENTO = leerIntento();
            console.log("Intento:", INTENTO);

            if (palabraSeleccionada.toUpperCase() === INTENTO.toUpperCase()) {
                terminar("<h1>GANASTE!</h1>");
                return;
            } else {
                mostrarIntento(ROW, INTENTO, palabraSeleccionada);
            }

            intentos++;
            console.log("intento numero: ", intentos);
        } else {
            console.log("Has alcanzado el límite de 5 intentos");
            terminar("<h1>PERDISTE!</h1>");
        }
    }

    button.addEventListener("click", intentarSegundaOpcion);
}

function obtenerPalabraSeleccionada(palabras) {
    const indiceAleatorio = Math.round(Math.random() * (palabras.length - 1));
    return palabras[indiceAleatorio].toUpperCase();
}

//rowElement respresenta un elemento html de tipo div y contiene las letras generadas durante el intento del jugador
//rowElement es un contenedor que se llena con elementos span para mostrar el intento del jugador en la interfaz del juego.
function mostrarIntento(rowElement, intento, palabraSeleccionada) {
    for (let i in palabraSeleccionada) {
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';

        if (intento[i] === palabraSeleccionada[i]) {
            console.log(intento[i], "verde");
            SPAN.innerHTML = intento[i];
            SPAN.style.backgroundColor = "green";
        } else if (palabraSeleccionada.includes(intento[i])) {
            console.log(intento[i], "amarillo");
            SPAN.innerHTML = intento[i];
            SPAN.style.backgroundColor = "yellow";
        } else {
            console.log(intento[i], "Gris");
            SPAN.innerHTML = intento[i];
            SPAN.style.backgroundColor = "gray";
        }

        rowElement.appendChild(SPAN);
    }

    rowElement.style.textAlign = "center";
    GRID.appendChild(rowElement);
}


function intentar() {
    if (intentos < 6) {
        const ROW = document.createElement('div');
        ROW.className = 'row';
    
        let intento = leerIntento();
        
        console.log("Intento:", intento);
        if (palabra.toUpperCase() === intento.toUpperCase()) {
            terminar("<h1>GANASTE!</h1>");
            return;
        } else {
         
            for (let i in palabra) {
               const LETRAINTENTO = intento[i];
               let SPAN;
               
               console.log(palabra[i]);
               if (LETRAINTENTO === palabra[i]) {
                   console.log(LETRAINTENTO, "verde");
                   SPAN = crearSpan(LETRAINTENTO, "green");
               } else if (palabra.includes(LETRAINTENTO)) {
                   console.log(LETRAINTENTO, "amarillo");
                   SPAN = crearSpan(LETRAINTENTO, "yellow");
               } else {
                   console.log(LETRAINTENTO, "Gris");
                   SPAN = crearSpan(LETRAINTENTO, "gray");
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

    function crearSpan(letra, color) {
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
        SPAN.innerHTML = letra;
        SPAN.style.backgroundColor = color;
        return SPAN;
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
    for(let i = 0; i<intento.length;i++){
    if( !isNaN(intento[i])){
        console.log("Inserta solo letras por favor");
        cantidadSuperada("<h1>Debe ingresar solo letras</h1>");
        return null; 
    }
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
