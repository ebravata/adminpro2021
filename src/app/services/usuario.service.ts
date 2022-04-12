import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { DataUsuarios } from '../interfaces/usuarios-data.interfaces';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: Usuario;

  constructor( private http: HttpClient,
               private router: Router,
               private ngZone: NgZone) {

        this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string{
    return this.usuario.uid;
  }

  get headers() {
    return  {
      headers: {
        'x-token' : this.token
      }
    }
  }

  get userRole(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.usuario.role;
  }

  guardarLocalStorage( token: string, menu: string){
      localStorage.setItem('token', token);
      localStorage.setItem('menu', JSON.stringify( menu ));
  }

  googleInit() {

    return new Promise<void> ( (resolve)  => {

      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '1013639123505-vfdd8o8jnipj4in71ro4qg7463rt3ssj.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });
    });

  }

  logout(){

    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    this.auth2.signOut().then( () => {

      this.ngZone.run( () => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  validarToken(): Observable<boolean>{

    return this.http.get(`${ base_url }/login/renew`, this.headers)
    .pipe(
      map( (resp: any) => {

        const{ nombre, email, google, img = '', role, uid } = resp.usuario;

        // se guarda el usuario en este servicio como una propiedad publica para cargar los datos durante toda la sesion
        this.usuario = new Usuario(nombre, email, '', img, google, role, uid );

        this.guardarLocalStorage( resp.token, resp.menu);
        // localStorage.setItem('token', resp.jwtoken);


        return true;
      }),
      catchError( error => of( false ))
    );
  }

  crearUsuario( formData: RegisterForm ){

    // console.log('usuario creado');

    return this.http.post(`${ base_url }/usuarios`, formData)
                  .pipe(
                    tap ( (resp: any) => {

                    // localStorage.setItem('token', resp.jwtoken);
                    this.guardarLocalStorage( resp.token, resp.menu);

                  }));
  }

  actualizarUsuario( data: {  nombre: string, email: string, role: string }) // se puede hacer sin crear una interfaz para la data recibida
  {

    data = {
      ...data,
      role: this.usuario.role
    };

    return this.http.put(`${ base_url }/usuarios/${ this.uid }`, data, this.headers);
  }


  login( formData: LoginForm ){

    // console.log('usuario creado');

    return this.http.post(`${ base_url }/login`, formData)
              .pipe(
                tap ( (resp: any) => {

                // localStorage.setItem('token', resp.jwtoken);
                this.guardarLocalStorage( resp.token, resp.menu);

              }));
  }

  loginGoogle( token: string ){

    // console.log('usuario creado');

    return this.http.post(`${ base_url }/login/google`, { token })
              .pipe(
                tap ( (resp: any) => {

                // localStorage.setItem('token', resp.jwtoken);
                this.guardarLocalStorage( resp.token, resp.menu);

              }));
  }

  cargarUsuarios( desde: number = 0 ){
    // localhost:3000/api/usuarios?desde=10

    const url = `${ base_url }/usuarios?desde=${ desde }`;

    return this.http.get< DataUsuarios >( url, this.headers ) // el resultado que retorna es de tipo DataUsuarios (interface)
        .pipe(
          map( resp => {

            const usuarios= resp.usuarios.map(
              user => new Usuario(
                user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
            );

            return {
              total: resp.total,
              usuarios
            }
          })
        );
  }

  eliminarUsuario( usuario: Usuario){
    console.log('eliminar usuario');

    const url = `${ base_url }/usuarios/${ usuario.uid }`;

    return this.http.delete( url, this.headers );

  }

  actualizarRole( usuario: Usuario )
  {

      return this.http.put(`${ base_url }/usuarios/${ usuario.uid }`, usuario, this.headers);
  }


}
