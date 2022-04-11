import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';

import { HospitalService } from 'src/app/services/hospital.service';
import { MedicosService } from 'src/app/services/medicos.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm: FormGroup;
  public hospitales: Hospital[] = [];
  public hospSeleccionado: Hospital;
  public medicoSeleccionado: Medico;

  constructor( private fb: FormBuilder,
               private hospitalServ: HospitalService,
               private medicosServ: MedicosService,
               private router: Router,
               private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params
        .subscribe( ({ id }) => {

          this.obtenerMedicoById( id );

        });


    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    })

    this.medicoForm.get('hospital').valueChanges
        .subscribe( id_hosp => {

          this.hospSeleccionado = this.hospitales.find( h => h._id === id_hosp )
          console.log( this.hospSeleccionado );

        })

    this.cargarHospitales();
  }

  guardarMedico(){

    const { nombre } = this.medicoForm.value;

    if ( this.medicoSeleccionado ){

      const data ={
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }

      this.medicosServ.actualizarMedico( data )
          .subscribe( resp => {

            Swal.fire('¡Médico actualizado!',`Registro para ${ nombre } se actualizó correctamente`,'success');

          })

    }else {


      this.medicosServ.crearMedico( this.medicoForm.value )
        .subscribe( (resp: any) =>{

          Swal.fire('¡Médico agregado!',`Registro para ${ nombre } se realizó correctamente`,'success');
          this.router.navigateByUrl(`/dashboard/medico/${ resp.medico._id }`)
        })

    }



  }

  cargarHospitales(){

    this.hospitalServ.cargarHospitales()
        .subscribe( (hospitales: Hospital[]) => {

            this.hospitales = hospitales;

        })
  }

  obtenerMedicoById( id: string ){

    if ( id === 'nuevo') // si es nuevo no debe cargar datos  osea buscar al  reg para el medico
      return;

    this.medicosServ.obtenerMedico( id )
        .pipe(
          delay(100)
        )
        .subscribe( (medico: Medico) => {

          if ( !medico ){
            this.router.navigateByUrl(`/dashboard/medicos`); // si el ID que ingresan no regresa ningun valor redirecciona
          }

          const { nombre, hospital: { _id} } = medico;

          this.medicoForm.setValue({ nombre, hospital: _id })

          this.medicoSeleccionado = medico;
        })
  }

}
