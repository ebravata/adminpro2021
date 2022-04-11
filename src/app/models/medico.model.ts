import { Hospital } from "./hospital.model";


interface _MedicoUser { // creamos una interfaz 'local' para tipar la propiedad 'usuario' de la clase 'Medico'
  _id: string;
  nombre: string;
  img: string;
}

export class Medico {

  constructor(
      public nombre: string,
      public _id?: string,
      public img?: string,
      public usuario?: _MedicoUser,
      public hospital?: Hospital

  ){}
}
