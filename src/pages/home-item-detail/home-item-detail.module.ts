import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeItemDetailPage } from './home-item-detail';

@NgModule({
  declarations: [
    HomeItemDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeItemDetailPage),
  ],
})
export class HomeItemDetailPageModule {}
