import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeDetailPage } from './home-detail';

@NgModule({
  declarations: [
    HomeDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeDetailPage),
  ],
})
export class HomeDetailPageModule {}
