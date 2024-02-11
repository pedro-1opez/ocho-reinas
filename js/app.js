/*
   =================================================================
   || Alumno: Pedro Antonio López López                           ||
   || Materia: Simulación de Sistemas para Ingeniería de Software ||
   || Tarea: Problema de las 8 reinas                             ||
   || Variante (5): Seis soluciones                               ||
   ||=============================================================||
   || Extra: (1) Bloqueo de celdas.                               ||
   =================================================================

*/

// Variables para realizar un seguimiento del estado del juego y de las reinas colocadas.
let reinasMax = 8;
let reinasColocadas = 0;
let columnasBloqueadas = [];
let indice = -1;
let imagen = "background-image: url(./img/reina.png); background-size: cover";


/*
  La función colocarReina(celda) sirve para colocar o quitar una reina dentro del tablero.
  Dependiendo de la celda seleccionada, se realiza una serie de verificaciones bloqueando o
  desbloqueando las celdas que estan bajo amenaza.
*/
function colocarReina(celda){    
    let opcion = document.getElementById('opciones');
    let valor = parseInt(opcion.options[opcion.selectedIndex].value);    
    
    if(valor == 0){

    //Se obtiene el indice del renglon y la columna de la celda
    let renglon = celda.parentElement.rowIndex;
    let columna = celda.cellIndex;
    let tablero = document.getElementById('tablero');    

    //Se verifica si la celda esta vacia
    if (window.getComputedStyle(celda).backgroundImage == "none") {

        //Se verifica que no se hayan colocado las 8 reinas 
        if (reinasColocadas < 8) {
            
            celda.style="background-image: url(./img/reina.png); background-size: cover";            
            
            /* 
              =====================================
              || Variante (1): Bloqueo de celdas ||
              =====================================
            */

            for(let i = 0; i < 8; i++){

                //Se bloquea la columna
                if (columna != i) {

                    tablero.rows[renglon].cells[i].removeAttribute('onclick');
                    // tablero.rows[renglon].cells[i].style = "background-color: #e6b68b"
                    tablero.rows[renglon].cells[i].style = "background-image: url(./img/cruz.png); background-size: cover";
                    tablero.rows[renglon].cells[i].classList.remove('click');
                    columnasBloqueadas.push(renglon + ',' + i);

                }
                //Se bloquea el renglon
                if (renglon != i) {

                    tablero.rows[i].cells[columna].removeAttribute('onclick');
                    tablero.rows[i].cells[columna].style = "background-image: url(./img/cruz.png); background-size: cover";
                    tablero.rows[i].cells[columna].classList.remove('click');
                    columnasBloqueadas.push(i + ',' + columna);

                }
            }

            let r = renglon;
            let c = columna;

            //Se bloquean las diagonales
            while (r >= 0 && c < 8) {
                if(renglon != r && columna != c){
                    tablero.rows[r].cells[c].removeAttribute('onclick');
                    tablero.rows[r].cells[c].style = "background-image: url(./img/cruz.png); background-size: cover";
                    tablero.rows[r].cells[c].classList.remove('click');
                    columnasBloqueadas.push(r + ',' + c);
                    r--;
                    c++;
                }else{
                    r--;
                    c++;
                } 
            }
            
            r = renglon;
            c = columna;

            while (r < 8 && c >= 0) {
                if(renglon != r && columna != c){
                    tablero.rows[r].cells[c].removeAttribute('onclick');
                    tablero.rows[r].cells[c].style = "background-image: url(./img/cruz.png); background-size: cover";
                    tablero.rows[r].cells[c].classList.remove('click');
                    columnasBloqueadas.push(r + ',' + c);
                    r++;
                    c--;
                }else{
                    r++;
                    c--;
                }
            }

            r=renglon;
            c=columna;
              
            while (r >= 0 && c >= 0) {
                if(renglon != r && columna != c){
                    tablero.rows[r].cells[c].removeAttribute('onclick');
                    tablero.rows[r].cells[c].style = "background-image: url(./img/cruz.png); background-size: cover";
                    tablero.rows[r].cells[c].classList.remove('click');
                    columnasBloqueadas.push(r + ',' + c);
                    r--;
                    c--;
                }else{
                    r--;
                    c--;
                } 
              }
            
            r = renglon;
            c = columna;

            while (r < 8 && c < 8) {
                if(renglon != r && columna != c){
                    tablero.rows[r].cells[c].removeAttribute('onclick');
                    tablero.rows[r].cells[c].style = "background-image: url(./img/cruz.png); background-size: cover";
                    tablero.rows[r].cells[c].classList.remove('click');
                    columnasBloqueadas.push(r + ',' + c);
                    r++;
                    c++;
                }else{
                    r++;
                    c++;
                }
            }
            
            reinasColocadas++;
            reinasMax--;
        }

    //Si la celda tiene una reina, se elimina
    }else{

        celda.style="background-image:none;";
        
        for(let i = 0; i < 8; i++){

            //Se desbloquean las columnas
            if (columna != i) {
                columnasBloqueadas.splice(columnasBloqueadas.indexOf(renglon + ',' + i),1);
                if(!columnasBloqueadas.includes(renglon + ',' + i)){
                    tablero.rows[renglon].cells[i].setAttribute('onclick', 'colocarReina(this)');
                    tablero.rows[renglon].cells[i].style="background-image: none";
                    tablero.rows[renglon].cells[i].classList.add('click');
                }
            }
            
            //Se desbloquean las renglones
            if (renglon != i) {
                columnasBloqueadas.splice(columnasBloqueadas.indexOf(i + ',' + columna),1);
                if(!columnasBloqueadas.includes(i + ',' + columna)){
                    tablero.rows[i].cells[columna].setAttribute('onclick', 'colocarReina(this)');
                    tablero.rows[i].cells[columna].style="background-image: none";
                    tablero.rows[i].cells[columna].classList.add('click');
                }

            }
        }

        r = renglon;
        c = columna

        //Se desbloquean las diagonales
        while (r >= 0 && c < 8) {
            if(renglon != r && columna != c){
                indice = columnasBloqueadas.indexOf(r + ',' + c);
                if(indice !== -1){
                    columnasBloqueadas.splice(columnasBloqueadas.indexOf(r + ',' + c),1);
                }
                if(!columnasBloqueadas.includes(r + ',' + c)){
                    tablero.rows[r].cells[c].setAttribute('onclick', 'colocarReina(this)');
                    tablero.rows[r].cells[c].style="background-image: none";
                    tablero.rows[r].cells[c].classList.add('click');
                }
                r--;
                c++;
            }else{
                r--;
                c++;
            }            
        }
        
        r = renglon;
        c = columna;

        while (r < 8 && c >= 0) {
            if(renglon != r && columna != c){
                indice = columnasBloqueadas.indexOf(r + ',' + c);
                if(indice !== -1){
                    columnasBloqueadas.splice(columnasBloqueadas.indexOf(r + ',' + c),1);
                }
                if(!columnasBloqueadas.includes(r + ',' + c)){
                    tablero.rows[r].cells[c].setAttribute('onclick', 'colocarReina(this)');
                    tablero.rows[r].cells[c].style="background-image: none";
                    tablero.rows[r].cells[c].classList.add('click');
                }

                r++;
                c--;
            }else{
                r++;
                c--;
            }
        }

        r= renglon;
        c = columna;

        while (r >= 0 && c >= 0) {
            if(renglon != r && columna != c){
                indice = columnasBloqueadas.indexOf(r + ',' + c);
                if(indice !== -1){
                    columnasBloqueadas.splice(columnasBloqueadas.indexOf(r + ',' + c),1);
                }
                if(!columnasBloqueadas.includes(r + ',' + c)){
                    tablero.rows[r].cells[c].setAttribute('onclick', 'colocarReina(this)');
                    tablero.rows[r].cells[c].style="background-image: none";
                    tablero.rows[r].cells[c].classList.add('click');
                }
                r--;
                c--;
            }else{
                r--;
                c--;
            }            
        }
        
        r = renglon;
        c = columna;

        while (c < 8 && r < 8) {
            if(renglon != r && columna != c){
                indice = columnasBloqueadas.indexOf(r + ',' + c);
                if(indice !== -1){
                    columnasBloqueadas.splice(columnasBloqueadas.indexOf(r + ',' + c),1);
                }
                if(!columnasBloqueadas.includes(r + ',' + c)){
                    tablero.rows[r].cells[c].setAttribute('onclick', 'colocarReina(this)');
                    tablero.rows[r].cells[c].style="background-image: none";
                    tablero.rows[r].cells[c].classList.add('click');
                }
                r++;
                c++;
            }else{
                r++;
                c++;
            }
        }

        reinasColocadas--;
        reinasMax++;

    }
}
    
    //Se actualizan los contadores
    document.getElementById("porColocar").innerHTML = `Reinas por colocar ${reinasMax}`;
    document.getElementById("colocadas").innerHTML = `Reinas colocadas ${reinasColocadas}`;
    
    setInterval(()=>{
        if (reinasColocadas == 8) {
            alert("Felicidades, has ganado");
            reiniciar();
        }
    }, 500);
    
}


/*
  =======================================
  || Variante (5): Seis soluciones     ||
  =======================================

  La función solucion() se utiliza para mostrar una serie de soluciones predefinidas.
  Dependiendo de la solución seleccionada, se llama a una función en particular para 
  colocar las reinas en ciertas celdas del tablero.
*/
function solucion(){
    let opcion = document.getElementById('opciones');
    let valor = parseInt(opcion.options[opcion.selectedIndex].value);    

    reiniciar(); 

    switch(valor){
        case 1: solucion1();
        break;
        case 2: solucion2();
        break;
        case 3: solucion3();
        break;
        case 4: solucion4();
        break;
        case 5: solucion5();
        break;
        case 6: solucion6();
        break;
        default: restart();
    }
}

function solucion1(){
    let celdas = document.getElementById('tablero');
    celdas.rows[0].cells[7].style= imagen;
    celdas.rows[1].cells[3].style= imagen;
    celdas.rows[2].cells[0].style= imagen
    celdas.rows[3].cells[2].style= imagen;
    celdas.rows[4].cells[5].style= imagen;
    celdas.rows[5].cells[1].style= imagen;
    celdas.rows[6].cells[6].style= imagen;
    celdas.rows[7].cells[4].style= imagen;
}

function solucion2(){
    let celdas = document.getElementById('tablero');
    celdas.rows[0].cells[5].style= imagen;
    celdas.rows[1].cells[2].style= imagen;
    celdas.rows[2].cells[4].style= imagen;
    celdas.rows[3].cells[6].style= imagen;
    celdas.rows[4].cells[0].style= imagen;
    celdas.rows[5].cells[3].style= imagen;
    celdas.rows[6].cells[1].style= imagen;
    celdas.rows[7].cells[7].style= imagen;
}

function solucion3(){
    let celdas = document.getElementById('tablero');
    celdas.rows[0].cells[2].style= imagen;
    celdas.rows[1].cells[5].style= imagen;
    celdas.rows[2].cells[7].style= imagen;
    celdas.rows[3].cells[1].style= imagen;
    celdas.rows[4].cells[3].style= imagen;
    celdas.rows[5].cells[0].style= imagen;
    celdas.rows[6].cells[6].style= imagen;
    celdas.rows[7].cells[4].style= imagen;
}

function solucion4(){
    let celdas = document.getElementById('tablero');
    celdas.rows[0].cells[2].style= imagen;
    celdas.rows[1].cells[5].style= imagen;
    celdas.rows[2].cells[7].style= imagen;
    celdas.rows[3].cells[0].style= imagen;
    celdas.rows[4].cells[4].style= imagen;
    celdas.rows[5].cells[6].style= imagen;
    celdas.rows[6].cells[1].style= imagen;
    celdas.rows[7].cells[3].style= imagen;
}

function solucion5(){
    let celdas = document.getElementById('tablero');
    celdas.rows[0].cells[5].style= imagen;
    celdas.rows[1].cells[1].style= imagen;
    celdas.rows[2].cells[6].style= imagen;
    celdas.rows[3].cells[0].style= imagen;
    celdas.rows[4].cells[3].style= imagen;
    celdas.rows[5].cells[7].style= imagen;
    celdas.rows[6].cells[4].style= imagen;
    celdas.rows[7].cells[2].style= imagen;
}

function solucion6(){
    let celdas = document.getElementById('tablero');
    celdas.rows[0].cells[5].style= imagen;
    celdas.rows[1].cells[0].style= imagen;
    celdas.rows[2].cells[4].style= imagen;
    celdas.rows[3].cells[1].style= imagen;
    celdas.rows[4].cells[7].style= imagen;
    celdas.rows[5].cells[2].style= imagen;
    celdas.rows[6].cells[6].style= imagen;
    celdas.rows[7].cells[3].style= imagen;
}

/*
  La función reiniciar() restaura al estado inicial una vez que el jugador
  ha colocado satisfactoriamente las ocho reinas en el tablero
*/
function reiniciar(){
    let celdas = document.getElementById('tablero');

    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            celdas.rows[r].cells[c].setAttribute('onclick', 'colocarReina(this)');
            celdas.rows[r].cells[c].style="background-image: none";
            celdas.rows[r].cells[c].classList.add('click');       
        }
    }

    reinasMax = 8;
    reinasColocadas = 0;    
    document.getElementById("porColocar").innerHTML = `Reinas por colocar ${reinasMax}`;
    document.getElementById("colocadas").innerHTML = `Reinas colocadas ${reinasColocadas}`;    
}

/*
  La funcion btnReiniciar() restaura el estado inicial cuando el jugador
  presiona el boton reiniciar.
*/
function btnReiniciar(){
    let celdas = document.getElementById('tablero');

    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            celdas.rows[r].cells[c].setAttribute('onclick', 'colocarReina(this)');
            celdas.rows[r].cells[c].style="background-image: none";
            celdas.rows[r].cells[c].classList.add('click');       
        }
    }
    reinasColocadas = 0;
    reinasMax = 8;
    document.getElementById("porColocar").innerHTML = `Reinas por colocar ${reinasMax}`;
    document.getElementById("colocadas").innerHTML = `Reinas colocadas ${reinasColocadas}`;

    document.getElementById('opciones').selectedIndex = 0;
    document.getElementById('imagenes').selectedIndex = 0;
}