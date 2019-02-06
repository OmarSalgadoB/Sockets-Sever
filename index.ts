import Server from './clases/server';
import { SERVER_PORT } from './global/enviroment';
import { router } from './routes/router';
import bodyParser from 'body-parser';
import cors from 'cors';
const server = new Server();

//body parser middelware
server.app.use( bodyParser.urlencoded({extended:true}));
//ahora pasa la peticion a formato JSON
server.app.use( bodyParser.json());

//cors
server.app.use( cors ({origin: true, credentials: true}));
//permite que cualquier presona solicite nuestros servicios


//routes
server.app.use('/', router);

server.start( () =>{
    console.log(`El servidor se esta corriendo en el pueto  ${SERVER_PORT}`)
});