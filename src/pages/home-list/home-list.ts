import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {Collection, Conduit} from "@bluntsoftware/iglue";
import {Chart} from 'chart.js';
import {EcoHome} from "../../models/eco_home";
import {HomeOverviewPage} from "../home-overview/home-overview";
/**
 * Generated class for the HomeListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-list',
  templateUrl: 'home-list.html'
})
export class HomeListPage {
  collection :Collection;
  homes = [];
  constructor(public navCtrl: NavController, public modalCtrl: ModalController,public conduit:Conduit,public navParams: NavParams) {
    this.collection =  conduit.collection("home");
    this.list();
  }

  edit(home){
    this.navCtrl.push('HomeDetailPage', {
      home: home
    });
  }
  calculateRatings(){
    for(let idx in this.homes){
      this.homes[idx]['rating'] =   this.rate(this.homes[idx]);
    }
  }
  public showRecommendations(home,ev){
    ev.stopPropagation();
    let recommendations = EcoHome.getRecommendations(home);
    if(recommendations.length >0){
      this.navCtrl.push('HomeOverviewPage', {home:home,recommendations:recommendations});
    }
  }
  public getRecommendations(home){
    return EcoHome.getRecommendations(home);
  }
  public getUnAnsweredItems(home){
    return EcoHome.unAnsweredItems(home);
  }
  public answerQuestions(home,ev){
    ev.stopPropagation();
    let unAnsweredItems = EcoHome.unAnsweredItems(home);
    if(unAnsweredItems.length >0){
      this.navCtrl.push('HomeItemDetailPage', {home:home,indexes:unAnsweredItems});
    }
  }

  public rate(home){
     return  Math.round(EcoHome.rate(home) * 10)/10;
     //return Math.round( (Math.random() * 5) * 10) / 10;
  }
  ionViewDidLoad() {

    //this.list();
  }
  list(){
    this.collection.query().toPromise().then((response) => {
      this.homes = response.rows;
     // this.calculateRatings();
    }).catch((error) => {
      console.log(error);
    });
  }
  create(){
    this.navCtrl.push('HomeDetailPage');
  }

}
