import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeItemsPage } from './home-items';

@NgModule({
  declarations: [
    HomeItemsPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeItemsPage),
  ],
})
export class HomeItemsPageModule {}
