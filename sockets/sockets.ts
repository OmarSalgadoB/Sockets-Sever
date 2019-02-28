import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuarioLista } from '../clases/usuarios-lista';
import { Usuario } from '../clases/usuario';


export const usuariosConectados = new UsuarioLista();



// conectar cliente
export const conectarCliente =(cliente: Socket, io:socketIO.Server)=> {

    const usuario = new Usuario (cliente.id);
    usuariosConectados.agregar(usuario);
  
}  
//Configuracion basica para escucha una desconeccion
export const desconectar = (cliente:Socket, io:socketIO.Server) =>{
    cliente.on('disconnect', () =>{
       console.log('Cliente desconectado');
       usuariosConectados.deleteUsuario(cliente.id);
       io.emit('usuarios-activos', usuariosConectados.getLista());
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

 //escuchar el logeo de un usuario
 export const configurarUsuario = (cliente: Socket,io:socketIO.Server)=> {
    cliente.on('configurar-usuario', (payload : {nombre: string},  callback:Function) => {
  //Aqui esta el punto inportante que vento estamos escuchando
  //el nombre del evento tiene que coinsidir con el que eviamos desde el front   
     usuariosConectados.actualizarNombre(cliente.id,payload.nombre);

     io.emit('usuarios-activos', usuariosConectados.getLista());
        callback({
            ok:true,
            mensaje: 'Usuario logeado con exito',
            usuario: `usuario ${payload.nombre} conectado`
        });
    });
} 

//Obtener Usuario
export const obtenerUsuario = (cliente: Socket,io:socketIO.Server) =>{
   cliente.on('obtener-usuario', () =>{
    io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista());
   });
}