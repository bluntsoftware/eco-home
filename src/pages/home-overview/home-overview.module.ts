import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeOverviewPage } from './home-overview';

@NgModule({
  declarations: [
    HomeOverviewPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeOverviewPage),
  ],
})
export class HomeOverviewPageModule {}
