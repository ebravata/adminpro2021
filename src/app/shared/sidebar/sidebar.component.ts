import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [`.has-arrow.waves-effect.waves-dark.active {
    background-color: transparent;
    }`]
})
export class SidebarComponent implements OnInit {

  // menuItems: any[];
  public usuario: Usuario;

  constructor( public sidebarServ: SidebarService,
               private usuarioServ: UsuarioService) {


    // this.menuItems = sidebarServ.menu; se hace referencia al objeto desde el HTML; el servicio de inyecta public
    this.usuario = usuarioServ.usuario;
  }

  ngOnInit(): void {
  }

}
