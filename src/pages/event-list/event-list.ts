import { Component, OnInit } from '@angular/core';

import { ModalController } from 'ionic-angular';
import { Event } from "../../models/event";
import { EventsService } from "../../services/events";
import { EventPage } from "../event/event";

@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html'
})
export class EventListPage implements OnInit {
  events: Event[] = [];

  constructor(private modalCtrl: ModalController,
              private eventsService: EventsService) {

  }

  ngOnInit() {
    this.eventsService.fetchEvents()
      .then(
        (events: Event[]) => this.events = events
      );
  }

  ionViewWillEnter() {
    this.events = this.eventsService.loadEvents();
  }

  onOpenEvent(event: Event, index: number) {
    const modal = this.modalCtrl.create(EventPage, {event: event, index: index});
    modal.present();
    modal.onDidDismiss(
      () => {
        this.events = this.eventsService.loadEvents();
      }
    );
  }

}