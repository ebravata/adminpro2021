import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir: File;
  public imagenPreview: any = null;

  @ViewChild( 'inputFile' ) inputFile: any;
 

  constructor( public modalImgServ: ModalImagenService,
               private fileUploadServ: FileUploadService) { }

  ngOnInit(): void {
    // document.getElementById('#intputFile').textContent='hola';
  }

  cerrarModal(){
    this.limpiarBuffer();
    this.modalImgServ.cerrarModal();
  }
  
  abrirModal(usuario: Usuario){

    this.modalImgServ.abrirModal( 'usuarios', usuario.uid, usuario.img );
  }

  cambiarImg( event ){

    const file =  event.target.files[0];

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
        this.limpiarBuffer()
      }
  }

  subirImg(  ){
    const uid = this.modalImgServ.id;
    const tipo = this.modalImgServ.tipo;

    this.fileUploadServ.actualizarImagen( this.imagenSubir, tipo, uid )
        .then( img => { 
          // this.usuario.img = img;
          Swal.fire('Avatar Actualizado','¡Cambios realizados correctamente!', 'success');

          this.modalImgServ.nuevaImagen.emit( img );

        })
        .catch( err => {
          console.log(err);
          
          Swal.fire('Avatar NO Actualizado','¡No se pudo actualizar la imagen!', 'error');
        });
    this.cerrarModal();
  }

  limpiarBuffer(){
    this.imagenSubir = null;
    this.imagenPreview = null;
    this.inputFile.nativeElement.value = "";
  }

}
