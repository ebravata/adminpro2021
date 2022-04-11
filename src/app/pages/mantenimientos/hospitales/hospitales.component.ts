import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public cargando: boolean = true;
  public hospitales: Hospital[];
  public hospitalesTemp: Hospital[];
  public imgSubs: Subscription;

  constructor( private hospitalesServ: HospitalService,
               private modalImgServ: ModalImagenService,
               private busquedaServ: BusquedasService
               ) { }
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
      this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {

      this.cargarHospitales();

      this.imgSubs = this.modalImgServ.nuevaImagen
                        .pipe( delay(100) ) // se agrega un delay para darle tiempo al server de guardar la imagen.
                        .subscribe(
                          img =>{
                            this.cargarHospitales();
                          });

      }

  cargarHospitales(){
    this.hospitalesServ.cargarHospitales()
    .subscribe( resp =>
      {
        this.hospitales = resp;
        this.hospitalesTemp = this.hospitales;
        this.cargando = false;
      })
  }

  cambiarPagina( desde: number ){

  }

  actualizarHospital( hospital: Hospital ){

    this.hospitalesServ.actualizarHospital( hospital._id, hospital.nombre)
        .subscribe( resp => {
          Swal.fire('¡Hospital Actualizado!','El hospital se actualizó correctamente','info')
        }
        );
  }

  eliminarHospital( hospital: Hospital ){

    this.hospitalesServ.borrarHospital( hospital._id )
        .subscribe( resp => {
          this.cargarHospitales();
          Swal.fire('¡Hospital Eliminado!','El hospital se eliminó correctamente','info')
        }
        );
  }

  async abrirSweetAlert(){
    const { value, isConfirmed } = await Swal.fire<string>({
      title: 'Agregar Hospital',
      input: 'text',
      inputLabel: 'Introduce el nombre del hospital',
      inputPlaceholder: 'nombre hospital',
      showCancelButton: true,
    })


    if ( isConfirmed ) {
      if (value.trim().length > 0){

        this.hospitalesServ.crearHospital( value )
            .subscribe( ( resp: any ) => {

              this.hospitales.push( resp.hospital )
            })
      }
    }
  }

  abriModal( hospital: Hospital){

    this.modalImgServ.abrirModal( 'hospitales', hospital._id, hospital.img);
  }


  realizarBusqueda( termino: string ): any{

    if (termino.length === 0){
      return this.hospitales = this.hospitalesTemp
    }

      this.busquedaServ.buscar('hospitales', termino)
      .subscribe( ( hospitales :any)  => {

        return this.hospitales = hospitales;

      });
  }


}
