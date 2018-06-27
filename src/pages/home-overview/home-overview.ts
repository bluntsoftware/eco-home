import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HomeOverviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-overview',
  templateUrl: 'home-overview.html',
})
export class HomeOverviewPage {

  home:any;
  recommendations:any[]=[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.home  = navParams.get('home');
      this.recommendations =  navParams.get('recommendations');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeOverviewPage');
  }

}
