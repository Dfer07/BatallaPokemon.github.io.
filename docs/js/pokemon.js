
let ataqueJugador
let ataqueAleatorioPC
let vidas_pc=3
let vidas_jugador=3
let vidas_logo=""

 //Objeto creado para que la ruta de las imagenes cambiara dependiendo de la seleccion del pokemon en el area de pelea(segunda fase)
const imagenesPokemon={
    Charmander:"./Asessts/charmanderataqueNew.png",
    Squirtle:"./Asessts/squirtleataqueNew.png",
    Pikachu:"./Asessts/pikachuataqueNew.png"
}
function aleatorio(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

function mostrarMensaje(mensaje) {
    document.getElementById(mensaje).style.display = "flex";
}

function deshabilitarBotones(id1,id2,id3){
    document.getElementById(id1).disabled=true
    document.getElementById(id2).disabled=true
    document.getElementById(id3).disabled=true
}

function iniciarJuego(){
    document.getElementById('boton-seleccionar-pokemon').addEventListener('click',selecionarPokemon);
    document.getElementById('boton-fuego').addEventListener('click',ataqueFuego)
    document.getElementById('boton-trueno').addEventListener('click',ataqueTrueno)
    document.getElementById('boton-agua').addEventListener('click',ataqueAgua)
    document.getElementById('boton-reiniciar-juego').addEventListener('click',reiniciarJuego)
}

function selecionarPokemon(){
    let pokemon=""
    if(document.getElementById('Charmander').checked){
        pokemon="Charmander";
    }else if(document.getElementById('Pikachu').checked){
        pokemon="Pikachu";
    }else if(document.getElementById('Squirtle').checked){
        pokemon="Squirtle";
    }else{
        return alert("Selecciona una mascota");
    }
    document.getElementById('pokemon-imagen-ataque').src=imagenesPokemon[pokemon]
    document.getElementById('nombre-pokemon-jugador').innerHTML=pokemon
    seleccionarPokemonEnemigo()
}

function seleccionarPokemonEnemigo(){
    let numeroAleatorio=aleatorio(1,3)
    let pokemonEnemigo=""
    if(numeroAleatorio==1){
        pokemonEnemigo="Charmander"
    }else if(numeroAleatorio==2){
        pokemonEnemigo="Pikachu"
    }else{
        pokemonEnemigo="Squirtle"
    }
    document.getElementById('pokemon-enemigo-imagen-ataque').src=imagenesPokemon[pokemonEnemigo]
    document.getElementById('nombre-pokemon-enemigo').innerHTML=pokemonEnemigo
    document.getElementById('seleccionar-pokemon').style.display="none"
    mostrarMensaje('segunda-fase')
}

function ataqueFuego(){
    document.getElementById('ataque-user').innerHTML="Fuego 🔥"
    ataqueJugador=1
    ataqueAleatorioPC=aleatorio(1,3)
    ataqueAleatorioEnemigo(ataqueAleatorioPC)
    mostrarMensaje('mensajes-combate')
    combate(ataqueJugador,ataqueAleatorioPC)
}
function ataqueTrueno(){
    document.getElementById('ataque-user').innerHTML="Trueno ⚡"
    ataqueJugador=2
    ataqueAleatorioPC=aleatorio(1,3)
    ataqueAleatorioEnemigo(ataqueAleatorioPC)
    mostrarMensaje('mensajes-combate')
    combate(ataqueJugador,ataqueAleatorioPC)
}

function ataqueAgua(){
    document.getElementById('ataque-user').innerHTML="Agua 🌊"
    ataqueJugador=3
    ataqueAleatorioPC=aleatorio(1,3)
    ataqueAleatorioEnemigo(ataqueAleatorioPC)
    mostrarMensaje('mensajes-combate')
    combate(ataqueJugador,ataqueAleatorioPC)
}

function ataqueAleatorioEnemigo(ataqueAleatorio){
    if(ataqueAleatorio==1){
        document.getElementById('ataque-pc').innerHTML="Fuego 🔥"
    }else if(ataqueAleatorio==2){
        document.getElementById('ataque-pc').innerHTML="Trueno ⚡"
    }else{
        document.getElementById('ataque-pc').innerHTML="Agua 🌊"
    }
}
function vidasCorazon(value){
    
    if(value==1){
        vidas_logo="❤️";
    }else if(value==2){
        vidas_logo="❤️❤️";
    }else{
        vidas_logo=0;
    }
    return vidas_logo
}

function combate(usuario,maquina){
    if(usuario==maquina){
        document.getElementById('resultado-lucha').innerHTML="¡Hubo un empate!"
    }
    else if(usuario==1 && maquina==2 || usuario==2 && maquina==3 ||usuario==3 && maquina==1){
        document.getElementById('resultado-lucha').innerHTML="¡Ganaste el combate!"
        vidas_pc-=1
        vidasCorazon(vidas_pc)
        document.getElementById('vidas-enemigo').innerHTML=vidas_logo
    }
    else{
        document.getElementById('resultado-lucha').innerHTML="¡Perdiste el combate!"
        vidas_jugador-=1
        vidasCorazon(vidas_jugador)
        document.getElementById('vidas-jugador').innerHTML=vidas_logo
    }
    revisarVidas(vidas_jugador,vidas_pc)
}

function revisarVidas(jugador,pc){
    if(jugador==0){
        let mensajePerder=document.createElement('h2')
        mensajePerder.classList.add('subtitulo')
        mensajePerder.innerHTML="¡Perdiste la batalla! 😔"
        document.getElementById('mensaje-ganador').appendChild(mensajePerder)
        document.getElementById('mensajes-combate').style.display="none"
        deshabilitarBotones('boton-fuego','boton-trueno','boton-agua')
        document.getElementById('ataques-pokemones').style.display="none"
        document.getElementById('reinicio-juego').style.display="flex"
    }else if(pc==0){
        let mensajeGanar=document.createElement('h2')
        mensajeGanar.classList.add('subtitulo')
        mensajeGanar.innerHTML="¡Ganaste la batalla! 😃"
        document.getElementById('mensaje-ganador').appendChild(mensajeGanar)
        document.getElementById('mensajes-combate').style.display="none"
        deshabilitarBotones('boton-fuego','boton-trueno','boton-agua')
        document.getElementById('ataques-pokemones').style.display="none"
        document.getElementById('reinicio-juego').style.display="flex"
    }

}

function reiniciarJuego(){
    location.reload()
}


window.addEventListener('load', iniciarJuego);

