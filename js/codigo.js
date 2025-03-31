function aleatorio(min,max){
    return Math.floor(Math.random()*(max-min+1)+1);
}

function seleccionar(mensaje,seleccion){
    if(seleccion==1){
        return alert(`${mensaje} Piedra ✊🏻`);
    }else if(seleccion==2){
        return alert(`${mensaje} Papel ✋🏻`);
    }else if (seleccion==3){
        return alert(`${mensaje} Tijera ✌🏻`);
    }else{
        return alert("Selecion no valida");
    }
}

function combate(usuario,maquina){
    if(usuario==maquina){
        alert("Empataron");
    }
    else if(usuario==1 && maquina==3 || usuario==2 && maquina==1 ||usuario==3 && maquina==2){
        alert("Ganaste");
        vidas_player+=1;
    }else{
        alert("Perdiste");
        vidas_pc+=1;
    }
}
function ganador_combate(player1){
    if(player1===3){
        return alert("Ganaste la batalla");
    }else {
        return alert("Perdiste la batalla");
    }
}

let vidas_player=0;
let vidas_pc=0;

while(vidas_player<3 && vidas_pc<3){
    let persona=parseInt(prompt("Selecione: 1 para Piedra, 2 para Papel o 3 para Tijera: "));
    //El PC elije un numero entre 1 y 3 aleatoriamente.
    let pc=aleatorio(1,3);

    //Seleccion del usuario
    seleccionar("Seleccionaste",persona);

    // Seleccion del pc
    seleccionar("El pc seleccionó",pc);

    // Combate
    combate(persona,pc);

}
ganador_combate(vidas_player);