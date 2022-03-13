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

  menuItems: any[];
  public usuario: Usuario;

  constructor( private sidebarServ: SidebarService,
               private usuarioServ: UsuarioService) { 


    this.menuItems = sidebarServ.menu;
    this.usuario = usuarioServ.usuario;
  }

  ngOnInit(): void {
  }

}
