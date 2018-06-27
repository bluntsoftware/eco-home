import {Component, Input} from '@angular/core';
/**
 * Generated class for the BluntGaugeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'blunt-gauge',
  templateUrl: 'blunt-gauge.html'
})
export class BluntGaugeComponent {
  @Input('rating') rating;
  @Input('base') base = 5;
  type:any = 'doughnut';
  data:any = BluntGaugeComponent.gauge(0.0,this.base);
  options:any = BluntGaugeComponent.getOptions(0.0);
  ngAfterViewInit(){
    let rating = Number(this.rating);
    this.data = BluntGaugeComponent.gauge(rating,this.base);
    this.options = BluntGaugeComponent.getOptions(rating);
  };
  constructor() {
    console.log('Hello BluntGaugeComponent Component');
  }
  static getOptions(rating){
    return {
        "cutoutPercentage": 0,
        "rotation": -3.1415926535898,
        "circumference": 3.1415926535898,
        "legend": {
        "display": false
      },
        "tooltips": {
        "enabled": false
      },
        "title": {
        "display": true,
          "text":  rating,
          "position": "bottom",
          "fontSize": "25"
      }
    }
  }
  static gauge(rating, base) {
    let grade = Math.round(rating / base * 100);
    let red = "rgb(255, 69, 96)";
    let orange = "rgb(255, 233, 100)";
    let green = "rgb(153, 223, 89)";
    let blank = "rgba(0, 0, 0, 0)";
    let needle = "rgba(0, 0, 0, 0.6)";
    let template_data = [30, 30, 40];//1,
    let template_background = [red, orange, green];
    let data = [grade - 2, 4, 100 - grade - 2];
    let background = [blank, needle, blank];
    return  {
        "datasets": [
          {
            "data": template_data,
            "backgroundColor": template_background,
            "borderWidth": 0,
            "hoverBackgroundColor": template_background,
            "hoverBorderWidth": 0
          },
          {
            "data": data,
            "backgroundColor": background,
            "borderWidth": 0,
            "hoverBackgroundColor": background,
            "hoverBorderWidth": 0
          },
          {
            "data": data,
            "backgroundColor": background,
            "borderWidth": 0,
            "hoverBackgroundColor": background,
            "hoverBorderWidth": 0
          }
        ]
      }

  }
}
