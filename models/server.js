const express= require('express');

const http = require('http')

const socketio= require('socket.io');

const path     = require('path');
const Sockets = require('./sockets');

const cors = require('cors')

class Server{

    constructor(){
        this.app =express();
        this.port=process.env.PORT;

        //http server

        this.server =http.createServer(this.app);

        
        this.io = socketio(this.server,{
            cors:{
                origin:'*',
                methods:['*']
            }
        });
    }

    middlewares(){
            
    // desplegar el directorio publico

        this.app.use(express.static(path.resolve(__dirname,'../public')));

        // CORS
        this.app.use(cors());


    }

    configurarSockets(){
        new Sockets(this.io);
    }

    execute(){
        this.middlewares();

        this.configurarSockets();

        this.server.listen(this.port, ()=>{
            console.log('Server corriendo: ', this.port);
        });
    }



}

module.exports=Server;