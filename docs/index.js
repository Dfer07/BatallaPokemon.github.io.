const express=require("express")
const cors=require("cors")
const port =8080;

const app=express()

app.use(express.static('public'))
app.use(cors())
app.use(express.json())

const jugadores=[]
class Jugador{
    constructor(id){
        this.id=id
    }
    asignarPokemon(pokemon){
        this.pokemon=pokemon
    }
    actualizarPosicion(x,y){
        this.x=x
        this.y=y
    }
    asignarAtaques(ataques){
        this.ataques=ataques
    }

}

class Pokemon{
    constructor(nombre){
        this.nombre=nombre
    }
}
app.get("/unirse",(req,res)=>{
    const id=`${Math.random()}`
    const jugador=new Jugador(id)
    
    res.setHeader("Access-Control-Allow-Origin","*")
    jugadores.push(jugador)

    res.send(id)  //Lo que se muestra en el body del navegador
})

app.post("/pokemon/:jugadorId",(req,res)=>{
    const jugadorId=req.params.jugadorId || ""
    const nombre=req.body.pokemonJugador || ""
    const pokemon=new Pokemon(nombre)
    const jugadorIndex=jugadores.findIndex((jugador)=> jugadorId===jugador.id)
    if(jugadorIndex>=0){
        jugadores[jugadorIndex].asignarPokemon(pokemon)
    }
    res.end()
})

app.post("/pokemon/:jugadorId/posicion",(req,res)=>{
    const jugadorId=req.params.jugadorId || ""
    const x=req.body.x || 0
    const y=req.body.y || 0
    const jugadorIndex=jugadores.findIndex((jugador)=> jugadorId===jugador.id)
    if(jugadorIndex>=0){
        jugadores[jugadorIndex].actualizarPosicion(x,y)
    }
    const enemigos= jugadores.filter((jugador)=>jugadorId!==jugador.id)
    console.log(enemigos)
    res.send({
        enemigos
    })
})

app.post("/pokemon/:jugadorId/ataques",(req,res)=>{
    const jugadorId=req.params.jugadorId || ""
    const ataques=req.body.ataques || []
    const jugadorIndex=jugadores.findIndex((jugador)=> jugadorId===jugador.id)
    if(jugadorIndex>=0){
        jugadores[jugadorIndex].asignarAtaques(ataques)
    }
    res.end()
})

app.get("/pokemon/:jugadorId/ataques",(req,res)=>{
    const jugadorId=req.params.jugadorId || ""
    const jugador=jugadores.find((jugador)=> jugador.id ===jugadorId)
    res.send({
        ataques: jugador.ataques || []
    })
})
app.listen(port, '0.0.0.0',()=>{
    console.log(`Esta funcionando el puerto ${port}`)  // Aqui estamos pidiendo que escuche el puerto 8080 y arroje un console.log
})