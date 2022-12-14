class Contenedor {
    constructor(productos) {
        this.productos = productos
    }
    getAll() {  
        const fs = require('fs') 
           const archivo =  fs.promises.readFile('./productos.txt', 'utf-8')
        return archivo      
    }
}

const contenedor = new Contenedor([])

//PRODUCTOS:
product1 = {
    title: "Bicicleta",
    price: 1500
}

product2 = {
    title: "Auto",
    price: 1200000
}
product3 = {
    title: "Moto",
    price: 60000
}

// Servidor//
const express = require('express');

const aplicacion = express();

const PUERTO = 8080;

const conexionServidor = aplicacion.listen(PUERTO, ()=>{    
    console.log(`Aplicacion escuchando en el puerto: ${conexionServidor.address().port}`)
})

conexionServidor.on('error', error => console.log(`Ha ocurrido un error: ${error}`))


//Declaración de función//
async function levantarServidor (){
    resp = await contenedor.getAll()
    const archivoParse = JSON.parse(resp)  
    aplicacion.get('/productos', (peticion, respuesta)=>{  
        respuesta.send({data : archivoParse})
    })  
    aplicacion.get('/productoRandom', (peticion, respuesta)=>{ 
        const random = Math.ceil(Math.random() * 3)
        const idRandom = archivoParse.find(producto=> producto.id === random)
        respuesta.send({data : idRandom})
    })
}

//Ejecución de la función//
levantarServidor()







