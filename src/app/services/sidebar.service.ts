import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any[] = [];

  cargarMenu(){
    this.menu = JSON.parse( localStorage.getItem('menu') )
  }

  // menu: any[] = [
  //   {
  //     titulo: 'Principal',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       {titulo: 'Main', url:'/'},
  //       {titulo: 'Gráficas', url:'grafica1'},
  //       {titulo: 'Promesas', url:'promesas'},
  //       {titulo: 'ProgresBar', url:'progress'},
  //       {titulo: 'RxJs', url:'rxjs'}

  //     ]
  //   },
  //   {
  //     titulo: 'Mantenimiento',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       {titulo: 'Usuarios', url:'usuarios'},
  //       {titulo: 'Médicos', url:'medicos'},
  //       {titulo: 'Hospitales', url:'hospitales'},
  //     ]
  //   },
  // ];

}
