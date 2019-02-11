import { Socket } from 'socket.io';
import socketIO from 'socket.io';
//Configuracion basica para escucha una desconeccion
export const desconectar = (cliente:Socket) =>{
    cliente.on('disconnect', () =>{
       console.log('Cliente desconectado');
    });
}

//escuchar mensajes
export const mensaje =( cliente:Socket, io:socketIO.Server) =>{
//io:socketIO.Server  este objeto sabe quien esta conectado y quien no
    cliente.on('mensaje', (payload: {de:string, cuerpo:string} )=>{
            console.log('Mensaje recivido', payload);
            io.emit('mensaje-nuevo', payload);
    });
}