import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {
  public total: number;
  public usuarios: Usuario[];
  public usuariosTemp: Usuario[];
  public desde: number = 0;
  public cargando: boolean = true;

  constructor( private usuarioServ: UsuarioService,
               private busquedaServ: BusquedasService,
               private modalImgServ: ModalImagenService) { }

  ngOnDestroy(): void {

    this.modalImgServ.nuevaImagen.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    
    this.modalImgServ.nuevaImagen
      .pipe( delay(100) ) // se agrega un delay para darle tiempo al server de guardar la imagen.
      .subscribe(
        img =>{
          this.cargarUsuarios();
        });
  }
  
  cargarUsuarios(){
    
    this.usuarioServ.cargarUsuarios( this.desde )
      .subscribe( ({ total, usuarios }) => {
        
        this.total = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
        
      })
  }

  cambiarPagina( valor: number ){
    this.desde += valor;

    if ( this.desde <= 0 ){
      this.desde = 0;
    }else if ( this.desde > this.total ){
      this.desde = this.total;
    }

    this.cargarUsuarios();
  }

  realizarBusqueda( termino: string ): any{

    if (termino.length === 0){
      return this.usuarios = this.usuariosTemp
    }

      this.busquedaServ.buscar('usuarios', termino)
      .subscribe( (usuarios:any)  => {
        
        return this.usuarios = usuarios;
        
      });
  }

  borrarUsuario( usuario: Usuario ){

    if ( usuario.uid === this.usuarioServ.uid ){
      Swal.fire('¡Aviso!',`No se puede eliminar al usuario actual`,'info');
      return;
    }

    Swal.fire({
      title: '¿Desea borrar usuario?',
      text: `Está a punto de borrar al usuario ${ usuario.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.usuarioServ.eliminarUsuario( usuario )
            .subscribe( resp => {
              
              this.cargarUsuarios();
              Swal.fire('Usuario eliminado!',`El usuario ${ usuario.nombre } ha sido eliminado`,'success');

            });
      }
    })
  }

  cambiarRole( usuario: Usuario){
    
    this.usuarioServ.actualizarRole( usuario )
        .subscribe( resp => console.log(resp)
        );
    
  }

  abriModal( usuario: Usuario){
    
    this.modalImgServ.abrirModal( 'usuarios', usuario.uid, usuario.img);
  }
}
