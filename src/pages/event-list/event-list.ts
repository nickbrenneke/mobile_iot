import { Component, OnInit } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { Event } from "../../models/event";
import { EventsService } from "../../services/events";
import { EventPage } from "../event/event";
import { AddEventPage } from "../add-event/add-event";
import { Events } from 'ionic-angular';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html'
})
// export class EventListPage implements OnInit {
export class EventListPage {
  addEventPage = AddEventPage;
  eventList: Event[] = [];
  searchKey: string = '';
  searchControl: FormControl;
  searching: any = false;

  constructor(public events: Events,
              private modalCtrl: ModalController,
              private eventsService: EventsService) {
    this.searchControl = new FormControl();
    events.subscribe('user:signin', (user, token) => {
      console.log('Welcome', user, 'with', token);
      this.eventsService.fetchEvents()
        .subscribe(
          (eventList: Event[]) => this.eventList = eventList
        );

      this.onInput();
    });
  }

  // ngOnInit() {
  //   this.eventsService.fetchEvents()
  //     .subscribe(
  //       (events: Event[]) => this.events = events
  //     );
  // }

  // ionViewWillEnter() {
  //   this.events = this.eventsService.loadEvents();
  // }

  ionViewDidLoad() {
    //Change Observable to Promise type code:
    // this.eventsService.fetchEvents()
    //   .map((events: Event[]) => this.events = events)
    //   .toPromise();
    // this.eventsService.fetchEvents()
    //   .subscribe(
    //     (eventList: Event[]) => this.eventList = eventList
    //   );

    // this.onInput();
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
    this.eventList = this.eventsService.findByName(this.searchKey);
  }

  onOpenEvent(event: Event, index: number) {
    const modal = this.modalCtrl.create(EventPage, {event: event, index: index});
    modal.present();
    modal.onDidDismiss(
      () => {
        this.eventList = this.eventsService.loadEvents();
      }
    );
  }

}