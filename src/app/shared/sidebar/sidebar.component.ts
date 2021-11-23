import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [`.has-arrow.waves-effect.waves-dark.active {
    background-color: transparent;
    }`]
})
export class SidebarComponent implements OnInit {

  menuItems: any[];

  constructor( private sidebarServ: SidebarService) { 

    this.menuItems = sidebarServ.menu;
  }

  ngOnInit(): void {
  }

}
