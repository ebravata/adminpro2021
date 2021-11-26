import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { map, retry, take, filter } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  private intervalSubs: Subscription ; // se declara una propiedad de tipo Subscription para hacer referencia en el codido de nuestro obervable

  constructor() {
    

    // this.retornaObservable().pipe( 

    //   retry(1) // retry permite reintentar obtener el valor en caso de error. El parametro indica le num de veces de reintento

    // ).subscribe( 

    //   valor => console.log('subs: ', valor),
    //   error => console.warn('Error:', error),
    //   () => console.info('Obs terminado')

    // );

    // **** Manera tradicional ***********
    // this.retornaIntervalo().subscribe( valor => {
    //   console.log(valor);
    // });

    // **** Manera simplificada ********** pasa todos los valores  la funciona contigua
    this.intervalSubs = this.retornaIntervalo().subscribe( console.log); // se inicializa la propiedad
    

   }
  ngOnDestroy(): void {

    this.intervalSubs.unsubscribe();
    
  }

   retornaIntervalo(): Observable <number>{ // esta funcion realiza lo mismo que retornaObservable solo que optimizado y usando operadores

      return interval(1000).pipe(     // se puede retornar directamen para tener un codigo mas limpio
        // take(10),                      //indica cuantos valores deseamos tomar del obervable
        map( valor => valor + 1),     //sirve para convertir el valor que emite el oservable y mutarla
        filter( valor => ( valor % 2 === 0 )? true: false  ) // sirve para determinar si se emite un valor de manera condicional
      );

     }

   retornaObservable(): Observable <number>{
    let i = -1;

    const obs$ = new Observable <number> ( observer => {


      const intervalo = setInterval( () => { // se le pone nombre al Interval para hacer referencia en el codigo (poder detenerlo)
        
        i++;
        observer.next(i);

        
        if ( i == 4 ){
          
          clearInterval( intervalo ); // se detiene el interval con el nombre de la constante
          observer.complete();
        }
        
        if ( i === 2){
          // i = 0;
          // console.log('i=2... error');
          observer.error('i llegó al valor de 2');
        }
      }, 1000);

    } );

    return obs$;

   }

  
   
}
