
let ataqueJugador
let ataqueAleatorioPC
let vidas_pc=3
let vidas_jugador=3

function aleatorio(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

function mostrarMensaje(mensaje) {
    document.getElementById(mensaje).style.display = "block";
}

function deshabilitarBotones(id1,id2=null,id3=null){
    if(id1!=null && id2==null && id3==null){
        document.getElementById(id1).disabled=true
    }else{
        document.getElementById(id1).disabled=true
        document.getElementById(id2).disabled=true
        document.getElementById(id3).disabled=true
        
    }
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
    document.getElementById('nombre-pokemon-jugador').innerHTML=pokemon
    document.getElementById('pokemon-jugador').innerHTML=pokemon
    deshabilitarBotones('boton-seleccionar-pokemon')
    mostrarMensaje('mensaje-seleccion-pokemon')
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
    document.getElementById('nombre-pokemon-enemigo').innerHTML=pokemonEnemigo
    document.getElementById('pokemon-enemigo').innerHTML=pokemonEnemigo
    mostrarMensaje('mensaje-seleccion-enemigo')
    document.getElementById('Ataques-pokemones').style.display="block"
    document.getElementById('seleccionar-mascota').style.display="none"
}

function ataqueFuego(){
    document.getElementById('ataque-user').innerHTML="fuego"
    ataqueJugador=1
    ataqueAleatorioPC=aleatorio(1,3)
    ataqueAleatorioEnemigo(ataqueAleatorioPC)
    mostrarMensaje('mensaje-resultado-combate')
    combate(ataqueJugador,ataqueAleatorioPC)
}
function ataqueTrueno(){
    document.getElementById('ataque-user').innerHTML="trueno"
    ataqueJugador=2
    ataqueAleatorioPC=aleatorio(1,3)
    ataqueAleatorioEnemigo(ataqueAleatorioPC)
    mostrarMensaje('mensaje-resultado-combate')
    combate(ataqueJugador,ataqueAleatorioPC)
}

function ataqueAgua(){
    document.getElementById('ataque-user').innerHTML="agua"
    ataqueJugador=3
    ataqueAleatorioPC=aleatorio(1,3)
    ataqueAleatorioEnemigo(ataqueAleatorioPC)
    mostrarMensaje('mensaje-resultado-combate')
    combate(ataqueJugador,ataqueAleatorioPC)
}

function ataqueAleatorioEnemigo(ataqueAleatorio){
    if(ataqueAleatorio==1){
        document.getElementById('ataque-pc').innerHTML="fuego"
    }else if(ataqueAleatorio==2){
        document.getElementById('ataque-pc').innerHTML="trueno"
    }else{
        document.getElementById('ataque-pc').innerHTML="agua"
    }
}

function combate(usuario,maquina){
    if(usuario==maquina){
        document.getElementById('resultado-lucha').innerHTML="¡Hubo un empate!"
    }
    else if(usuario==1 && maquina==2 || usuario==2 && maquina==3 ||usuario==3 && maquina==1){
        document.getElementById('resultado-lucha').innerHTML="¡Ganaste el combate!"
        vidas_pc-=1
        document.getElementById('vidas-enemigo').innerHTML=vidas_pc
    }
    else{
        document.getElementById('resultado-lucha').innerHTML="¡Perdiste el combate!"
        vidas_jugador-=1
        document.getElementById('vidas-jugador').innerHTML=vidas_jugador
    }
    revisarVidas(vidas_jugador,vidas_pc)
}

function revisarVidas(jugador,pc){
    if(jugador==0){
        document.getElementById('mensaje-resultado-combate').style.display="none"
        let mensajePerder=document.createElement('p')
        mensajePerder.innerHTML="Lo siento, perdiste 😔"
        document.getElementById('mensajes-combate').appendChild(mensajePerder)
        deshabilitarBotones('boton-fuego','boton-trueno','boton-agua')
        document.getElementById('reinicio-juego').style.display="block"
    }else if(pc==0){
        document.getElementById('mensaje-resultado-combate').style.display="none"
        let mensajeGanar=document.createElement('p')
        mensajeGanar.innerHTML="Ganaste el combate 😃"
        document.getElementById('mensajes-combate').appendChild(mensajeGanar)
        deshabilitarBotones('boton-fuego','boton-trueno','boton-agua')
        document.getElementById('reinicio-juego').style.display="block"
    }
    
}

function reiniciarJuego(){
    location.reload()
}


window.addEventListener('load', iniciarJuego);

