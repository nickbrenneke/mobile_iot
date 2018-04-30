import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { Event } from "../../models/event";
import { EventsService } from "../../services/event-service";

@Component({
  selector: 'page-confirm',
  templateUrl: 'confirm.html'
})
export class ConfirmPage {
  event: Event;
  index: number;

  constructor(public navParams: NavParams,
              private viewCtrl: ViewController,
              private eventsService: EventsService) {
    this.event = this.navParams.get('event');
  }

  onLeave() {
    this.viewCtrl.dismiss();
  }

  onConfirm() {
    this.eventsService.confirmEvent(this.event);
    this.onLeave();
  }
}
