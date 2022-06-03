const express = require('express');
const app = express();
const morgan = require('morgan');
const routeProductos = require('./routes/productos')
const routeCarrito = require('./routes/carrito');
const res = require('express/lib/response');
//const http = require('http')
//const routeProducts = require('./routes/productRoutes');
//const {Server : ioServer } = require('socket.io')


//const fs = require ('fs')


// const httpServer = http.createServer(app)
// const io = new ioServer(httpServer)

//middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));



app.use('/api/productos', routeProductos);
app.use('/api/carrito', routeCarrito);


app.get('*', (req,res) => {
    res.send(`Error: -2, descripción: ruta ${req.originalUrl} método ${req.method} no implementada`)
})
 res.redirec



try{
const PORT = 8080
app.listen(PORT,()=>{
    console.log(`Server on port ${PORT}`)
})
}catch(error){
    console.log('Error en el servidor...',error)
}


//NUEVO SERVIDOR
// io.on('connection',(socket)=>{
//     socket.emit("messages", messages)
//     console.log("Nuevo cliente conectado")
//     console.log("Websocket funcionando")

//     socket.on("newMessage", message=>{
//         messages.push(message)
//         io.sockets.emit('messages', messages)
//     })

// })