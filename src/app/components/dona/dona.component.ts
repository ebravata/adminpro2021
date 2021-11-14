import { Component, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent  {

  @Input () title: string = "sin titulo";
  @Input ('labels') doughnutChartLabels: string [] =  ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input ('data') doughnutChartData: MultiDataSet = [ [350, 450, 100] ];
  // Doughnut
  // public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  // public doughnutChartData: MultiDataSet = [
  //   [350, 450, 100]
  // ];
  // public doughnutChartType: ChartType = 'doughnut';

 

}
