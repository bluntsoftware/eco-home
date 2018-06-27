import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Collection, Conduit} from "@bluntsoftware/iglue";

/**
 * Generated class for the HomeItemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home-items',
  templateUrl: 'home-items.html',
})
export class HomeItemsPage {
  collection :Collection;
  items =[];
  home:any;
  constructor(public conduit:Conduit,public navCtrl: NavController, public navParams: NavParams) {
    this.collection =  conduit.collection("item");
    this.home = navParams.get('home');
    this.list();
  }
  removeItem(idx,ev){
    ev.stopPropagation();
    delete this.home['items'][idx];
    this.addHomeItemCount();
    this.saveHome();
  }
  addItem(item,ev){
    ev.stopPropagation();
    if(!this.home['items']){
      this.home['items'] = [];
    }
    this.home['items'].push(item);
    this.addHomeItemCount();
    this.saveHome();
  }
  editItem(idx){
    console.log(this.home.items[idx].questions);
    this.navCtrl.push('HomeItemDetailPage', {home:this.home,indexes:[idx]});
  }
  saveHome(){
    this.conduit.collection("home").save(this.home);
  }

  children(itemId){
    let ret = [];
    this.home.items.forEach((item,idx)=>{
      if(item && itemId === item._id){

        ret.push({item:item,idx:idx})
      }
    });
    return ret;
  }
  addHomeItemCount(){
    for(let idx in this.items){
      let item = this.items[idx];
      this.items[idx]['count'] = this.countItemsInHome(item);
    }
  }
  countItemsInHome(item){
    let count = 0;
    if(!this.home['items']){
      this.home['items'] = [];
    }
    this.home['items'] = this.home['items'].filter(function(homeItem) {
      return homeItem;
    });
    this.home['items'].forEach((homeItem)=>{
      if(homeItem && homeItem._id === item._id){
        count++;
      }
    });
    return count;
  }
  toggleSection(i) {
    this.items[i].open = !this.items[i].open;
  }

  list(){
    this.collection.query().toPromise().then((response) => {
      this.items = response.rows;
      this.addHomeItemCount();
    }).catch((error) => {
      console.log(error);
    });
  }

}
