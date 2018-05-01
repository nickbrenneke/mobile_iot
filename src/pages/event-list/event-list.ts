import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { Event } from "../../models/event";
import { EventsService } from "../../services/event-service";
import { EventPage } from "../event/event";
import { AddEventPage } from "../add-event/add-event";
import { Events } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import 'rxjs/add/operator/debounceTime';
import { backend_baseUrl } from '../../constants/backend-constants';

@IonicPage()
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
  backend_baseUrl: string = backend_baseUrl;

  constructor(private storage: Storage,
              public events: Events,
              public navCtrl: NavController,
              public navParams: NavParams,
              private eventsService: EventsService) {
    this.searchControl = new FormControl();
    events.subscribe('user:signin', (user, token) => {
      console.log('Welcome', user, 'with', token);
      this.eventsService.fetchNearbyEvents()
        .subscribe(
          (eventList: Event[]) => this.eventList = eventList
        );

      // this.onInput();
    });
    events.subscribe('event:add', (event) => {
      this.eventList.push(event);
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
    this.storage.get('currentToken').then(
        (token)=>{
          if (token) {
            this.eventsService.fetchNearbyEvents()
              .subscribe(
                (eventList: Event[]) => this.eventList = eventList
              );
          }
        }
      )

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

  onSignupClick(event: Event){
    console.log(event);
    this.eventsService.signupEvent(event).subscribe(
        (signup)=>{
          console.log('update after signup');
          console.log(signup, this.eventList);
          let index = -1;
          for (var i = this.eventList.length - 1; i >= 0; i--) {
            if (this.eventList[i].id==signup['event']){
              index = i;
            }
          }
          this.eventList.splice(index, 1);

        }
      );
  }

  // onOpenEvent(event: Event, index: number) {
  //   const modal = this.modalCtrl.create(EventPage, {event: event, index: index});
  //   modal.present();
  //   modal.onDidDismiss(
  //     () => {
  //       this.eventList = this.eventsService.loadEvents();
  //     }
  //   );
  // }

}