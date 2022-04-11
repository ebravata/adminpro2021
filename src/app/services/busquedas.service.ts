import { NgSwitch } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { DataUsuarios } from '../interfaces/usuarios-data.interfaces';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor( private http: HttpClient) { }

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

  private transformarResp(tipo: 'usuarios'|'medicos'|'hospitales',  resultados: any[]){

    switch( tipo){

      case 'usuarios': {
        return resultados.map(
          user => new Usuario( user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
        )
      }
      case 'hospitales': {
        return resultados.map(
          hospital => new Hospital( hospital.nombre,  hospital.img, hospital.uid)
        )
      }

      case 'medicos': {
        return resultados.map(
          medico => new Medico( medico.nombre, medico._id, medico.img, medico.usuario, medico.hospital)
        )
      }

      default:
        return []
    }

    return resultados.map(
      user => new Usuario( user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
    )

  }

  buscar ( tipo: 'usuarios'|'medicos'|'hospitales', termino: string){

    const url = `${ base_url }/busquedas/coleccion/${ tipo }/${ termino }`;

    return this.http.get< any[] >( url, this.headers )
                .pipe(
                  map( (resp: any) => {

                    switch( tipo) {

                      case 'usuarios':
                      return this.transformarResp( 'usuarios',  resp.resultados );

                      case 'hospitales':
                      return this.transformarResp( 'hospitales', resp.resultados );

                      case 'medicos':
                      return this.transformarResp( 'medicos', resp.resultados );

                      default:
                      return []
                    }


                  })
                );

  }
}
