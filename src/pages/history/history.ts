import { Component, OnInit } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { NavParams, ViewController } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { Event } from "../../models/event";
import { EventsService } from "../../services/event-service";
import { Events } from 'ionic-angular';
import { ConfirmPage } from '../confirm/confirm';

@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})

export class HistoryPage {
  eventList: Event[] = [];
  index: number;

  constructor(public events: Events,
              private viewCtrl: ViewController,
              private modalCtrl: ModalController,
              private eventsService: EventsService) {

  }
  ionViewDidLoad(){
    this.eventsService.fetchEvents()
      .subscribe(
        (eventList: Event[]) => this.eventList = eventList
      );
  }

  onOpenEvent(event: Event, index: number) {
    const modal = this.modalCtrl.create(ConfirmPage, {event: event, index: index});
    modal.present();
    modal.onDidDismiss(
      () => {
        this.eventList = this.eventsService.loadEvents();
      }
    );
  }

}