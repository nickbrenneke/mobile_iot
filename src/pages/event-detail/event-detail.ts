import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { Event } from "../../models/event";
import { EventsService } from "../../services/event-service";

@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html'
})
export class EventDetailPage {
  event: Event;
  index: number;

  constructor(public navParams: NavParams,
              private viewCtrl: ViewController,
              private eventsService: EventsService) {
    this.event = this.navParams.get('event');
    this.index = this.navParams.get('index');
  }

  onLeave() {
    this.viewCtrl.dismiss();
  }

  // onDelete() {
  //   this.eventsService.deleteEvent(this.index);
  //   this.onLeave();
  // }
}
