import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from 'src/app/services/usuario.service';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css'
  ]
})
export class LoginComponent implements OnInit {


  public formSubmitted = false;
  public auth2: any;

  public loginForm = this.fb.group({
      email:  [ localStorage.getItem('email') || '', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      remember: [ localStorage.getItem('email') ]
  });

  constructor( private fb: FormBuilder,
               private usuarioServices: UsuarioService,
               private router: Router,
               private ngZone: NgZone) { }
  ngOnInit(): void {

    this.renderButton();
  
  }

  login(){

    this.formSubmitted = true;

    console.log(this.loginForm.value);

    if ( this.loginForm.invalid ){
      
      console.log('formulario no es correcto');
      return;
    }

    this.usuarioServices.login( this.loginForm.value )
        .subscribe( resp => {
          
          if ( this.loginForm.get('remember')?.value ){

            localStorage.setItem('email', this.loginForm.get('email')?.value);

          } else {
            
            localStorage.removeItem('email');
          
          }

          // redireccionar al dashboard
          this.router.navigateByUrl("/");

        }, ( err ) => {

          Swal.fire({
            title: 'Error!',
            text: err.error.msj,
            icon: 'error',
            confirmButtonText: 'OK'
          })
          
        });
  }

  campoNoValido( campo: string ): boolean {

    if ( this.loginForm.get(campo)?.invalid && this.formSubmitted){
      return true;
    } else {
      return false;
    }
  }
  

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });

    this.startApp();
  }

  async startApp() {

      await this.usuarioServices.googleInit();
      this.auth2 = this.usuarioServices.auth2;
    

      this.attachSignin(document.getElementById('my-signin2'));

  }

  attachSignin( element:any ) {
    console.log(element.id);

    this.auth2.attachClickHandler(element, {},
        (googleUser: any) => {

          // document.getElementById('name').innerText = "Signed in: " +
              // console.log (googleUser.getBasicProfile().getName());
              var id_token = googleUser.getAuthResponse().id_token;
              this.usuarioServices.loginGoogle( id_token ).subscribe( resp =>{

                // redireccionar al dashboard

                this.ngZone.run( () => {
                  this.router.navigateByUrl("/");
                });
              });

        }, (error: any) => {

          console.log(JSON.stringify(error, undefined, 2));
        });
  }

}
