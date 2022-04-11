

interface _HospitalUser { // creamos una interfaz 'local' para tipar la propiedad 'usario' de la clase 'Hospital'
    _id: string;
    nombre: string;
    img: string;
}

export class Hospital {

    constructor(
        public nombre: string,
        public _id?: string,
        public img?: string,
        public usuario?: _HospitalUser 

    ){}
}