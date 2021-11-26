import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        {titulo: 'Main', url:'/'},
        {titulo: 'Gráficas', url:'grafica1'},
        {titulo: 'Promesas', url:'promesas'},
        {titulo: 'ProgresBar', url:'progress'},
        {titulo: 'RxJs', url:'rxjs'}

      ]
    },
  ];

  constructor() { }
}
