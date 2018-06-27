import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Collection, Conduit} from "@bluntsoftware/iglue";
import {EcoHome} from "../../models/eco_home";

/**
 * Generated class for the HomeDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home-detail',
  templateUrl: 'home-detail.html',
})
export class HomeDetailPage {
  collection :Collection;
   home:any;

  constructor(public alertCtrl:AlertController,public conduit:Conduit,public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
    this.home = navParams.get('home') || {name:"",zip:"",items:[]};
    this.collection =  conduit.collection("home");
    this.addRemoveItemQuestions();
  }
  itemLength():number{
    let size:number = 0;
    if(this.home && this.home.items){
     size = this.home.items.length;
    }
    return size
  }
  ionViewDidLoad() {
    this.addRemoveItemQuestions();
  }

  showRecommendations(){

  }
  getRecommendations(){
    return EcoHome.getRecommendations(this.home);
  }
  getUnAnsweredItems(){
    return EcoHome.unAnsweredItems(this.home);
  }

  addRemoveItemQuestions(){
    let that = this;
    this.getItemMap().then((itemMap) => {
      EcoHome.addRemoveItemQuestions(this.home,itemMap);
    }).catch((error) => {
      console.log(error);
    });
  }

  getItemMap(){
    return new Promise<any>((resolve, reject) => {
      this.conduit.collection("item").query().toPromise().then((response) => {
        let itemMap = {};
        response.rows.forEach((item) => {
          itemMap[item._id] = item;
        });
        resolve(itemMap);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  answerQuestions(){
    let unAnsweredItems = this.getUnAnsweredItems();
    if(unAnsweredItems.length >0){
      this.navCtrl.push('HomeItemDetailPage', {home:this.home,indexes:unAnsweredItems});
    }
  }
  editItems(){
    this.navCtrl.push('HomeItemsPage', {home:this.home});
  }
  save() {
    this.collection.save(this.home).toPromise().then((response) => {
      this.navCtrl.push('HomeListPage');
    }).catch((error) => {
      console.log(error);
    });
  }
  public removeHome( ev){
    ev.stopPropagation();
      let alert = this.alertCtrl.create({
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this home ?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {

            }
          },
          {
            text: 'Delete',
            handler: () => {
              this.conduit.collection("home").remove(this.home._id).toPromise().then((response) => {
                this.navCtrl.push('HomeListPage');
              });
            }
          }
        ]
      });
      alert.present();




  }
}
