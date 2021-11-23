import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public linkTheme = document.querySelector('#theme');

  constructor() {
    console.log('SettingService init...')

    const theme= localStorage.getItem('theme') || './assets/css/colors/purple-dark.css';
    this.linkTheme?.setAttribute ('href', theme);

   }

   changeTheme( theme: string){

    const url = `./assets/css/colors/${ theme }.css`;
    this.linkTheme?.setAttribute ('href', url);
    localStorage.setItem('theme', url);
    this.getCurrentTheme();
    
  }
  
  getCurrentTheme(){

    const links = document.querySelectorAll('.selector');

    links.forEach( btn =>{
      
      btn.classList.remove('working');
      const btnTheme = btn.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${ btnTheme }.css`;
      const currentTheme = this.linkTheme?.getAttribute('href');

      if (currentTheme == btnThemeUrl)
        btn.classList.add('working');


    })

  }
}
