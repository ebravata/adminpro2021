import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medico.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return  {
      headers: {
        'x-token' : this.token
      }
    }
  }

  constructor( private http: HttpClient) { }


  cargarMedicos( ){
    // localhost:3000/api/usuarios?desde=10

    const url = `${ base_url }/medicos`;

    return this.http.get( url, this.headers )
               .pipe(
                 map( (resp: { ok: boolean, medicos: Medico[] }) => resp.medicos )
               );
  }

  obtenerMedico( id: string ){
    // localhost:3000/api/usuarios?desde=10

    const url = `${ base_url }/medicos/${ id }`;

    return this.http.get( url, this.headers )
               .pipe(
                 map( (resp: { ok: boolean, medico: Medico }) => resp.medico )
               );
  }

  actualizarMedico( medico: Medico){
    // api/hospitales/620348d229f532bf4be5cee7

    const url = `${ base_url }/medicos/${ medico._id }`;

    return this.http.put( url, medico, this.headers )


  }

  borrarMedico( id_med:string ){
    // api/hospitales/620348d229f532bf4be5cee7

    const url = `${ base_url }/medicos/${ id_med }`;

    return this.http.delete( url, this.headers )


  }

  crearMedico( medico: { nombre: string, hospital: string} ){
    // api/hospitales/620348d229f532bf4be5cee7

    const url = `${ base_url }/medicos`;

    return this.http.post( url, medico, this.headers )


  }
}
