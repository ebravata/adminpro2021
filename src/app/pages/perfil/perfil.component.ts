import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public imagenSubir: File;
  public imagenPreview: any = null;

  constructor( private fb: FormBuilder, 
               private usuarioServ: UsuarioService,
               private fileUploadServ: FileUploadService) { 
                 
                this.usuario = this.usuarioServ.usuario;

               }

  public usuario: Usuario;

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [ this.usuario.nombre ,  Validators.required ],
      email:  [ this.usuario.email , [ Validators.required, Validators.email ] ]
    })
  }


  guardarCambios(){

    console.log( this.perfilForm.value );

    this.usuarioServ.actualizarUsuario( this.perfilForm.value )
        .subscribe( () => {

          const { nombre, email } = this.perfilForm.value;
          this.usuario.nombre = nombre;
          this.usuario.email = email;

          Swal.fire('Datos Actualizados','¡Cambios realizados correctamente!', 'success');

          }, (err)=>{
            // console.log(err.error.msj);
            
            Swal.fire('Datos NO Actualizados',err.error.msj, 'error');
          });
    
  }

  cambiarImg( event ){

    const file =  event.target.files[0];
    console.log( file );

    if ( file )
      {
        this.imagenSubir = file;
        
        const reader = new FileReader();

        reader.readAsDataURL ( file )

        reader.onloadend = () => {
          this.imagenPreview = reader.result;
        }
      }
    else
      {
        this.imagenSubir = null;
        this.imagenPreview = null;
      }
    
  }

  subirImg(){

    this.fileUploadServ.actualizarImagen( this.imagenSubir, 'usuarios', this.usuario.uid )
        .then( img => { 
          this.usuario.img = img;
          Swal.fire('Avatar Actualizado','¡Cambios realizados correctamente!', 'success');
        })
        .catch( err => {
          console.log(err);
          
          Swal.fire('Avatar NO Actualizado','¡No se pudo actualizar la imagen!', 'error');
        });
  }



}
