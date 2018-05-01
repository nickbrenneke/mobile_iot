import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { NavParams, ViewController } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { Event } from "../../models/event";
import { EventsService } from "../../services/event-service";
import { Events } from 'ionic-angular';
import 'rxjs/add/operator/debounceTime';
import { EventDetailPage } from '../event-detail/event-detail';
import { ProfilePage } from '../profile/profile';
import { backend_baseUrl } from '../../constants/backend-constants';
import { ProfilePublicPage } from '../profile-public/profile-public';


@Component({
  selector: 'page-event',
  templateUrl: 'event.html'
})
export class EventPage {
  eventList: Event[] = [];
  index: number;
  backend_baseUrl: string = backend_baseUrl;
  constructor(public events: Events,
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private eventsService: EventsService,
              private modalCtrl: ModalController) {

  }

  ionViewDidLoad(){
    this.eventsService.fetchSignedEvents()
      .subscribe(
        (eventList: Event[]) => this.eventList = eventList
      );
  }

  onOpenEvent(event: Event, index: number) {
    const modal = this.modalCtrl.create(EventDetailPage, {event: event, index: index});
    modal.present();
    modal.onDidDismiss(
      () => {
        this.eventList = this.eventsService.loadEvents();      }
    );
  }

  // onOpenProfile(event: Event, index: number) {
  //   const modal = this.modalCtrl.create(ProfilePage);
  //   modal.present();
  //   modal.onDidDismiss(
  //     () => {
  //       this.eventList = this.eventsService.loadEvents();      }
  //   );
  // }

  formatCreateTime(event: Event, index: number) {
     let newDate = new Date(event.create_time);
     const monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
     ];
     // let year = newDate.getFullYear();
     let monthIndex = newDate.getMonth();
     let day = newDate.getDate();
     let hour = newDate.getHours();
     let minute = newDate.getMinutes();
     return monthNames[monthIndex] + ' ' + day + ' ' + hour + ':' + minute;
  }

  formatCloseTime(event: Event, index: number) {
     let newDate = new Date(event.close_time);
     const monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
     ];
     // let year = newDate.getFullYear();
     let monthIndex = newDate.getMonth();
     let day = newDate.getDate();
     let hour = newDate.getHours();
     let minute = newDate.getMinutes();
     return monthNames[monthIndex] + ' ' + day + ' ' + hour + ':' + minute;
  }

  onProfileClick(id){
    console.log('onProfileClick', id);
    const modal = this.modalCtrl.create(ProfilePublicPage, {id: id});
    modal.present();
  }
}