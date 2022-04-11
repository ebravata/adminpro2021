import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor( private http: HttpClient ) { }

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


  cargarHospitales( ){
    // localhost:3000/api/usuarios?desde=10

    const url = `${ base_url }/hospitales`;

    return this.http.get( url, this.headers )
               .pipe(
                 map( (resp: { ok: boolean, hospitales: Hospital[]}) => resp.hospitales )
               );
  }

  actualizarHospital( id_hosp:string, nombre: string){
    // api/hospitales/620348d229f532bf4be5cee7

    const url = `${ base_url }/hospitales/${ id_hosp }`;

    return this.http.put( url, { nombre }, this.headers )


  }

  borrarHospital( id_hosp:string ){
    // api/hospitales/620348d229f532bf4be5cee7

    const url = `${ base_url }/hospitales/${ id_hosp }`;

    return this.http.delete( url, this.headers )


  }

  crearHospital( nombre:string ){
    // api/hospitales/620348d229f532bf4be5cee7

    const url = `${ base_url }/hospitales`;

    return this.http.post( url, { nombre }, this.headers )


  }
}
