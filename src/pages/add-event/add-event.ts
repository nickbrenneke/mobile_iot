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
  imageUrl = '';

  // event = new Event(NgForm);

  constructor(private modalCtrl: ModalController,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private eventsService: EventsService,
              private geolocation: Geolocation,
              private camera: Camera,
              private file: File,
              private nav: NavController) {
  }

  onSubmit(eventForm) {
    this.event.title = 'TTitle';
    this.event.description = 'DDescription';
    this.event.reward = 'reward';
    this.event.duration = 1;
    this.event.close_time = new Date();
    this.event.location = new Location(location.latitude, location.longitude);


    this.eventsService
      // .addEvent(form.value.title, form.value.description, this.location, this.imageUrl);
      .addEvent(this.event)
      .subscribe(
        (newEvent) => {
          this.event = this.event.concat(newEvent);
        }
      );
    // form.reset();
    // this.location = {
    //   lat: 40.7624324,
    //   lng: -73.9759827
    // };
    // this.imageUrl = '';
    // this.locationIsSet = false;
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
          this.imageUrl = "data:image/jpeg;base64," + imageData; 
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
