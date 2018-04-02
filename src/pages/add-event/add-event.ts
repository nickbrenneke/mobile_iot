import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ModalController, LoadingController, ToastController, NavController } from "ionic-angular";
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { File, Entry, FileError } from '@ionic-native/file';

import { SetLocationPage } from "../set-location/set-location";
import { Location } from "../../models/location";
import { EventsService } from "../../services/events";

import { WelcomePage } from "../welcome/welcome";

declare var cordova: any;

@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html'
})
export class AddEventPage {
  selectOptions = ['<15mins', '15-30mins', '>30mins'];
  
  location: Location = {
    lat: 40.443646,
    lng: -79.944697
  };
  locationIsSet = false;
  imageUrl = '';

  constructor(private modalCtrl: ModalController,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private eventsService: EventsService,
              private geolocation: Geolocation,
              private camera: Camera,
              private file: File,
              private nav: NavController) {
  }

  onSubmit(form: NgForm) {
    this.eventsService
      .addEvent(form.value.title, form.value.description, this.location, this.imageUrl);
    form.reset();
    this.location = {
      lat: 40.7624324,
      lng: -73.9759827
    };
    this.imageUrl = '';
    this.locationIsSet = false;
  }

  onOpenMap() {
    const modal = this.modalCtrl.create(SetLocationPage,
      {location: this.location, isSet: this.locationIsSet});
    modal.present();
    modal.onDidDismiss(
      data => {
        if (data) {
          this.location = data.location;
          this.locationIsSet = true;
        }
      }
    );
  }

  onLocate() {
    const loader = this.loadingCtrl.create({
      content: 'Getting your Location...'
    });
    loader.present();
    this.geolocation.getCurrentPosition()
      .then(
        location => {
          loader.dismiss();
          this.location.lat = location.coords.latitude;
          this.location.lng = location.coords.longitude;
          this.locationIsSet = true;
        }
      )
      .catch(
        error => {
          loader.dismiss();
          const toast = this.toastCtrl.create({
            message: 'Unable to fetch location, please pick it manually!',
            duration: 2500
          });
          toast.present();
        }
      );
  }
  popToRoot(){
    const successToast = this.toastCtrl.create({
    message: 'Event created successfully!',
    duration: 2500});
    successToast.present();
    this.nav.popToRoot();
  }
}
