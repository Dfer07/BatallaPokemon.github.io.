const sectionMapa=document.getElementById('ver-mapa')
const mapa=document.getElementById('mapa')


let inputcharmander
let pokemon
let inputpikachu
let inputsquirtle
let ataques
let seleccionarPokemones
let ataqueJugador=[]
let ataqueAleatorioPC
let victoriasPc=0
let victoriasJugador=0
let ataquesinyectados
let pokemones=[]
let pokemonesarray=[]
let pokemonesindex
let botones=[]
let ataquesEnemigo=[]
let AtaquesPokemonEnemigo=[]
let numeroAleatorio
let lienzo=mapa.getContext('2d')
let intervalo
let fondoCanvas=new Image()
fondoCanvas.src='./Asesst/fondoCanvas.png'
let pokemonJugadorObjeto
let pokemonEnemigoObjeto


class Pokemon{  // Se creo una clase con nombre Pokemon (primera letra debe ser mayúscula)
    constructor(nombre,imagen,vidas,imagenTarjeta,x=5,y=15){ //Se utiliza la palabra constructor y dentro de parentesis los parametros o atributos del objeto
        this.nombre=nombre;  // Se utiliza this.variable para asignarle al objeto el parametro del constructor
        this.imagen=imagen;
        this.vidas=vidas;
        this.imagenTarjeta=imagenTarjeta;
        this.ataques=[];
        this.x=x;
        this.y=y;
        this.ancho=24;
        this.alto=25;
        this.fotomapa=new Image();
        this.fotomapa.src=imagen;
        this.velocidadX=0;
        this.velocidadY=0;
        }

        mostrarPokemon(){
            lienzo.drawImage(
                this.fotomapa,
                this.x,
                this.y,
                this.ancho,
                this.alto,
            )
        }
    }

let charmander= new Pokemon('Charmander','./Asesst/charmander.png',3,'./Asesst/charmanderataqueNew.png');// se utiliza new + NombreDeLaClase y entre paréntesis los parametros
let pikachu= new Pokemon('Pikachu','./Asesst/pikachu.png',3,'./Asesst/pikachuataqueNew.png');
let squirtle= new Pokemon('Squirtle','./Asesst/squirtle.png',3,'./Asesst/squirtleataqueNew.png');
let charmanderEnemigo= new Pokemon('Charmander','./Asesst/charmander.png',3,'./Asesst/charmanderataqueNew.png',135,30);// se utiliza new + NombreDeLaClase y entre paréntesis los parametros
let pikachuEnemigo= new Pokemon('Pikachu','./Asesst/pikachu.png',3,'./Asesst/pikachuataqueNew.png',160,155);
let squirtleEnemigo= new Pokemon('Squirtle','./Asesst/squirtle.png',3,'./Asesst/squirtleataqueNew.png',30,135);

charmander.ataques.push(
    {nombre:'🔥', id:'boton-fuego',texto:"FUEGO"},
    {nombre:'🔥', id:'boton-fuego',texto:"FUEGO"},
    {nombre:'🔥', id:'boton-fuego',texto:"FUEGO"},
    {nombre:'🌊', id:'boton-agua',texto:"AGUA"},
    {nombre:'⚡', id:'boton-trueno',texto:"TRUENO"}
)

pikachu.ataques.push(
    {nombre:'⚡', id:'boton-trueno',texto:"TRUENO"},
    {nombre:'⚡', id:'boton-trueno',texto:"TRUENO"},
    {nombre:'⚡', id:'boton-trueno',texto:"TRUENO"},
    {nombre:'🌊', id:'boton-agua',texto:"AGUA"},
    {nombre:'🔥', id:'boton-fuego',texto:"FUEGO"}
)

squirtle.ataques.push(
    {nombre:'🌊', id:'boton-agua',texto:"AGUA"},
    {nombre:'🌊', id:'boton-agua',texto:"AGUA"},
    {nombre:'🌊', id:'boton-agua',texto:"AGUA"},
    {nombre:'🔥', id:'boton-fuego',texto:"FUEGO"},
    {nombre:'⚡', id:'boton-trueno',texto:"TRUENO"}
)
charmanderEnemigo.ataques.push(
    {nombre:'🔥', id:'boton-fuego',texto:"FUEGO"},
    {nombre:'🔥', id:'boton-fuego',texto:"FUEGO"},
    {nombre:'🔥', id:'boton-fuego',texto:"FUEGO"},
    {nombre:'🌊', id:'boton-agua',texto:"AGUA"},
    {nombre:'⚡', id:'boton-trueno',texto:"TRUENO"}
)

pikachuEnemigo.ataques.push(
    {nombre:'⚡', id:'boton-trueno',texto:"TRUENO"},
    {nombre:'⚡', id:'boton-trueno',texto:"TRUENO"},
    {nombre:'⚡', id:'boton-trueno',texto:"TRUENO"},
    {nombre:'🌊', id:'boton-agua',texto:"AGUA"},
    {nombre:'🔥', id:'boton-fuego',texto:"FUEGO"}
)

squirtleEnemigo.ataques.push(
    {nombre:'🌊', id:'boton-agua',texto:"AGUA"},
    {nombre:'🌊', id:'boton-agua',texto:"AGUA"},
    {nombre:'🌊', id:'boton-agua',texto:"AGUA"},
    {nombre:'🔥', id:'boton-fuego',texto:"FUEGO"},
    {nombre:'⚡', id:'boton-trueno',texto:"TRUENO"}
)
pokemones.push(charmander,pikachu,squirtle)
pokemonesarray=["Charmander","Pikachu","Squirtle"]

 //Objeto creado para que la ruta de las imagenes cambiara dependiendo de la seleccion del pokemon en el area de pelea(segunda fase)
const imagenesPokemon={
    Charmander:"./Asesst/charmanderataqueNew.png",
    Squirtle:"./Asesst/squirtleataqueNew.png",
    Pikachu:"./Asesst/pikachuataqueNew.png"
}
function aleatorio(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

function mostrarMensaje(mensaje) {
    document.getElementById(mensaje).style.display = "flex";
}

function moverMasX(){
    pokemones[pokemonesindex].velocidadX=2;
}
function moverMasY(){
    pokemones[pokemonesindex].velocidadY=-2;

}function moverMenosX(){
    pokemones[pokemonesindex].velocidadX=-2;

}function moverMenosY(){
    pokemones[pokemonesindex].velocidadY=2;
}

function deshabilitarBotones(id1,id2,id3){
    document.getElementById(id1).disabled=true
    document.getElementById(id2).disabled=true
    document.getElementById(id3).disabled=true
}

function iniciarJuego(){

    pokemones.forEach((pokemonunico) => {
        seleccionarPokemones=`
        <input type="radio" name="pokemon" id=${pokemonunico.nombre} />
        <label for=${pokemonunico.nombre} class="tarjeta-seleccion-pokemon">
            <p>${pokemonunico.nombre}</p>
            <img src=${pokemonunico.imagen} alt=${pokemonunico.nombre} />
        </label
        `
        document.getElementById('tarjetas').innerHTML+=seleccionarPokemones

        inputcharmander=document.getElementById('Charmander')
        inputpikachu=document.getElementById('Pikachu')
        inputsquirtle=document.getElementById('Squirtle')
    })

    document.getElementById('boton-seleccionar-pokemon').addEventListener('click',selecionarPokemon);

    document.getElementById('boton-reiniciar-juego').addEventListener('click',reiniciarJuego)
}

function selecionarPokemon(){
    if(inputcharmander.checked){
        pokemon=inputcharmander.id;
    }else if(inputpikachu.checked){
        pokemon=inputpikachu.id;
    }else if(inputsquirtle.checked){
        pokemon=inputsquirtle.id;
    }else{
        return alert("Selecciona una mascota");
    }
    pokemonesindex=pokemonesarray.indexOf(pokemon)
    pokemonJugadorObjeto=pokemones[pokemonesindex]
    document.getElementById('pokemon-imagen-ataque').src=pokemones[pokemonesindex].imagenTarjeta
    document.getElementById('nombre-pokemon-jugador').innerHTML=pokemon
    document.getElementById('seleccionar-pokemon').style.display="none"
    mostrarMensaje('ver-mapa')
    mostrarMapa()
    extraerAtaques(pokemon)
}
function mostrarMapa(){
    mapa.width=200
    mapa.height=200
    intervalo=setInterval(pokemonEnCanvas,50)
    window.addEventListener('keydown',teclaPresionada)
    window.addEventListener('keyup',detenerMovimiento)
}
function pokemonEnCanvas(){

    pokemones[pokemonesindex].x+=pokemones[pokemonesindex].velocidadX;
    pokemones[pokemonesindex].y+=pokemones[pokemonesindex].velocidadY;
    lienzo.clearRect(0,0,mapa.width,mapa.height);
    lienzo.drawImage(
        fondoCanvas,
        0,
        0,
        mapa.width,
        mapa.height,
    )
    pokemonJugadorObjeto.mostrarPokemon();
    charmanderEnemigo.mostrarPokemon();
    pikachuEnemigo.mostrarPokemon();
    squirtleEnemigo.mostrarPokemon();
    if(pokemonJugadorObjeto.velocidadX!==0 || pokemonJugadorObjeto.velocidadY!==0){
        revisarCombate(charmanderEnemigo);
        revisarCombate(pikachuEnemigo);
        revisarCombate(squirtleEnemigo);
    }
}

function teclaPresionada(eventoOcurrido){
    switch(eventoOcurrido.key){
        case "ArrowUp":
            moverMasY()
            break
        case "ArrowDown":
            moverMenosY()
            break
        case "ArrowLeft":
            moverMenosX()
            break
        case "ArrowRight":
            moverMasX()
            break
        default:
            break
    }
}
function detenerMovimiento(){
    pokemones[pokemonesindex].velocidadX=0
    pokemones[pokemonesindex].velocidadY=0
}
function revisarCombate(enemigo){
    const izqEnemigo=enemigo.x;
    const derEnemigo=enemigo.x + enemigo.ancho;
    const arrEnemigo=enemigo.y;
    const abaEnemigo=enemigo.y+enemigo.alto;
    const izqjugador=pokemonJugadorObjeto.x;
    const derjugador=pokemonJugadorObjeto.x + pokemonJugadorObjeto.ancho;
    const arrjugador=pokemonJugadorObjeto.y;
    const abajugador=pokemonJugadorObjeto.y+pokemonJugadorObjeto.alto;

    if(
        abajugador<arrEnemigo ||
        arrjugador>abaEnemigo || 
        derjugador<izqEnemigo || 
        izqjugador>derEnemigo
    ){
        return
    }
    detenerMovimiento()
    clearInterval(intervalo)
    sectionMapa.style.display="none";
    mostrarMensaje('segunda-fase')
    pokemonEnemigoObjeto=enemigo
    seleccionarPokemonEnemigo(pokemonEnemigoObjeto)
}
function seleccionarPokemonEnemigo(pokemonEnemigoObjeto){
    // numeroAleatorio=aleatorio(0,pokemones.length-1)
    let pokemonEnemigo=pokemonEnemigoObjeto.nombre
    ataquesEnemigo=pokemonEnemigoObjeto.ataques
    secuenciaDeAtaque()
    document.getElementById('pokemon-enemigo-imagen-ataque').src=pokemonEnemigoObjeto.imagenTarjeta
    document.getElementById('nombre-pokemon-enemigo').textContent=pokemonEnemigo
    
}
function extraerAtaques(pokemon){
    pokemones.forEach((pokemonuni)=>{
        if(pokemonuni.nombre==pokemon){
            ataques=pokemonuni.ataques
        }
    })
    inyectarAtaques(ataques)
}

function inyectarAtaques(ataques){
    ataques.forEach((ataque)=>{
        ataquesinyectados=`
        <button id=${ataque.id} class="boton-de-ataque" name=${ataque.nombre} value=${ataque.texto}>${ataque.nombre}</button>
        `
        document.getElementById('botones-de-ataques').innerHTML+=ataquesinyectados
    })
    botones=document.querySelectorAll('.boton-de-ataque') // Esto es un array de objetos, cada objeto es un <button> de ataque de los 5.

}
function secuenciaDeAtaque(){
    //Vamos a recorrer el arreglo botones y por cada boton vamos a pedirle que mire en su evento si fue fuego, agua o trueno y pusheelo.
    botones.forEach((boton)=>{
        //En el evento de boton, mire dentro del evento si su contenido es fuego, si sí pusheelo y deshabilite el boton.
        boton.addEventListener('click',(evento)=>{ 
            if(evento.target.textContent===boton.name){
                ataqueJugador.push(boton.value)
                console.log(ataqueJugador)
                boton.disabled=true
            }
            ataqueAleatorioEnemigo()
        })
    })
}

function ataqueAleatorioEnemigo(){
    while(ataquesEnemigo.length>0){
        numeroAleatorio=aleatorio(0,ataquesEnemigo.length-1)
        if(numeroAleatorio==0 || numeroAleatorio==1 || numeroAleatorio==2){
            AtaquesPokemonEnemigo.push(ataquesEnemigo[numeroAleatorio].texto)
            console.log(AtaquesPokemonEnemigo)
            ataquesEnemigo.splice(numeroAleatorio,1)
            break
        }else if(numeroAleatorio==3){
            AtaquesPokemonEnemigo.push(ataquesEnemigo[numeroAleatorio].texto)
            console.log(AtaquesPokemonEnemigo)
            ataquesEnemigo.splice(numeroAleatorio,1)
            break
        }else{
            AtaquesPokemonEnemigo.push(ataquesEnemigo[numeroAleatorio].texto)
            console.log(AtaquesPokemonEnemigo)
            ataquesEnemigo.splice(numeroAleatorio,1)
            break
        }
    }
    console.log(ataquesEnemigo.length)
    if(ataqueJugador.length==5){
        combate()
    }
}

function combate(){
    for(let i=0;i<ataqueJugador.length;i++){
        if(ataqueJugador[i]==AtaquesPokemonEnemigo[i]){
            document.getElementById('mensajes-combate').innerHTML+=`<p><span id="resultado-lucha">Round ${i+1} : ¡Empataron!</span></p>`
        }else if(ataqueJugador[i]=='FUEGO' && AtaquesPokemonEnemigo[i]=='TRUENO'){
            document.getElementById('mensajes-combate').innerHTML+=`<p><span id="resultado-lucha">Round ${i+1} :¡Ganaste!</span></p>`
            victoriasJugador+=1
        }else if(ataqueJugador[i]=='TRUENO' && AtaquesPokemonEnemigo[i]=='AGUA'){
            document.getElementById('mensajes-combate').innerHTML+=`<p><span id="resultado-lucha">Round ${i+1} :¡Ganaste!</span></p>`
            victoriasJugador+=1
        }else if(ataqueJugador[i]=='AGUA' && AtaquesPokemonEnemigo[i]=='FUEGO'){
            document.getElementById('mensajes-combate').innerHTML+=`<p><span id="resultado-lucha">Round ${i+1} :¡Ganaste!</span></p>`
            victoriasJugador+=1
        }else{
            document.getElementById('mensajes-combate').innerHTML+=`<p><span id="resultado-lucha">Round ${i+1} :¡Perdiste!</span></p>`
            victoriasPc+=1
        }
    }
    document.getElementById('mensajes-combate').style.display="flex"
    revisarVidas()
}

function revisarVidas(){
    if(victoriasJugador<victoriasPc){
        let mensajePerder=document.createElement('h2')
        mensajePerder.classList.add('subtitulo')
        mensajePerder.innerHTML="¡Perdiste la batalla! 😔"
        document.getElementById('mensaje-ganador').appendChild(mensajePerder)
        document.getElementById('vidas-jugador').innerHTML=victoriasJugador
        document.getElementById('vidas-enemigo').innerHTML=victoriasPc
        let victorias=document.querySelectorAll('.victorias')
        victorias.forEach((victoria)=>{
            victoria.style.display="flex"
        })
        document.getElementById('ataques-pokemones').style.display="none"
        document.getElementById('reinicio-juego').style.display="flex"
        
    }else if(victoriasJugador>victoriasPc){
        let mensajeGanar=document.createElement('h2')
        mensajeGanar.classList.add('subtitulo')
        mensajeGanar.innerHTML="¡Ganaste la batalla! 😃"
        document.getElementById('mensaje-ganador').appendChild(mensajeGanar)
        document.getElementById('vidas-jugador').innerHTML=victoriasJugador
        document.getElementById('vidas-enemigo').innerHTML=victoriasPc
        let victorias=document.querySelectorAll('.victorias')
        victorias.forEach((victoria)=>{
            victoria.style.display="flex"
        })
        document.getElementById('ataques-pokemones').style.display="none"
        document.getElementById('reinicio-juego').style.display="flex"
    }else{
        let mensajeEmpate=document.createElement('h2')
        mensajeEmpate.classList.add('subtitulo')
        mensajeEmpate.innerHTML="¡Empataron! 😃"
        document.getElementById('mensaje-ganador').appendChild(mensajeEmpate)
        document.getElementById('vidas-jugador').innerHTML=victoriasJugador
        document.getElementById('vidas-enemigo').innerHTML=victoriasPc
        let victorias=document.querySelectorAll('.victorias')
        victorias.forEach((victoria)=>{
            victoria.style.display="flex"
        })
        document.getElementById('ataques-pokemones').style.display="none"
        document.getElementById('reinicio-juego').style.display="flex"
    }

}

function reiniciarJuego(){
    location.reload()
}

iniciarJuego()

