import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { NavParams, ViewController } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { Event } from "../../models/event";
import { EventsService } from "../../services/event-service";
import { Events } from 'ionic-angular';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'page-event',
  templateUrl: 'event.html'
})
export class EventPage {
  eventList: Event[] = [];
  index: number;

  constructor(public events: Events,
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private eventsService: EventsService) {
    this.index = this.navParams.get('index');

    // events.subscribe('user:signin', (user, token) => {

  }

  ionViewDidLoad(){
    this.eventsService.fetchEvents()
      .subscribe(
        (eventList: Event[]) => this.eventList = eventList
      );
  }
  
  onDelete() {
    this.eventsService.deleteEvent(this.index);
  }
}