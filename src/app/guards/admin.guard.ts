import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor( private usuarioServices: UsuarioService,
               private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){


      if ( this.usuarioServices.userRole === 'ADMIN_ROLE'){
        return true;
      } else {

        this.router.navigateByUrl('dashboard');
        return false;
      }



    return true;
  }

}
