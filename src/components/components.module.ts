import { NgModule} from '@angular/core';
import { BluntGaugeComponent } from './blunt-gauge/blunt-gauge';
import {ChartModule} from "angular2-chartjs";
@NgModule({
  imports: [ChartModule],
	declarations: [BluntGaugeComponent],
  exports: [BluntGaugeComponent]
})
export class ComponentsModule {}
