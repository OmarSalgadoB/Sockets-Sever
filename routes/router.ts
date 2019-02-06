import {Router, Request, Response} from 'express';


export const router = Router();

router.get('/mensajes', ( req: Request, res:Response) =>{
     res.json({
         OK: true,
         mensaje: 'Todo esta bien de este lado',
         nombre: ' servirvico rest'
     });
});

router.post('/mensajes', ( req: Request, res:Response) =>{
    const servicio = req.body.servicio;
    const id = req.body.id;
    const domicilio =req.body.domicilio;
    res.json({
        OK: true,
        mensaje: 'Esto es un mensaje por post',
        nombre: 'Estamos unsa POST',
        servicio,
        id,
        domicilio
    });
});

router.post('/mensajes/:id', ( req: Request, res:Response) =>{
    const servicio = req.body.servicio;
    const domicilio =req.body.domicilio;
    const id = req.params.id; // agaramos los valores por la url
    res.json({
        OK: true,
        mensaje: 'Esto es un mensaje por post',
        nombre: 'Estamos unsa POST',
        servicio,
        id,
        domicilio
    });
});
