import {Router, Request, Response} from 'express';
import Server from '../clases/server';
import { Socket } from 'socket.io';
import { usuariosConectados } from '../sockets/sockets';



export const router = Router();

router.get('/mensajes', ( req: Request, res:Response) =>{
     res.json({
         OK: true,
         mensaje: 'Todo esta bien de este lado',
         nombre: ' servirvico rest'
     });
});

router.post('/mensajes', ( req: Request, res:Response) =>{
    
    const de = req.body.de;
    const cuerpo =req.body.cuerpo;
    const server = Server.instace;
    const payload ={
        de,
        cuerpo
    }
    //usamos la misma conexion del servidor
    server.io.emit('mensaje-nuevo', payload);
    //emit solo porque se lo vamos a enviar a todos
    res.json({
        OK: true,
        de,
        cuerpo
    });
});
// //este es nuestro servicio rest aqui es donde tenemos que
//utlizar la magia para conectarnos a la misma conexion
router.post('/mensajes/:id', ( req: Request, res:Response) =>{
    const de = req.body.de;
    const cuerpo =req.body.cuerpo;
    const id = req.params.id; // agaramos los valores por la url
    const payload={
        de,
        cuerpo
    }
  //como estamos utilizando singleton nos estamos conectando a la 
  //conexion que se esta usando en nuetra aplicacion node 
   const server = Server.instace;
  //aqui es dode sucede la ubicacion del canal de conexion
  //para enviarle a un usuario en especifico un mensaje
   server.io.in(id).emit('mensaje-privado', payload);
   res.json({
        OK: true,
       
        de,
        cuerpo,
       id
    });
});


//Servicios para obtener los ids de los usuarios  cocnectados

router.get('/usuarios', (req:Request, res:Response) =>{
    const server = Server.instace;

    server.io.clients( (err:any, clientes: Socket) =>{
        
        if (err){
            return res.json({
              ok:false,
              err
            });
        }

        res.json({
            ok:true,
            clientes
        })
    });

});
//obtener usuarios y sus nombre

router.get('/usuario/detalles', (req:Request, res:Response) => {
    res.json({
        ok:true,
        clientes: usuariosConectados.getLista()
    })
});