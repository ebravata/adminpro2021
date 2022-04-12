import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';

declare function customInitfunctions(): void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {


  constructor( private settingServices: SettingsService,
               private sidebarServ: SidebarService) { }

  ngOnInit(): void {

    customInitfunctions();

    this.sidebarServ.cargarMenu();


  }



}
