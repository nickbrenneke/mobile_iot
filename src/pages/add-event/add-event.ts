import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { NgModel } from "@angular/forms";
import { ModalController, LoadingController, ToastController, NavController } from "ionic-angular";
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { File, Entry, FileError } from '@ionic-native/file';
import Rx from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { SetLocationPage } from "../set-location/set-location";
import { Location } from "../../models/location";
import { EventsService } from "../../services/event-service";
import { Event } from "../../models/event";
import { WelcomePage } from "../welcome/welcome";
import { Events } from 'ionic-angular';

declare var cordova: any;

@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html'
})
export class AddEventPage {
  event = new Event();

  // selectOptions = ['<15mins', '15-30mins', '>30mins'];
  location: Location = {
    latitude: 40.443646,
    longitude: -79.944697
  };
  locationIsSet = false;
  pic = '';

  // event = new Event(NgForm);

  constructor(private modalCtrl: ModalController,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private eventsService: EventsService,
              private geolocation: Geolocation,
              private camera: Camera,
              private file: File,
              private nav: NavController,
              public events: Events) {
  }

  onSubmit(eventForm) {

    this.event.latitude = this.location.latitude;
    this.event.longitude = this.location.longitude;
    this.event.pic = this.pic;

    this.eventsService
      .addEvent(this.event)
      .subscribe(
        (newEvent) => {
          this.events.publish('event:add', newEvent);
        }
      );
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
          this.location.latitude = location.coords.latitude;
          this.location.longitude = location.coords.longitude;
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

  onTakePhoto() { 
    this.camera.getPicture({ 
      sourceType: this.camera.PictureSourceType.CAMERA, 
      destinationType: this.camera.DestinationType.DATA_URL, 
      encodingType: this.camera.EncodingType.JPEG, 
      mediaType: this.camera.MediaType.PICTURE, 
      correctOrientation: true 
    }) 
      .then( 
        imageData => { 
          this.pic = "data:image/jpeg;base64," + imageData; 
        } 
      ) 
      .catch( 
        err => { 
          const toast = this.toastCtrl.create({ 
            message: 'Could not take the image. Please try again', 
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
