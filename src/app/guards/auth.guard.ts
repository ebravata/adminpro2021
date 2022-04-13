import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( private usuarioServices: UsuarioService,
               private router: Router){}


  canLoad(route: Route, segments: UrlSegment[]){

    return this.usuarioServices.validarToken()
    .pipe(
      tap( estaAutenticado => {
        if ( !estaAutenticado ){

          this.router.navigateByUrl('/login');
        }
      })
    );

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){

      return this.usuarioServices.validarToken()
          .pipe(
            tap( estaAutenticado => {
              if ( !estaAutenticado ){

                this.router.navigateByUrl('/login');
              }
            })
          );

  }

}
