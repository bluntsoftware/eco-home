import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeListPage } from './home-list';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    HomeListPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(HomeListPage),
  ],
})
export class HomeListPageModule {}
