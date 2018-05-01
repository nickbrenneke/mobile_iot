import { Component } from '@angular/core';
import { NavParams, ViewController,ModalController } from 'ionic-angular';

import { Event } from "../../models/event";
import { EventsService } from "../../services/event-service";
import {backend_baseUrl} from "../../constants/backend-constants";
import { ProfilePublicPage } from '../profile-public/profile-public';

@Component({
  selector: 'page-confirm',
  templateUrl: 'confirm.html'
})
export class ConfirmPage {
  event: Event;
  index: number;
  backend_baseUrl: string = backend_baseUrl;

  constructor(public navParams: NavParams,
              private modalCtrl: ModalController,
              private viewCtrl: ViewController,
              private eventsService: EventsService) {
    this.event = this.navParams.get('event');
    console.log('confirm event', this.event);
  }

  onLeave() {
    this.viewCtrl.dismiss();
  }

  onConfirm() {
    this.eventsService.confirmEvent(this.event);
    this.onLeave();
  }

  onCloseEvent() {
    this.eventsService.closeEvent(this.event);
    this.onLeave();
  }

  onProfileClick(id){
    console.log('onProfileClick', id);
    const modal = this.modalCtrl.create(ProfilePublicPage, {id: id});
    modal.present();
  }
}
