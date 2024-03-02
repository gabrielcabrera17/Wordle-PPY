const button = document.getElementById("guess-button");
const GRID = document.getElementById("grid");
const INPUT = document.getElementById("guess-input");
let contenedor = document.getElementById("guesses");
const RECARGAR = document.getElementById("reload");
const INSTRUCCION = document.getElementById("Instruccion");
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

    function obtenerPalabraSeleccionada(palabras) {
        const INDICEALEATORIO = Math.round(Math.random() * (palabras.length - 1));
        return palabras[INDICEALEATORIO].toUpperCase();
    }
    function handleError(err) {
        console.error(err);
        console.log("La API no responde");
    
        let palabra_error = ["Lugar", "Hogar", "Horno", "Ducha"];
        const PALABRASELECCIONADA = obtenerPalabraSeleccionada(palabra_error);
        console.log("Palabra seleccionada:", PALABRASELECCIONADA);
    
        function intentarSegundaOpcion() {
            if (intentos < 6) {
                
                const ROW = document.createElement('div');
                ROW.className = 'row';
    
                const INTENTO = leerIntento();
                console.log("Intento:", INTENTO);
    
                if (PALABRASELECCIONADA.toUpperCase() === INTENTO.toUpperCase()) {
                    terminar("<h1> GANASTE!</h1>");
                    return;
                } else {
                    mostrarIntento(ROW, INTENTO, PALABRASELECCIONADA);
                }
    
                intentos++;
                console.log("intento numero: ", intentos);
            } else {
                console.log("Has alcanzado el límite de 5 intentos");
                terminar("<h1> PERDISTE!</h1>");
            }
        }
       
    
        button.addEventListener("click", intentarSegundaOpcion);
    }
    
    function mostrarIntento(rowElement, intento, PALABRASELECCIONADA) {
        let posicionesCorrectasUtilizadas = []; // Almacena las posiciones correctas ya utilizadas
        let posicionesIncorrectasUtilizadas = []; // Almacena las posiciones incorrectas ya utilizadas
    
        for (let i = 0; i < PALABRASELECCIONADA.length; i++) {
            const SPAN = document.createElement('span');
            SPAN.className = 'letter';
    
            if (intento[i] === PALABRASELECCIONADA[i] && !posicionesCorrectasUtilizadas.includes(i)) {
                console.log(intento[i], "verde");
                SPAN.innerHTML = intento[i];
                SPAN.style.backgroundColor = "green";
                posicionesCorrectasUtilizadas.push(i); // Almacena la posición correcta utilizada
            } else if (PALABRASELECCIONADA.includes(intento[i]) && !posicionesCorrectasUtilizadas.includes(PALABRASELECCIONADA.indexOf(intento[i])) && !posicionesIncorrectasUtilizadas.includes(PALABRASELECCIONADA.indexOf(intento[i]))) {
                console.log(intento[i], "amarillo");
                SPAN.innerHTML = intento[i];
                SPAN.style.backgroundColor = "yellow";
                posicionesIncorrectasUtilizadas.push(PALABRASELECCIONADA.indexOf(intento[i])); // Almacena la posición incorrecta utilizada
            } else {
                console.log(intento[i], "gris");
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
        let posicionesCorrectasUtilizadas = []; // Almacena las posiciones correctas ya utilizadas

        console.log("Intento:", intento);
        if (palabra.toUpperCase() === intento.toUpperCase()) {
            terminar("<h1> GANASTE!</h1>");
            return;
        } else {
            for (let i = 0; i < palabra.length; i++) {
                const LETRA_INTENTO = intento[i];
                let SPAN;
                const POSICIONES_DE_LETRA = obtenerPosiciones(palabra, LETRA_INTENTO);

                console.log(palabra[i]);
                if (LETRA_INTENTO === palabra[i] && !posicionesCorrectasUtilizadas.includes(i)) {
                    console.log(LETRA_INTENTO, "verde");
                    SPAN = crearSpan(LETRA_INTENTO, "green");
                    posicionesCorrectasUtilizadas.push(i); // Almacena la posición correcta utilizada
                } else if (palabra.includes(LETRA_INTENTO) && POSICIONES_DE_LETRA.length > 0 && !posicionesCorrectasUtilizadas.includes(POSICIONES_DE_LETRA[0])) {
                    console.log(LETRA_INTENTO, "amarillo");
                    SPAN = crearSpan(LETRA_INTENTO, "yellow");
                    posicionesCorrectasUtilizadas.push(POSICIONES_DE_LETRA[0]); // Almacena la posición correcta utilizada
                } else {
                    console.log(LETRA_INTENTO, "gris");
                    SPAN = crearSpan(LETRA_INTENTO, "gray");
                }

                ROW.appendChild(SPAN);
            }
            ROW.style.textAlign = "center";
            GRID.appendChild(ROW);
        }

        intentos++;
        console.log("Intento número:", intentos);
    } else {
        console.log("Has alcanzado el límite de 6 intentos");
        terminar("<h1> PERDISTE!</h1>");
    }

    
}


function obtenerPosiciones(palabra, letra) {
    const posiciones = [];
    for (let i = 0; i < palabra.length; i++) {
        if (palabra[i] === letra) {
            posiciones.push(i); // No convertir a cadena
        }
    }
    return posiciones;
}


    function crearSpan(letra, color) {
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
        SPAN.innerHTML = letra;
        SPAN.style.backgroundColor = color;
        return SPAN;
    }






button.addEventListener("click", intentar);
button.addEventListener("click", ocultarInstruccion);
RECARGAR.addEventListener("click",reload);

function ocultarInstruccion(){
    INSTRUCCION.style.display = "none";
}


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
