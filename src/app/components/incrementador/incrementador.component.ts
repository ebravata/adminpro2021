import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  ngOnInit(){
    this.btnClass = `btn ${ this.btnClass }`;
  }


  // @Input() progreso: number = 80; 
  // El valor entre parentesis indica el nombre de la variable esperada desde el HTML, puede quedar vacío
  @Input('valorIn') progreso: number = 80; // valor recibido del padre
  @Input() btnClass: string = "btn-primary";


  @Output('valorOut') valorSalida: EventEmitter<number> = new EventEmitter(); // valor enviado al padre

  
  cambiarValor( valor: number){

    if (this.progreso >= 100 && valor >=0){
      this.valorSalida.emit(100);
      return this.progreso = 100;
    }
    
    if (this.progreso <= 0 && valor < 0){
      this.valorSalida.emit(0)
      return this.progreso = 0;
    }

    this.progreso = this.progreso + valor;
    this.valorSalida.emit(this.progreso);
    return this.progreso;

  }

  onChange(nuevoValor: number){
    
    if ( nuevoValor >= 100){

        this.progreso = 100;

    }else if ( nuevoValor <= 0){

        this.progreso = 0;

    } else {

        this.progreso = nuevoValor;
    }

    this.valorSalida.emit(this.progreso);
  }

}
