import { Component, OnInit } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { Event } from "../../models/event";
import { EventsService } from "../../services/events";
import { EventPage } from "../event/event";
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html'
})
export class EventListPage implements OnInit {
  events: Event[] = [];
  searchKey: string = '';
  searchControl: FormControl;
  searching: any = false;

  constructor(private modalCtrl: ModalController,
              private eventsService: EventsService) {
    this.searchControl = new FormControl();
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

  ionViewDidLoad() {
    this.onInput();
    this.searchControl.valueChanges.debounceTime(700).subscribe(search=> {
      this.searching = false;
      this.onInput();
    });
  }

  // onInput(event) {
  //     this.eventsService.findByName(this.searchKey)
  //         .then(data => {
  //             this.properties = data;
  //             if (this.viewMode === "map") {
  //                 this.showMarkers();
  //             }
  //         })
  //         .catch(error => alert(JSON.stringify(error)));
  // }

  onSearchInput(){
    this.searching = true;
  }

  onInput() {
    this.events = this.eventsService.findByName(this.searchKey);
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