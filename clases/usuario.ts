export class Usuario {
    public id: string;
    public nombre: string;
    public sala : string;
    constructor(id: string){
      //todos los usuarios que se conecten tendran un id 
      this.id = id;
      this.nombre = 'sin nombre'; 
      this.sala = 'sin sala';
    }
}