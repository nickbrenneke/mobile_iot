import { Component , ViewChild ,ElementRef } from '@angular/core';
import { ModalController, Platform, NavParams, ViewController, NavController } from 'ionic-angular';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation';
import { AddPlacePage } from "../add-place/add-place";

declare var google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})

  /*
  Class name: MapPage
  Description: This class contains the functions and components to render the Google Maps view of events.
  */
export class MapPage {

  addPlacePage = AddPlacePage;

  options : GeolocationOptions;
  currentPos : Geoposition;
  places : Array<any> ; 
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private geolocation : Geolocation) {}
  openModal(eventNum) {

    let modal = this.modalCtrl.create(ModalContentPage, eventNum);
    modal.present();
  }
  
  /*
  Function name: getUserPosition
  Arguments: None
  Description: This function uses the Geolocation component from the Ionic native functionality to get the user's current position. The function then calls the addMap function, passing in the latitude and longitude coordinates.
  */
  getUserPosition(){
    this.options = {
    enableHighAccuracy : false
    };
    this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {
      this.currentPos = pos;
      console.log(pos);
      this.addMap(pos.coords.latitude,pos.coords.longitude);
    },
    (err : PositionError)=>{
      console.log("error : " + err.message);
    })
  }
  
    /*
  Function name: ionViewDidEnter
  Arguments: None
  Description: This function calls the getUserPosition function when Ionic serves up the page view.
  */
  ionViewDidEnter(){
    this.getUserPosition();
  }
  
    /*
  Function name: addMap
  Arguments: lat, long (latitude and longitude from coordinates)
  Description: This function generates a new Google Maps object, centering around the latitude and longitude coordinates passed in. Once the Map object is created, it calls the [FUNCTION] to get a list of coordinates and creates a marker for each of them. Once the markers are created, the markers are added to the map.
  */
  addMap(lat,long){
    let latLng = new google.maps.LatLng(lat, long);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.getRestaurants(latLng).then((results : Array<any>)=>{
      this.places = results;
      for(let i = 0 ;i < results.length ; i++){
        this.createMarker(results[i]);
      }
    },(status)=>console.log(status));
    this.addMarker();
  }

    /*
  Function name: AddMarker
  Arguments: None
  Description: This function adds markers on the Map object.
  */
  addMarker(){
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<p>Current location</p>";
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }
  
    /*
  Function name: getRestaurants
  Arguments: latLng (Google Maps LatLng object representing latitude and longitude coordinates)
  Description: This function get a list of restaurants nearby using the Google Maps Places API. This is a placeholder for getting nearby user requests from our event database.
  */
  getRestaurants(latLng){
    var service = new google.maps.places.PlacesService(this.map);
    let request = {
      location : latLng,
      types: ["restaurant"],
      rankBy: google.maps.places.RankBy.DISTANCE
    };
    return new Promise((resolve,reject)=>{
      service.nearbySearch(request,function(results,status){
        if(status === google.maps.places.PlacesServiceStatus.OK){
          resolve(results);
        }else
        {
          reject(status);
        }
      }); 
    });
  }
  
    /*
  Function name: createMarker
  Arguments: place (array of places/locations)
  Description: This function creates a marker with info windows containing brief details about the locations.
  */
  createMarker(place){
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: place.geometry.location
    });
    let content = place.name;
    let rating = place.rating;
    let infoWindow = new google.maps.InfoWindow({
      content: "<b>Name</b>: " +content + "<p><b>Rating</b>: " + rating  + "</p>"
    });
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

}

//The following component is for modal (popup) windows. It creates a template with the event details.
@Component({
  template: `
<ion-header>
  <ion-toolbar>
    <ion-title>
    {{event.shortname}}
    </ion-title>
    <ion-buttons start>
      <button ion-button (click)="dismiss()">
        <span ion-text color="primary" showWhen="ios">Cancel</span>
        <ion-icon name="md-close" showWhen="android, windows"></ion-icon>
      </button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>
<ion-content>
  <ion-list>
      <ion-item>
        {{event.name}}
      </ion-item>
      <ion-item>
        {{event.duration}}
      </ion-item>
      <ion-item>
        {{event.time}}
      </ion-item>
      <ion-item>
        {{event.description}}
      </ion-item>
  </ion-list>
</ion-content>
`
})

  /*
  Class name: ModalContentPage
  Description: This class contains sample events to test the modal functionality.
  */
export class ModalContentPage {
  event;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
    var events = [
      {
        shortname: 'Raking',
        name: 'John Smith',
        duration: '2 hours',
        time: '2:30pm',
        description: 'Need help raking my lawn. Bring your own rake!'
      },
      {
        shortname: 'Unloading groceries',
        name: 'Sally Robinson',
        duration: '20 minutes',
        time: 'Now',
        description: 'Need help unloading groceries ASAP. Have issues with my back.'
      },
      {
        shortname: 'Fence repair',
        name: 'Prateek Kumar',
        duration: '30 minutes',
        time: '2/22/2018 4:00pm',
        description: 'Need help fixing a hole in my fence. Bring work gloves.'
      }
    ];
    this.event = events[this.params.get('eventNum')];
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}