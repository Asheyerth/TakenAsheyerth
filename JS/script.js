let tablero = document.querySelector(".tablero")
let cuadros = [[],[],[],[]]; let numUsed = [];

crear_juego()

function crear_juego(){  
    let numRandom = Math.floor(Math.random()*(16)) 
    let x = 0
    let y = 0

    cuadros.forEach(e => {
        let cont = 0
        while (cont<4){
            if(!numUsed.includes(numRandom)){
                e.push(numRandom)
                numUsed.push(numRandom)
                cont++
                crear_cuadrito(numRandom, x, y)
                x=x +110
                numRandom = Math.floor(Math.random()*(16))
            }else{
                numRandom = Math.floor(Math.random()*(16))
            }
        }
        x=0; y+=110
    })
}



function crear_cuadrito(numCuadro, posX, posY){
    let cuadrito = document.createElement("div") 
    if (numCuadro!=0) {
        cuadrito.className = `cuadroJuego absolute
            border-dotted border-black border-4 hover:border-double
            flex items-center justify-center font-bold rounded-xl text-3xl text-white`
        //cuadrito.className += ` bg-red-200 hover:bg-blue-700`
        cuadrito.addEventListener("click", function(){ mover_cuadro(cuadrito); });
        cuadrito.appendChild(document.createTextNode(String(numCuadro))) 

        //Agarrese profe porque ahora se viene una complicación con tal de que se vea bonito.
        switch (numCuadro) {
            case 1:
                cuadrito.className += ` bg-red-500 hover:bg-red-600`
                break;
            case 2: 
                cuadrito.className += ` bg-red-600 hover:bg-red-700`
                break;
            case 3: 
                cuadrito.className += ` bg-orange-500 hover:bg-orange-600`
                break; 
            case 4:
                cuadrito.className += ` bg-orange-600 hover:bg-orange-700`
                break;
            case 5:
                cuadrito.className += ` bg-yellow-500 hover:bg-yellow-600`
                break;
            case 6: 
                cuadrito.className += ` bg-yellow-600 hover:bg-yellow-700`
                break;
            case 7: 
                cuadrito.className += ` bg-lime-500 hover:bg-lime-600`
                break; 
            case 8:
                cuadrito.className += ` bg-green-600 hover:bg-green-700`
                break;
            case 9:
                cuadrito.className += ` bg-green-500 hover:bg-gren-600`
                break;
            case 10: 
                cuadrito.className += ` bg-blue-600 hover:bg-blue-700`
                break;
            case 11: 
                cuadrito.className += ` bg-blue-500 hover:bg-blue-600`
                break; 
            case 12:
                cuadrito.className += ` bg-indigo-600 hover:bg-indigo-700`
                break;
            case 13:
                cuadrito.className += ` bg-violet-500 hover:bg-violet-600`
                break;
            case 14: 
                cuadrito.className += ` bg-violet-600 hover:bg-violet-700`
                break;
            case 15: 
                cuadrito.className += ` bg-purple-500 hover:bg-purple-600`
                break; 
            default:
              cuadrito.className += ` bg-black hover:bg-grey`
          }

        
    }else{
        cuadrito.className = `cuadroVacio absolute` 
    }
    cuadrito.style.cssText = `width: 100px; height:100px; top: ${posY}px; left:${posX}px`; 
    
    tablero.appendChild(cuadrito)
}


function mover_cuadro(cuadroLleno){
    let cuadroVacio = document.querySelector(".cuadroVacio")
    xPosVacio = parseInt(cuadroVacio.style.left)
    yPosVacio = parseInt(cuadroVacio.style.top)

    xPosLleno = parseInt(cuadroLleno.style.left)
    yPosLleno = parseInt(cuadroLleno.style.top)

    if(Math.abs(yPosVacio-yPosLleno)<=110 && Math.abs(xPosVacio-xPosLleno)<=110 && (yPosLleno==yPosVacio || xPosLleno==xPosVacio)){
        //Movement
        cuadroLleno.style.cssText = `width: 100px; height:100px; top: ${yPosVacio}px; left:${xPosVacio}px; transition: top 0.5s 0s, left 0.5s 0s`;
        //https://developer.mozilla.org/en-US/docs/Web/CSS/transition

        cuadroVacio.style.cssText = `width: 100px; height:100px; top: ${yPosLleno}px; left:${xPosLleno}px`

        //Validation
        let posI = 0 
        let posF = 0
        numUsed.forEach(e => {
            if (parseInt(cuadroLleno.textContent) === e){ 
               posI = numUsed.indexOf(e)
            }else if (e === 0){
                posF = numUsed.indexOf(e)
            }
        })
        let numUsedTemp = numUsed[posI]
        numUsed[posI] = numUsed[posF]
        numUsed[posF] = numUsedTemp
    }

    validacion()


}

function validacion(){
    let bool = false    
    for (let i = 0; i < 16; i++) {
        if(i == numUsed[i]){
            bool = true
        }else{
            bool = false
            break;
        }        
    }
    //console.log(bool)
    //bool=true /////////////////
    if (bool) {
        console.log("si se pudo, burro")
        setTimeout(() => {
            //window.alert("GANASTE")
            let ganar = document.querySelector(".ganar")
            ganar.className = `ganar flex text-red-600 font-bold text-xl bg-yellow-400 rounded-xl m-5 px-1 py-2 justify-center visible`
            let cuadro = document.querySelectorAll(".cuadroJuego")
            cuadro.forEach(e => {
                e.className += ` border-double`
            })

          }, 750);
        //window.alert("GANASTE")
    }
}

function revolver(){
    let ganar = document.querySelector(".ganar")
    ganar.className = `ganar flex text-red-600 font-bold text-xl bg-yellow-400 rounded-xl m-5 px-1 py-2 justify-center invisible`
    let cuadro = document.querySelectorAll(".cuadroJuego")
    let cuadroVacio = document.querySelector(".cuadroVacio")
    tablero.removeChild (cuadroVacio);
    cuadro.forEach(e => {
        tablero.removeChild(e);
    })
    cuadros = [[],[],[],[]]; numUsed = [];
    crear_juego()
}