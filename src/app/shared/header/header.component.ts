import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public imagenUrl = '';
  public usuario: Usuario

  constructor( private usuarioServices: UsuarioService,
                private router: Router
                ) {

      this.usuario = usuarioServices.usuario;

  }

  ngOnInit(): void {
  }

  logout(){
   this.usuarioServices.logout();
  }

  busquedaGeneral( termino: string ){

    // console.log( termino );

    if ( termino.trim().length === 0)
        return;

    this.router.navigateByUrl(`/dashboard/busqueda/${ termino }`)

  }

}
