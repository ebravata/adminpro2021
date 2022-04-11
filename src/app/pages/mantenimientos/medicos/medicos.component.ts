import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Medico } from 'src/app/models/medico.model';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicosService } from 'src/app/services/medicos.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';


@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public cargando= true;
  public medicos: Medico[];
  public medicosTemp: Medico[];
  public imgSubs: Subscription;

  constructor( private medicosServ: MedicosService,
               private modalImgServ: ModalImagenService,
               private busquedaServ: BusquedasService,
               ) { }


  ngOnDestroy(): void {

    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {


    this.cargarMedicos();

    this.imgSubs = this.modalImgServ.nuevaImagen
    .pipe( delay(100) ) // se agrega un delay para darle tiempo al server de guardar la imagen.
    .subscribe(
      img =>{
        this.cargarMedicos();
      });
  }

  cargarMedicos(){

    this.medicosServ.cargarMedicos()
        .subscribe( resp => {

          this.medicos = resp;
          this.medicosTemp = this.medicos;
          this.cargando = false;
        });

  }

  abriModal( medico: Medico){

    this.modalImgServ.abrirModal( 'medicos', medico._id, medico.img);
  }


  eliminarMedico( medico: Medico ){


    Swal.fire({
      title: '¿Desea borrar Médico?',
      text: `Está a punto de borrar al médico: ${ medico.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.medicosServ.borrarMedico( medico._id )
            .subscribe( resp =>{
              this.cargarMedicos();
              Swal.fire('¡Médico Eliminado!','El médico se eliminó correctamente','info')

            })

      }
    })

  }


  realizarBusqueda( termino: string ): any{

    if (termino.length === 0){
      return this.medicos = this.medicosTemp
    }

      this.busquedaServ.buscar('medicos', termino)
      .subscribe( ( medicos :any)  => {

        return this.medicos = medicos;

      });
  }


}
