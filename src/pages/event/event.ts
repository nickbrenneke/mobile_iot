import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { NavParams, ViewController } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { Event } from "../../models/event";
import { EventsService } from "../../services/event-service";
import { Events } from 'ionic-angular';
import 'rxjs/add/operator/debounceTime';
import { EventDetailPage } from '../event-detail/event-detail';

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
              private eventsService: EventsService,
              private modalCtrl: ModalController) {

  }

  ionViewDidLoad(){
    this.eventsService.fetchEvents()
      .subscribe(
        (eventList: Event[]) => this.eventList = eventList
      );
  }

  onOpenEvent(event: Event, index: number) {
    const modal = this.modalCtrl.create(EventDetailPage, {event: event, index: index});
    modal.present();
    modal.onDidDismiss(
      () => {
        this.eventList = this.eventsService.loadEvents();
      }
    );
  }

}