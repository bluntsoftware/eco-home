import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Conduit} from "@bluntsoftware/iglue";

/**
 * Generated class for the HomeItemDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-item-detail',
  templateUrl: 'home-item-detail.html',
})
export class HomeItemDetailPage {
  home:any;
  itemIndex:number = 0;
  idxIndex = 0;
  indexes:number[] = [];
  constructor(public conduit:Conduit,public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
    this.home = navParams.get('home');
    this.indexes = navParams.get('indexes');
    if(this.indexes){
      this.itemIndex = this.indexes[this.idxIndex];
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeItemDetailPage');
  }

  next(){
    if(!this.indexes){
      this.itemIndex++;
      if(this.itemIndex >= this.home.items.length){
        this.itemIndex = 0;
      }
    }else{
      this.idxIndex++;
        if(this.idxIndex >= this.indexes.length){
          this.idxIndex = 0;
        }
      this.itemIndex = this.indexes[this.idxIndex];
    }
  }
  public save() {
    this.conduit.collection("home").save(this.home).toPromise().then((response) => {
      this.viewCtrl.dismiss(this.home);
    }).catch((error) => {
      console.log(error);
    });
  }

}
