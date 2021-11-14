import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component  {

  public labels1= ['Ventas realizadas', 'Ventas almacen', 'Ventas por correo'];
  public data1 = [
    [200, 200, 200]
  ];
  public labels2= ['Ventas realizadas2', 'Ventas almacen2', 'Ventas por correo2'];
  public data2 = [
    [100, 200, 300]
  ];
  public labels3= ['Ventas realizadas3', 'Ventas almacen3', 'Ventas por correo3'];
  public data3 = [
    [10, 100, 1000]
  ];
  public labels4= ['Ventas realizadas4', 'Ventas almacen4', 'Ventas por correo4'];
  public data4 = [
    [200, 200, 200]
  ];

   
  

}
