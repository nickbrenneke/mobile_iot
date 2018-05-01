import { SharedModule } from '../../app/shared.module';
import { EventListPage } from './event-list';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    EventListPage,
  ],
  imports: [
    IonicPageModule.forChild(EventListPage),
    SharedModule,
  ],
  exports: [
    EventListPage
  ]
})

export class EventListPageModule { }