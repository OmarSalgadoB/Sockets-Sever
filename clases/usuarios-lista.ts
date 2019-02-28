import { Usuario } from "./usuario";
export class UsuarioLista{
   private lista: Usuario[] = [];
    constructor(){
    }
    //Agregar un Usuario
  public agregar(usuario: Usuario){
      this.lista.push(usuario);
      console.log(this.lista);
      return usuario;
  }  
  //ActualizarNombre
  public actualizarNombre( id: string, nombre:string){
    for (let usuario of this.lista) {
        //barremos toda la lista de usuarios
        if(usuario.id === id){ //si el id que recibimos es igual a alguno de la lista 
            //entonses le pasamos el nombre que recibamos
             usuario.nombre = nombre;
             break; //para salir de ciclo for
        }
    }
    console.log("=========Actualizando Uusario==========");
    console.log(this.lista);
  }

  //Obtener lista de usuario
  public getLista(){
      return this.lista.filter( usuario => usuario.nombre != 'sin-nombre');
  }

  //obtener usuarios
  public getUsuario(id: string) {
      return this.lista.find( usuario => usuario.id === id);
  }

  //obtener usuarios en una sala particular

  public getUsuariosEnSala(sala: string){
      return this.lista.filter( usuario => {
   //esto con el es6 se podria hacer en una sola linea de codigo pero ya lo isimos arriba asi esta bien
           return usuario.sala === sala;
      });
  }

  //borrar un usuario
  public deleteUsuario(id:string){
      const tempUser = this.getUsuario(id);

      this.lista = this.lista.filter( usuario => usuario.id !== id);
    //   console.log(this.lista);
      return tempUser; //para que nos avise quien se fue del chat
  }
}