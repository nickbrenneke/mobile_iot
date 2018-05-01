import { Component, OnInit } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { NavParams, ViewController } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { Event } from "../../models/event";
import { EventsService } from "../../services/event-service";
import { Events } from 'ionic-angular';
import { ConfirmPage } from '../confirm/confirm';
import { backend_baseUrl } from '../../constants/backend-constants';

@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})

export class HistoryPage {
  eventList: Event[] = [];
  index: number;
  backend_baseUrl: string = backend_baseUrl;

  constructor(public events: Events,
              private viewCtrl: ViewController,
              private modalCtrl: ModalController,
              private eventsService: EventsService) {

  }
  ionViewDidLoad(){
    this.eventsService.fetchCreatedEvents()
      .subscribe(
        (eventList: Event[]) => this.eventList = eventList
      );
  }

  onOpenEvent(event: Event) {
    const modal = this.modalCtrl.create(ConfirmPage, {event: event});
    modal.present();
    modal.onDidDismiss(
      () => {
      }
    );
  }

  onDelete() {
    this.eventsService.deleteEvent(this.index);
  }

}