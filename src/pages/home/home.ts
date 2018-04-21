import { Component, OnInit } from '@angular/core';

import { ModalController, NavController } from 'ionic-angular';
import { AddEventPage } from "../add-event/add-event";
import { Event } from "../../models/event";
import { EventsService } from "../../services/event-service";
import { EventPage } from "../event/event";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  addEventPage = AddEventPage;
  events: Event[] = [];

  constructor(private modalCtrl: ModalController,
              private eventsService: EventsService, 
              private nav: NavController) {

  }

  ngOnInit() {
    this.eventsService.fetchEvents()
      .subscribe(
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
