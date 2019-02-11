import express  from  'express';
import { SERVER_PORT } from '../global/enviroment';
import socketIO from 'socket.io';
import http from 'http';

import * as socket from '../sockets/sockets'
//es una forma de importar todo lo que esta en ese directorio y le 
//podemos dar el nombre al objeto que querramos
export default class Server {
    private static _instace: Server;
    public app :express.Application;
    public port :number;

    public io :socketIO.Server; 
    //Esta es la proedad que nos permitira emitir evento al servidor
    //por asi decirlo
    private httpServer :http.Server;
  private  constructor(){
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);

        this.escucharSockets();
    }

public static get instace(){
    return this._instace || (this._instace = new this());
}

private escucharSockets(){
   console.log('Escuchando conexiones ---  Sockets');
   this.io.on('connection', cliente =>{
    console.log('Cliente Conextado');   
    //Escuchar mensajes
    socket.mensaje(cliente, this.io);
   
    //Desconectar
      socket.desconectar(cliente);
  
   });
}
    start( callback :Function){
      this.httpServer.listen(this.port, callback);
      //ahi en vez de poner el servidor ponemos el httpServe
    }
}