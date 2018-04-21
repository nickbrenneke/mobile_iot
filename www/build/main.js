webpackJsonp([1],{

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_events__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EventPage = (function () {
    function EventPage(navParams, viewCtrl, eventsService) {
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.eventsService = eventsService;
        this.event = this.navParams.get('event');
        this.index = this.navParams.get('index');
    }
    EventPage.prototype.onLeave = function () {
        this.viewCtrl.dismiss();
    };
    EventPage.prototype.onDelete = function () {
        this.eventsService.deleteEvent(this.index);
        this.onLeave();
    };
    EventPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-event',template:/*ion-inline-start:"D:\git\iot_frontend\src\pages\event\event.html"*/'\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>{{ event.title }}</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <ion-grid>\n\n    <ion-row>\n\n      <ion-col text-center>\n\n        <img [src]="event.imageUrl">\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row>\n\n      <ion-col>\n\n        <p>{{ event.description }}</p>\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row>\n\n      <ion-col>\n\n        <agm-map\n\n          [latitude]="event.location.lat"\n\n          [longitude]="event.location.lng"\n\n          [zoom]="16">\n\n          <agm-marker\n\n            [latitude]="event.location.lat"\n\n            [longitude]="event.location.lng"></agm-marker>\n\n        </agm-map>\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row>\n\n      <ion-col>\n\n        <button\n\n          ion-button\n\n          block\n\n          (click)="onLeave()">Leave</button>\n\n      </ion-col>\n\n      <ion-col>\n\n        <button\n\n          ion-button\n\n          block\n\n          color="danger"\n\n          (click)="onDelete()">Delete</button>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\git\iot_frontend\src\pages\event\event.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__services_events__["a" /* EventsService */]])
    ], EventPage);
    return EventPage;
}());

//# sourceMappingURL=event.js.map

/***/ }),

/***/ 181:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__add_event_add_event__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_events__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__event_event__ = __webpack_require__(107);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MapPage = (function () {
    function MapPage(navCtrl, modalCtrl, geolocation, eventsService) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.geolocation = geolocation;
        this.eventsService = eventsService;
        this.addEventPage = __WEBPACK_IMPORTED_MODULE_3__add_event_add_event__["a" /* AddEventPage */];
        this.events = [];
    }
    MapPage.prototype.ngOnInit = function () {
        var _this = this;
        this.eventsService.fetchMapEvents()
            .then(//should be "subscribe" when using fetchEvents()
        function (events) { return _this.events = events; });
    };
    MapPage.prototype.ionViewWillEnter = function () {
        this.events = this.eventsService.loadEvents();
    };
    MapPage.prototype.onOpenEvent = function (event, index) {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__event_event__["a" /* EventPage */], { event: event, index: index });
        modal.present();
        modal.onDidDismiss(function () {
            _this.events = _this.eventsService.loadEvents();
        });
    };
    // openModal(eventNum) {
    //   let modal = this.modalCtrl.create(ModalContentPage, eventNum);
    //   modal.present();
    // }
    /*
    Function name: getUserPosition
    Arguments: None
    Description: This function uses the Geolocation component from the Ionic native functionality to get the user's current position. The function then calls the addMap function, passing in the latitude and longitude coordinates.
    */
    MapPage.prototype.getUserPosition = function () {
        var _this = this;
        this.options = {
            enableHighAccuracy: false
        };
        this.geolocation.getCurrentPosition(this.options).then(function (pos) {
            _this.currentPos = pos;
            console.log(pos);
            _this.addMap(pos.coords.latitude, pos.coords.longitude);
        }, function (err) {
            console.log("error : " + err.message);
        });
    };
    /*
  Function name: ionViewDidEnter
  Arguments: None
  Description: This function calls the getUserPosition function when Ionic serves up the page view.
  */
    MapPage.prototype.ionViewDidEnter = function () {
        this.getUserPosition();
    };
    /*
  Function name: addMap
  Arguments: lat, long (latitude and longitude from coordinates)
  Description: This function generates a new Google Maps object, centering around the latitude and longitude coordinates passed in. Once the Map object is created, it calls the [FUNCTION] to get a list of coordinates and creates a marker for each of them. Once the markers are created, the markers are added to the map.
  */
    MapPage.prototype.addMap = function (lat, long) {
        var _this = this;
        var latLng = new google.maps.LatLng(lat, long);
        var mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        this.getRestaurants(latLng).then(function (results) {
            _this.places = results;
            for (var i = 0; i < results.length; i++) {
                _this.createMarker(results[i]);
            }
        }, function (status) { return console.log(status); });
        this.addMarker();
    };
    /*
    Function name: AddMarker
    Arguments: None
    Description: This function adds markers on the Map object.
    */
    MapPage.prototype.addMarker = function () {
        var _this = this;
        var marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: this.map.getCenter()
        });
        var content = "<p>Current location</p>";
        var infoWindow = new google.maps.InfoWindow({
            content: content
        });
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open(_this.map, marker);
        });
    };
    /*
  Function name: getRestaurants
  Arguments: latLng (Google Maps LatLng object representing latitude and longitude coordinates)
  Description: This function get a list of restaurants nearby using the Google Maps Places API. This is a placeholder for getting nearby user requests from our event database.
  */
    MapPage.prototype.getRestaurants = function (latLng) {
        var service = new google.maps.places.PlacesService(this.map);
        var request = {
            location: latLng,
            types: ["restaurant"],
            rankBy: google.maps.places.RankBy.DISTANCE
        };
        return new Promise(function (resolve, reject) {
            service.nearbySearch(request, function (results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    resolve(results);
                }
                else {
                    reject(status);
                }
            });
        });
    };
    /*
  Function name: createMarker
  Arguments: place (array of places/locations)
  Description: This function creates a marker with info windows containing brief details about the locations.
  */
    MapPage.prototype.createMarker = function (place) {
        var _this = this;
        var marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: place.geometry.location
        });
        var content = place.name;
        var rating = place.rating;
        var infoWindow = new google.maps.InfoWindow({
            content: "<b>Name</b>: " + content + "<p><b>Rating</b>: " + rating + "</p>"
        });
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open(_this.map, marker);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], MapPage.prototype, "mapElement", void 0);
    MapPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-map',template:/*ion-inline-start:"D:\git\iot_frontend\src\pages\map\map.html"*/'<ion-header>\n\n<ion-navbar>\n\n    <ion-title>\n\n    Requests Nearby\n\n    </ion-title>\n\n      <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-buttons end>\n\n      <button ion-button icon-only [navPush]="addEventPage">\n\n      <ion-icon name="add"></ion-icon>\n\n    </button>\n\n        </ion-buttons>\n\n</ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n<div #map id="map"></div> \n\n\n\n<!-- <div style="width : 100% ;height: 60%">\n\n  <ion-list>\n\n    <ion-list-header>\n\n      Open Events\n\n    </ion-list-header>\n\n    <a ion-item (click)="openModal({eventNum: 0})">\n\n      Raking\n\n    </a>\n\n    <a ion-item (click)="openModal({eventNum: 1})">\n\n      Putting Away Groceries\n\n    </a>\n\n    <a ion-item (click)="openModal({eventNum: 2})">\n\n      Fixing Fence\n\n    </a>\n\n  </ion-list>\n\n</div> -->\n\n\n\n<ion-card *ngFor="let event of events; let i = index" (click)="onOpenEvent(event, i)">\n\n  <ion-card-content text-center>\n\n    <ion-card-title>\n\n      {{ event.title }}\n\n    </ion-card-title>\n\n    <p>{{ event.description }}</p>\n\n  </ion-card-content>\n\n</ion-card>\n\n\n\n</ion-content>'/*ion-inline-end:"D:\git\iot_frontend\src\pages\map\map.html"*/
        })
        /*
        Class name: MapPage
        Description: This class contains the functions and components to render the Google Maps view of events.
        */
        ,
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_4__services_events__["a" /* EventsService */]])
    ], MapPage);
    return MapPage;
}());

//The following component is for modal (popup) windows. It creates a template with the event details.
// @Component({
//   template: `
// <ion-header>
//   <ion-toolbar>
//     <ion-title>
//     {{event.shortname}}
//     </ion-title>
//     <ion-buttons start>
//       <button ion-button (click)="dismiss()">
//         <span ion-text color="primary" showWhen="ios">Cancel</span>
//         <ion-icon name="md-close" showWhen="android, windows"></ion-icon>
//       </button>
//     </ion-buttons>
//   </ion-toolbar>
// </ion-header>
// <ion-content>
//   <ion-list>
//       <ion-item>
//         {{event.name}}
//       </ion-item>
//       <ion-item>
//         {{event.duration}}
//       </ion-item>
//       <ion-item>
//         {{event.time}}
//       </ion-item>
//       <ion-item>
//         {{event.description}}
//       </ion-item>
//   </ion-list>
// </ion-content>
// `
// })
//   /*
//   Class name: ModalContentPage
//   Description: This class contains sample events to test the modal functionality.
//   */
// export class ModalContentPage {
//   event;
//   constructor(
//     public platform: Platform,
//     public params: NavParams,
//     public viewCtrl: ViewController
//   ) {
//     var events = [
//       {
//         shortname: 'Raking',
//         name: 'John Smith',
//         duration: '2 hours',
//         time: '2:30pm',
//         description: 'Need help raking my lawn. Bring your own rake!'
//       },
//       {
//         shortname: 'Unloading groceries',
//         name: 'Sally Robinson',
//         duration: '20 minutes',
//         time: 'Now',
//         description: 'Need help unloading groceries ASAP. Have issues with my back.'
//       },
//       {
//         shortname: 'Fence repair',
//         name: 'Prateek Kumar',
//         duration: '30 minutes',
//         time: '2/22/2018 4:00pm',
//         description: 'Need help fixing a hole in my fence. Bring work gloves.'
//       }
//     ];
//     this.event = events[this.params.get('eventNum')];
//   }
//   dismiss() {
//     this.viewCtrl.dismiss();
//   }
// }
//# sourceMappingURL=map.js.map

/***/ }),

/***/ 182:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddEventPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_file__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__set_location_set_location__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_events__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_event__ = __webpack_require__(444);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var AddEventPage = (function () {
    function AddEventPage(modalCtrl, loadingCtrl, toastCtrl, eventsService, geolocation, camera, file, nav) {
        this.modalCtrl = modalCtrl;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.eventsService = eventsService;
        this.geolocation = geolocation;
        this.camera = camera;
        this.file = file;
        this.nav = nav;
        this.events = [];
        this.selectOptions = ['<15mins', '15-30mins', '>30mins'];
        this.location = {
            lat: 40.443646,
            lng: -79.944697
        };
        this.locationIsSet = false;
        this.imageUrl = '';
        this.event = new __WEBPACK_IMPORTED_MODULE_8__models_event__["a" /* Event */](__WEBPACK_IMPORTED_MODULE_1__angular_forms__["NgForm"]);
    }
    AddEventPage.prototype.onSubmit = function (event) {
        var _this = this;
        this.eventsService
            .addEvent(event)
            .subscribe(function (newEvent) {
            _this.events = _this.events.concat(newEvent);
        });
        // form.reset();
        // this.location = {
        //   lat: 40.7624324,
        //   lng: -73.9759827
        // };
        // this.imageUrl = '';
        // this.locationIsSet = false;
    };
    AddEventPage.prototype.onOpenMap = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__set_location_set_location__["a" /* SetLocationPage */], { location: this.location, isSet: this.locationIsSet });
        modal.present();
        modal.onDidDismiss(function (data) {
            if (data) {
                _this.location = data.location;
                _this.locationIsSet = true;
            }
        });
    };
    AddEventPage.prototype.onLocate = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: 'Getting your Location...'
        });
        loader.present();
        this.geolocation.getCurrentPosition()
            .then(function (location) {
            loader.dismiss();
            _this.location.lat = location.coords.latitude;
            _this.location.lng = location.coords.longitude;
            _this.locationIsSet = true;
        })
            .catch(function (error) {
            loader.dismiss();
            var toast = _this.toastCtrl.create({
                message: 'Unable to fetch location, please pick it manually!',
                duration: 2500
            });
            toast.present();
        });
    };
    AddEventPage.prototype.popToRoot = function () {
        var successToast = this.toastCtrl.create({
            message: 'Event created successfully!',
            duration: 2500
        });
        successToast.present();
        this.nav.popToRoot();
    };
    AddEventPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-add-event',template:/*ion-inline-start:"D:\git\iot_frontend\src\pages\add-event\add-event.html"*/'<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>New Request</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <form #f="ngForm" (ngSubmit)="onSubmit(f)">\n\n    <ion-list>\n\n      <ion-item>\n\n        <ion-label fixed>Title</ion-label>\n\n        <ion-input\n\n          type="text"\n\n          placeholder="Moving stuff..."\n\n          name="title"\n\n          ngModel\n\n          required></ion-input>\n\n      </ion-item>\n\n      <ion-item>\n\n        <ion-label floating>Short Description</ion-label>\n\n        <ion-textarea\n\n          name="description"\n\n          ngModel\n\n          required></ion-textarea>\n\n      </ion-item>\n\n      <ion-item>\n\n        <ion-label floating>Estimated Time</ion-label>\n\n        <ion-select>\n\n          <ion-option\n\n            *ngFor="let option of selectOptions"\n\n            [value]="option">{{ option }}\n\n          </ion-option>\n\n        </ion-select>\n\n      </ion-item>\n\n      <ion-item>\n\n        <ion-label>Valid Until</ion-label>\n\n        <ion-datetime displayFormat="MMM D hh:mm A" pickerFormat="MMM D hh mm A"></ion-datetime>\n\n      </ion-item>\n\n      <ion-item>\n\n        <ion-label floating>Reward</ion-label>\n\n        <ion-textarea\n\n          name="reward"\n\n          ngModel\n\n          required></ion-textarea>\n\n      </ion-item>\n\n    </ion-list>\n\n    <ion-grid>\n\n      <ion-row>\n\n        <ion-col>\n\n          <button\n\n            ion-button\n\n            block\n\n            outline\n\n            type="button"\n\n            icon-left\n\n            (click)="onLocate()">\n\n            <ion-icon name="locate"></ion-icon>\n\n            Locate me\n\n          </button>\n\n        </ion-col>\n\n        <ion-col>\n\n          <button\n\n            ion-button\n\n            block\n\n            outline\n\n            type="button"\n\n            icon-left\n\n            (click)="onOpenMap()">\n\n            <ion-icon name="map"></ion-icon>\n\n            Select on Map\n\n          </button>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row *ngIf="locationIsSet">\n\n        <ion-col>\n\n          <agm-map\n\n            [latitude]="location.lat"\n\n            [longitude]="location.lng"\n\n            [zoom]="16"\n\n            [zoomControl]="false"\n\n            [streetViewControl]="false">\n\n            <agm-marker\n\n              [latitude]="location.lat"\n\n              [longitude]="location.lng"></agm-marker>\n\n          </agm-map>\n\n        </ion-col>\n\n      </ion-row>   \n\n      <ion-row>\n\n        <ion-col>\n\n          <button\n\n            ion-button\n\n            color="secondary"\n\n            block\n\n            type="submit"\n\n            [disabled]="!f.valid || !locationIsSet"\n\n            (click)="popToRoot()">\n\n            Post\n\n          </button>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n  </form>\n\n</ion-content>'/*ion-inline-end:"D:\git\iot_frontend\src\pages\add-event\add-event.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_7__services_events__["a" /* EventsService */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavController */]])
    ], AddEventPage);
    return AddEventPage;
}());

//# sourceMappingURL=add-event.js.map

/***/ }),

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_events__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__event_event__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_debounceTime__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_debounceTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_debounceTime__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var EventListPage = (function () {
    function EventListPage(events, modalCtrl, eventsService) {
        var _this = this;
        this.events = events;
        this.modalCtrl = modalCtrl;
        this.eventsService = eventsService;
        this.eventList = [];
        this.searchKey = '';
        this.searching = false;
        this.searchControl = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]();
        events.subscribe('user:signin', function (user, token) {
            console.log('Welcome', user, 'with', token);
            _this.eventsService.fetchEvents()
                .subscribe(function (eventList) { return _this.eventList = eventList; });
            _this.onInput();
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
    EventListPage.prototype.ionViewDidLoad = function () {
        //Change Observable to Promise type code:
        // this.eventsService.fetchEvents()
        //   .map((events: Event[]) => this.events = events)
        //   .toPromise();
        // this.eventsService.fetchEvents()
        //   .subscribe(
        //     (eventList: Event[]) => this.eventList = eventList
        //   );
        var _this = this;
        // this.onInput();
        this.searchControl.valueChanges.debounceTime(700).subscribe(function (search) {
            _this.searching = false;
            _this.onInput();
        });
    };
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
    EventListPage.prototype.onSearchInput = function () {
        this.searching = true;
    };
    EventListPage.prototype.onInput = function () {
        this.eventList = this.eventsService.findByName(this.searchKey);
    };
    EventListPage.prototype.onOpenEvent = function (event, index) {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__event_event__["a" /* EventPage */], { event: event, index: index });
        modal.present();
        modal.onDidDismiss(function () {
            _this.eventList = _this.eventsService.loadEvents();
        });
    };
    EventListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-event-list',template:/*ion-inline-start:"D:\git\iot_frontend\src\pages\event-list\event-list.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n            <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n        <ion-searchbar \n\n        [(ngModel)]="searchKey" \n\n        [formControl]="searchControl"\n\n        (ionInput)="onSearchInput()">\n\n        </ion-searchbar>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <div *ngIf="searching" class="spinner-container">\n\n    <ion-spinner></ion-spinner>\n\n  </div>\n\n  <!-- <ion-card *ngFor="let event of events; let i = index" (click)="onOpenEvent(event, i)">\n\n    <img [src]="event.imageUrl">\n\n    <ion-card-content text-center>\n\n      <ion-card-title>\n\n        {{ event.title }}\n\n      </ion-card-title>\n\n      <p>{{ event.description }}</p>\n\n    </ion-card-content>\n\n  </ion-card> -->\n\n</ion-content>\n\n'/*ion-inline-end:"D:\git\iot_frontend\src\pages\event-list\event-list.html"*/
        })
        // export class EventListPage implements OnInit {
        ,
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_events__["a" /* EventsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_events__["a" /* EventsService */]) === "function" && _c || Object])
    ], EventListPage);
    return EventListPage;
    var _a, _b, _c;
}());

//# sourceMappingURL=event-list.js.map

/***/ }),

/***/ 196:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ProfilePage = (function () {
    function ProfilePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.person = { name: undefined, birthdate: undefined, mobile: undefined, email: undefined };
        this.dob = undefined;
    }
    ProfilePage.prototype.ionViewDidLoad = function () {
        var person = JSON.parse(localStorage.getItem('PERSON'));
        if (person) {
            this.person = person;
            this.age = this.getAge(this.person.birthdate);
            this.dob = new Date(this.person.birthdate).toISOString();
        }
    };
    ProfilePage.prototype.reset = function () {
        this.person = { name: null, birthdate: null, mobile: null, email: null };
        this.dob = null;
        this.showProfile = false;
    };
    ProfilePage.prototype.save = function () {
        this.person.birthdate = new Date(this.dob).getTime();
        this.age = this.getAge(this.person.birthdate);
        this.showProfile = true;
        localStorage.setItem('PERSON', JSON.stringify(this.person));
    };
    ProfilePage.prototype.getAge = function (birthdate) {
        var currentTime = new Date().getTime();
        return ((currentTime - birthdate) / 31556952000).toFixed(0);
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-profile',template:/*ion-inline-start:"D:\git\iot_frontend\src\pages\profile\profile.html"*/'\n\n<ion-header>\n\n\n\n    <ion-navbar>\n\n            <button ion-button menuToggle>\n\n                    <ion-icon name="menu"></ion-icon>\n\n                </button>\n\n      <ion-title>Profile</ion-title>\n\n    </ion-navbar>\n\n  \n\n  </ion-header>\n\n  \n\n  <ion-content padding>\n\n    \n\n    \n\n    <form #formCtrl="ngForm">\n\n        <div align="center" *ngIf="formCtrl.form.valid">\n\n            \n\n          <h1> Profile</h1>\n\n          <img class="profile-image" src="assets/imgs/profile.jpg">\n\n            <h4>{{person.name}}</h4>\n\n            <h5>{{age}} years old</h5>\n\n        </div>\n\n    <ion-list>\n\n        <ion-item>\n\n          <ion-label floating>Name</ion-label>\n\n          <ion-input type="text" [(ngModel)]="person.name" name="name" required></ion-input>\n\n        </ion-item>\n\n        \n\n        <ion-item>\n\n            <ion-label >Birth Date</ion-label>\n\n            <ion-datetime required name="birthdate" displayFormat="DD MMM YYYY" pickerFormat="DD MMM YYYY" [(ngModel)]="dob" [ngModelOptions]="{standalone:true}"></ion-datetime>\n\n        </ion-item>\n\n\n\n        <ion-item>\n\n                <ion-label floating>Contact number</ion-label>\n\n                <ion-input type="text" [(ngModel)]="person.mobile" name="mobile" required></ion-input>\n\n        </ion-item>\n\n\n\n        <ion-item>\n\n                <ion-label floating>Email</ion-label>\n\n                <ion-input type="text" [(ngModel)]="person.email" name="email" required></ion-input>\n\n        </ion-item>\n\n        \n\n        \n\n    </ion-list>\n\n    <button color="secondary" [disabled]="!formCtrl.form.valid" ion-button block (click)="save()">Save</button>\n\n    <button color="danger" ion-button block (click)="reset()">Reset</button>\n\n  </form>\n\n  </ion-content>'/*ion-inline-end:"D:\git\iot_frontend\src\pages\profile\profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 209:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 209;

/***/ }),

/***/ 253:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/profile/profile.module": [
		878,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 253;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SetLocationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_location__ = __webpack_require__(596);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SetLocationPage = (function () {
    function SetLocationPage(navParams, viewCtrl) {
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.location = this.navParams.get('location');
        if (this.navParams.get('isSet')) {
            this.marker = this.location;
        }
    }
    SetLocationPage.prototype.onSetMarker = function (event) {
        console.log(event);
        this.marker = new __WEBPACK_IMPORTED_MODULE_2__models_location__["a" /* Location */](event.coords.lat, event.coords.lng);
    };
    SetLocationPage.prototype.onConfirm = function () {
        this.viewCtrl.dismiss({ location: this.marker });
    };
    SetLocationPage.prototype.onAbort = function () {
        this.viewCtrl.dismiss();
    };
    SetLocationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-set-location',template:/*ion-inline-start:"D:\git\iot_frontend\src\pages\set-location\set-location.html"*/'\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Choose Location</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <ion-grid>\n\n    <ion-row>\n\n      <ion-col>\n\n        <agm-map\n\n          [latitude]="location.lat"\n\n          [longitude]="location.lng"\n\n          [zoom]="16"\n\n          [zoomControl]="false"\n\n          [streetViewControl]="false"\n\n          (mapClick)="onSetMarker($event)">\n\n          <agm-marker\n\n            [latitude]="marker.lat"\n\n            [longitude]="marker.lng"\n\n            *ngIf="marker"></agm-marker>\n\n        </agm-map>\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row>\n\n      <ion-col>\n\n        <button\n\n          ion-button\n\n          block\n\n          color="secondary"\n\n          (click)="onConfirm()"\n\n          [disabled]="!marker">Confirm</button>\n\n      </ion-col>\n\n      <ion-col>\n\n        <button\n\n          ion-button\n\n          block\n\n          color="danger"\n\n          (click)="onAbort()">Abort</button>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\git\iot_frontend\src\pages\set-location\set-location.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */]])
    ], SetLocationPage);
    return SetLocationPage;
}());

//# sourceMappingURL=set-location.js.map

/***/ }),

/***/ 444:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Event; });
var Event = (function () {
    function Event(values) {
        if (values === void 0) { values = {}; }
        Object.assign(this, values);
    }
    return Event;
}());

//# sourceMappingURL=event.js.map

/***/ }),

/***/ 445:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SigninPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__signup_signup__ = __webpack_require__(446);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__event_list_event_list__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var SigninPage = (function () {
    function SigninPage(nav, http, storage, events) {
        this.nav = nav;
        this.http = http;
        this.storage = storage;
        this.events = events;
        this.nav = nav;
    }
    /*
  Function name: openRegistration
  Arguments: None
  Description: This function takes the user to the sign up page.
  */
    SigninPage.prototype.openRegistration = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_1__signup_signup__["a" /* SignupPage */]);
    };
    /*
  Function name: login
  Arguments: None
  Description: This function executes the login after the user enters his/her details and clicks the login button.
  */
    SigninPage.prototype.login = function () {
        var _this = this;
        this.authenticate().subscribe(function (success) {
            _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__event_list_event_list__["a" /* EventListPage */]);
        });
    };
    /*
  Function name: authenticate
  Arguments: None
  Description: This function authenticates the user by sending a POST request to the login API and receiving a token.
  */
    SigninPage.prototype.authenticate = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Headers */]();
        headers.append("Content-Type", "application/json");
        var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* RequestOptions */]({ headers: headers });
        var postParams = {
            username: this.username,
            password: this.password
        };
        //Send JSON request and header info, parse response and return token object
        return this.http.post("http://localhost:8000/accounts/api/login", JSON.stringify(postParams), options)
            .map(function (data) {
            //console.log("PRINTED IN SUBSCIRBE:    " + data["_body"]);
            var parsed = JSON.parse(data["_body"]);
            _this.token = parsed["token"];
            _this.storage.set('originalToken', _this.token).then(function () {
                console.log('Original token has been set.');
                _this.storage.get('currentToken').then(function (val) {
                    console.log('Your current token is', val);
                    _this.events.publish('user:signin', _this.username, _this.token);
                });
            });
            _this.storage.set('currentToken', _this.token).then(function () {
                console.log('Current token has been set.');
                _this.storage.get('originalToken').then(function (val) { console.log('Your original token is', val); });
            });
        }, function (error) {
            console.log(error["_body"]); // Error getting the data
        });
    };
    SigninPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"D:\git\iot_frontend\src\pages\signin\signin.html"*/'\n\n<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Sign In</ion-title>\n\n    <!--button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button-->\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-list>\n\n\n\n    <ion-item>\n\n      <ion-label floating>Username</ion-label>\n\n      <ion-input [(ngModel)]="username" type="text" value=""></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label floating>Password</ion-label>\n\n      <ion-input [(ngModel)]="password" type="password" value=""></ion-input>\n\n    </ion-item>\n\n\n\n  </ion-list>\n\n\n\n  <div padding>\n\n    <button ion-button color="primary" (click)="login()" block>Sign In</button>\n\n  </div>\n\n  \n\n    <div padding>\n\n    <button ion-button color="primary" (click)="openRegistration()" block>Register</button>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"D:\git\iot_frontend\src\pages\signin\signin.html"*/
        })
        /*
        class name: SigninPage
        Description: This class contains related to the sign in page and functionality.
        */
        ,
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* Events */]) === "function" && _d || Object])
    ], SigninPage);
    return SigninPage;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=signin.js.map

/***/ }),

/***/ 446:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_camera__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__validators_username__ = __webpack_require__(872);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__map_map__ = __webpack_require__(181);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var SignupPage = (function () {
    function SignupPage(navCtrl, formBuilder, http, camera, storage, toastCtrl) {
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.http = http;
        this.camera = camera;
        this.storage = storage;
        this.toastCtrl = toastCtrl;
        this.submitAttempt = false;
        //Build first form as a slide object
        this.slideOneForm = formBuilder.group({
            firstName: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].maxLength(255), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern('[a-zA-Z ]*'), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required])],
            lastName: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].maxLength(255), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern('[a-zA-Z ]*'), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required])],
            username: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern('[a-zA-Z]*')]), __WEBPACK_IMPORTED_MODULE_4__validators_username__["a" /* UsernameValidator */].checkUsername],
            email: [''],
            enterPassword: [''],
            confirmPassword: ['']
        });
        //Create slide form two to contain camera objects to capture user picture and government ID photos
        this.slideTwoForm = formBuilder.group({});
    }
    SignupPage.prototype.next = function () {
        this.signupSlider.slideNext();
    };
    SignupPage.prototype.prev = function () {
        this.signupSlider.slidePrev();
    };
    /*   save(){
    
       this.submitAttempt = true;
    
       if(!this.slideOneForm.valid){
           this.signupSlider.slideTo(0);
       }
       else if(!this.slideTwoForm.valid){
           this.signupSlider.slideTo(1);
       }
       else {
           console.log("success!")
           console.log(this.slideOneForm.value);
           console.log(this.slideTwoForm.value);
       }
    
   }*/
    /*
    Function name: save
    Arguments: None
    Description: This function saves the data from the form and submits a POST request to the user registration API
    */
    SignupPage.prototype.save = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_5__angular_http__["a" /* Headers */]();
        headers.append("Content-Type", "application/json");
        var options = new __WEBPACK_IMPORTED_MODULE_5__angular_http__["d" /* RequestOptions */]({ headers: headers });
        var postParams = {
            username: this.slideOneForm.value['username'],
            password: this.slideOneForm.value['enterPassword'],
            email: this.slideOneForm.value['email'],
            first_name: this.slideOneForm.value['firstName'],
            last_name: this.slideOneForm.value['lastName']
        };
        //Submit JSON request to API, receive response, and log any errors
        this.http.post("http://localhost:8000/accounts/api/users", JSON.stringify(postParams), options)
            .subscribe(function (data) {
            console.log(data["_body"]);
            var parsed = JSON.parse(data["_body"]);
            _this.token = parsed["token"];
            _this.storage.set('originalToken', _this.token).then(function () {
                console.log('Original token has been set.');
                _this.storage.get('currentToken').then(function (val) { console.log('Your current token is', val); });
            });
            _this.storage.set('currentToken', _this.token).then(function () {
                console.log('Current token has been set.');
                _this.storage.get('originalToken').then(function (val) { console.log('Your original token is', val); });
            });
        }, function (error) {
            console.log("AN ERROR OCCURED!" + error.error); // Error getting the data
        });
        var successToast = this.toastCtrl.create({
            message: 'Account created successfully!',
            duration: 2500
        });
        successToast.present();
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__map_map__["a" /* MapPage */]);
    };
    /*
  Function name: takePicture
  Arguments: type (type of photo: selfie (self portrait) or ID (govt issued ID)
  Description: This function creates a Camera object to allow a user to take photos using native camera functionality
  */
    SignupPage.prototype.takePicture = function (type) {
        var _this = this;
        this.photoType = type;
        this.camera.getPicture({
            sourceType: this.camera.PictureSourceType.CAMERA,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            //      targetWidth: 1000,
            //      targetHeight: 1000
            correctOrientation: true
        }).then(function (imageData) {
            // imageData is a base64 encoded string
            if (_this.photoType == "selfie") {
                _this.selfiePhoto = "data:image/jpeg;base64," + imageData;
            }
            else {
                _this.idPhoto = "data:image/jpeg;base64," + imageData;
            }
        }, function (err) {
            console.log(err);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('signupSlider'),
        __metadata("design:type", Object)
    ], SignupPage.prototype, "signupSlider", void 0);
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-signup',template:/*ion-inline-start:"D:\git\iot_frontend\src\pages\signup\signup.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n\n    <ion-title>\n\n      Sign Up\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n \n\n<ion-content>\n\n<ion-slides #signupSlider pager>\n\n  <ion-slide>\n\n    <p *ngIf="submitAttempt" style="color: #ea6153;">Please fill out all details accurately.</p>\n\n    <ion-list no-lines>\n\n        <form enctype=\'application/json\'[formGroup]="slideOneForm">\n\n            <ion-item>\n\n                <ion-label floating>First Name</ion-label>\n\n                <ion-input formControlName="firstName" type="text" [class.invalid]="!slideOneForm.controls.firstName.valid && (slideOneForm.controls.firstName.dirty || submitAttempt)"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label floating>Last Name</ion-label>\n\n                <ion-input formControlName="lastName" type="text" [class.invalid]="!slideOneForm.controls.lastName.valid && (slideOneForm.controls.lastName.dirty || submitAttempt)"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n            <ion-label floating>Username</ion-label>\n\n              <ion-input [class.invalid]="!slideOneForm.controls.username.valid && (slideOneForm.controls.username.dirty || submitAttempt)" formControlName="username" type="text"></ion-input>\n\n            </ion-item>\n\n            <ion-item *ngIf="slideOneForm.controls.username.pending">\n\n                <p>Checking username...</p>\n\n            </ion-item>\n\n            <ion-item *ngIf="!slideOneForm.controls.username.valid && !slideOneForm.controls.username.pending && (slideOneForm.controls.username.dirty || submitAttempt)">\n\n                <p>Sorry, that username can not be used!</p>\n\n            </ion-item>\n\n            <ion-item *ngIf="!slideOneForm.controls.firstName.valid  && (slideOneForm.controls.firstName.dirty || submitAttempt)">\n\n                <p>Please enter a valid first name.</p>\n\n            </ion-item>\n\n            <ion-item *ngIf="!slideOneForm.controls.lastName.valid  && (slideOneForm.controls.lastName.dirty || submitAttempt)">\n\n                <p>Please enter a valid last name.</p>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label floating>Email Address</ion-label>\n\n                <ion-input formControlName="email" type="email" [class.invalid]="submitAttempt"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label floating>Password</ion-label>\n\n                <ion-input formControlName="enterPassword" type="password" [class.invalid]="submitAttempt"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label floating>Confirm Password</ion-label>\n\n                <ion-input formControlName="confirmPassword" type="password" [class.invalid]="submitAttempt"></ion-input>\n\n            </ion-item>\n\n        </form>\n\n  </ion-list>\n\n    <div padding>\n\n      <button ion-button color="primary" (click)="next()" block>Next</button>\n\n      </div>\n\n  </ion-slide>\n\n  <ion-slide>\n\n     <form enctype=\'application/json\' [formGroup]="slideTwoForm">\n\n       <div class="col col-33">\n\n            <img [src]="selfiePhoto" class="full-image" *ngIf="selfiePhoto" />\n\n      </div>\n\n       Selfie\n\n       <p><button ion-button (click)="takePicture(\'selfie\')">Take a Picture</button></p>\n\n    <div class="col col-33">\n\n          <img [src]="idPhoto" class="full-image" *ngIf="idPhoto" />\n\n          </div>\n\n       ID Photo\n\n       <p><button ion-button (click)="takePicture(\'license\')">Take a Picture</button></p>\n\n        </form>\n\n      <div padding>\n\n    <button ion-button color="primary" (click)="prev()" block>Previous</button>\n\n    </div>\n\n      <div padding>\n\n    <button ion-button color="primary" (click)="save()" block>Create Account</button>\n\n    </div>\n\n  </ion-slide>\n\n</ion-slides>\n\n</ion-content>'/*ion-inline-end:"D:\git\iot_frontend\src\pages\signup\signup.html"*/
        })
        /*
        Class name: SignupPage
        Description: This page contains the functionality for a user to register/sign up for our platform.
          */
        ,
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"], __WEBPACK_IMPORTED_MODULE_5__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["m" /* ToastController */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 447:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WelcomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var WelcomePage = (function () {
    function WelcomePage() {
    }
    WelcomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-welcome',template:/*ion-inline-start:"D:\git\iot_frontend\src\pages\welcome\welcome.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n            <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n        <ion-title>Helping Hands</ion-title>\n\n\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content no-bounce>\n\n    <ion-slides>\n\n\n\n        <ion-slide style="background-image: url(\'assets/img/community1.png\')">\n\n            <p>Receive help or help your community right start from here!</p>\n\n        </ion-slide>\n\n        \n\n    </ion-slides>\n\n\n\n</ion-content>'/*ion-inline-end:"D:\git\iot_frontend\src\pages\welcome\welcome.html"*/
        })
    ], WelcomePage);
    return WelcomePage;
}());

//# sourceMappingURL=welcome.js.map

/***/ }),

/***/ 448:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(449);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(453);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 453:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_validation__ = __webpack_require__(496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_validation___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_ng2_validation__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_storage__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_geolocation__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__agm_core__ = __webpack_require__(589);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_camera__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_in_app_browser__ = __webpack_require__(594);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__app_component__ = __webpack_require__(595);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_home_home__ = __webpack_require__(873);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_signin_signin__ = __webpack_require__(445);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_signup_signup__ = __webpack_require__(446);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_map_map__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_camera_camera__ = __webpack_require__(874);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_welcome_welcome__ = __webpack_require__(447);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_add_event_add_event__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_event_event__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_set_location_set_location__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_event_list_event_list__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_profile_profile__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__services_events__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__services_profile_service_mock__ = __webpack_require__(875);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__providers_data_data__ = __webpack_require__(877);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





























var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_14__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_20__pages_welcome_welcome__["a" /* WelcomePage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_signin_signin__["a" /* SigninPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_map_map__["a" /* MapPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_camera_camera__["a" /* CameraPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_add_event_add_event__["a" /* AddEventPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_event_event__["a" /* EventPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_set_location_set_location__["a" /* SetLocationPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_event_list_event_list__["a" /* EventListPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_profile_profile__["a" /* ProfilePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_14__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/profile/profile.module#ProfilePageModule', name: 'ProfilePage', segment: 'profile', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_5__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_8_ng2_validation__["CustomFormsModule"],
                __WEBPACK_IMPORTED_MODULE_11__agm_core__["a" /* AgmCoreModule */].forRoot({
                    apiKey: 'AIzaSyC1DqPR9cC4gZEEHXqGr32qXOFFcAdOCkM'
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_14__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_15__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_signin_signin__["a" /* SigninPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_map_map__["a" /* MapPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_camera_camera__["a" /* CameraPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_event_list_event_list__["a" /* EventListPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_set_location_set_location__["a" /* SetLocationPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_event_event__["a" /* EventPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_add_event_add_event__["a" /* AddEventPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_welcome_welcome__["a" /* WelcomePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_in_app_browser__["a" /* InAppBrowser */],
                __WEBPACK_IMPORTED_MODULE_26__services_events__["a" /* EventsService */],
                __WEBPACK_IMPORTED_MODULE_27__services_profile_service_mock__["a" /* ProfileService */],
                __WEBPACK_IMPORTED_MODULE_28__providers_data_data__["a" /* DataProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(390);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_common_http__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_event__ = __webpack_require__(444);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_geolocation__ = __webpack_require__(95);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var EventsService = (function () {
    function EventsService(storage, file, httpClient, geolocation) {
        this.storage = storage;
        this.file = file;
        this.httpClient = httpClient;
        this.geolocation = geolocation;
        this.events = [];
        this.baseUrl = "http://localhost:8000";
        this.location = {
            lat: 40.443646,
            lng: -79.944697
        };
    }
    EventsService.prototype.createAuthorizationHeader = function (token) {
        var headers = new __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["c" /* HttpHeaders */]();
        // headers = headers.set("Access-Control-Allow-Origin", "*");
        // headers = headers.set("Access-Control-Allow-Credentials", "true");
        // headers = headers.set("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        // .set("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")
        // headers = headers.set("X-CustomHeader", "custom header value");
        // .set("Authorization", token);
        //get auth token
        // let token = 'JWT ' + this.storage.get('currentToken');
        //append auth token to headers
        headers = headers.set("Authorization", 'JWT ' + token);
        console.log('get the token in header ' + token);
        console.log('headers', { headers: headers });
        return headers;
    };
    EventsService.prototype.addEvent = function (event) {
        // const event = new Event(title, description, location, imageUrl);
        // this.events.push(event);
        // this.storage.set('events', this.events)
        //   .then()
        //   .catch(
        //     err => {
        //       this.events.splice(this.events.indexOf(event), 1);
        //     }
        //   );
        var options = {
            headers: this.createAuthorizationHeader()
        };
        return this.httpClient
            .post(this.baseUrl + '/we_help/events/created', event, options)
            .map(function (response) {
            return new __WEBPACK_IMPORTED_MODULE_8__models_event__["a" /* Event */](response);
        })
            .catch(function (error) {
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].throw(error);
        });
    };
    EventsService.prototype.loadEvents = function () {
        return this.events.slice();
    };
    //Mock-up code for showing event details
    EventsService.prototype.fetchMapEvents = function () {
        var _this = this;
        return this.storage.get('events')
            .then(function (events) {
            _this.events = events != null ? events : [];
            return _this.events;
        })
            .catch(function (err) { return console.log(err); });
    };
    EventsService.prototype.fetchEvents = function () {
        var _this = this;
        // return this.storage.get('events')
        //   .then(
        //     (events: Event[]) => {
        //       this.events = events != null ? events : [];
        //       return this.events;
        //     }
        //   )
        //   .catch(
        //     err => console.log(err)
        //   );
        console.log('fetch event');
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].from(Promise.all([this.storage.get('currentToken'), this.geolocation.getCurrentPosition()])
            .then(function (results) {
            var token = results[0];
            var location = results[1];
            console.log(token, location);
            var headers = _this.createAuthorizationHeader(token);
            _this.location.latitude = location.coords.latitude;
            _this.location.longitude = location.coords.longitude;
            return _this.httpClient.get(_this.baseUrl + '/we_help/events/?longitude=' + _this.location.longitude + '&latitude=' + _this.location.latitude, { headers: headers })
                .map(function (events) { return events; }, function (error) {
                console.log('failure invoke');
                console.log(error); // Error getting the data
            }).toPromise();
        }));
        // this.storage.get('currentToken').then(
        //   val => {
        //     console.log('get header');
        //     let headers = this.createAuthorizationHeader(val);
        //     return headers
        // }).then(
        //   headers => {
        //     console.log('try fetch', headers);
        //     return this.httpClient.get(this.baseUrl + '/we_help/events/?longitude=lat&latitude=lng', {headers})
        //     .map((events: Event[]) => events
        //     ,error => {
        //       console.log('failure invoke');
        //       console.log(error);// Error getting the data
        //     }).toPromise();
        //   }
        // ));
        // let options = {
        //   headers: this.createAuthorizationHeader()
        // };
        // this.geolocation.getCurrentPosition()
        //   .then(
        //     location => {
        //       this.location.lat = location.coords.latitude;
        //       this.location.lng = location.coords.longitude;
        //     }
        //   );
        // return this.httpClient
        //   // .get(this.baseUrl + '/we_help/events/?longitude=-79.95&latitude=40.45', options)
        //   .get(this.baseUrl + '/we_help/events/?longitude=lat&latitude=lng', options)
        //   .map((events: Event) => event)
        //   .catch((error: any) => Observable.throw(error));
    };
    EventsService.prototype.deleteEvent = function (index) {
        var _this = this;
        var event = this.events[index];
        this.events.splice(index, 1);
        this.storage.set('events', this.events)
            .then(function () {
            _this.removeFile(event);
        })
            .catch(function (err) { return console.log(err); });
    };
    EventsService.prototype.removeFile = function (event) {
        var currentName = event.imageUrl.replace(/^.*[\\\/]/, '');
        this.file.removeFile(cordova.file.dataDirectory, currentName)
            .then(function () { return console.log('Removed File'); })
            .catch(function () {
            console.log('Error while removing File');
            // this.addEvent(event.title, event.description, event.location, event.imageUrl);
        });
    };
    EventsService.prototype.findByName = function (searchKey) {
        var key = searchKey.toUpperCase();
        // return Promise.resolve(Event.filter((event: any) =>
        //     (event.title +  ' ' +property.address +  ' ' + property.city + ' ' + property.description).toUpperCase().indexOf(key) > -1));
        return this.events.filter(function (event) {
            return event.title.toUpperCase().indexOf(key) > -1;
        });
    };
    EventsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__["a" /* File */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__["a" /* File */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["a" /* HttpClient */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_9__ionic_native_geolocation__["a" /* Geolocation */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__ionic_native_geolocation__["a" /* Geolocation */]) === "function" && _d || Object])
    ], EventsService);
    return EventsService;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=events.js.map

/***/ }),

/***/ 595:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_map_map__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_signin_signin__ = __webpack_require__(445);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_welcome_welcome__ = __webpack_require__(447);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_event_list_event_list__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_profile_profile__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_storage__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, alertCtrl, storage, toastCtrl) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.toastCtrl = toastCtrl;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_signin_signin__["a" /* SigninPage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_4__pages_map_map__["a" /* MapPage */], icon: 'star' },
            { title: 'Help Wanted', component: __WEBPACK_IMPORTED_MODULE_7__pages_event_list_event_list__["a" /* EventListPage */], icon: 'star' },
            { title: 'My Account', component: __WEBPACK_IMPORTED_MODULE_8__pages_profile_profile__["a" /* ProfilePage */], icon: 'star' },
            { title: 'About', component: __WEBPACK_IMPORTED_MODULE_6__pages_welcome_welcome__["a" /* WelcomePage */], icon: 'star' } /*,
            {title: 'Logout', component: SigninPage, icon: 'star'}*/
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleLightContent();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.presentLogout = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm Log Out',
            message: 'Are you sure you want to log out?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Log Out',
                    handler: function () {
                        _this.storage.remove('originalToken').then(function () {
                            console.log('Original token has been removed.');
                            _this.storage.get('currentToken').then(function (val) { console.log('CONFIRMING: Your current token is', val); });
                        });
                        _this.storage.remove('currentToken').then(function () {
                            console.log('Current token has been removed.');
                            _this.storage.get('originalToken').then(function (val) { console.log('CONFIRMING: Your original token is', val); });
                        });
                        var logoutToast = _this.toastCtrl.create({
                            message: 'You have been logged out.',
                            duration: 2500
                        });
                        logoutToast.present();
                        _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_signin_signin__["a" /* SigninPage */]);
                        console.log('Logged out');
                    }
                }
            ]
        });
        alert.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"D:\git\iot_frontend\src\app\app.html"*/'<ion-menu [content]="content">\n\n  <ion-header>\n\n    <ion-toolbar>\n\n      <ion-title>Menu</ion-title>\n\n    </ion-toolbar>\n\n  </ion-header>\n\n\n\n  <ion-content>\n\n    <img src="assets/img/hands.jpg" class="menu-logo"/>\n\n    <ion-list>\n\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n\n        {{p.title}}\n\n      </button>\n\n      <button menuClose ion-item (click)="presentLogout()">Logout</button>\n\n    </ion-list>\n\n  </ion-content>\n\n\n\n</ion-menu>\n\n\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"D:\git\iot_frontend\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_9__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 596:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Location; });
var Location = (function () {
    function Location(lat, lng) {
        this.lat = lat;
        this.lng = lng;
    }
    return Location;
}());

//# sourceMappingURL=location.js.map

/***/ }),

/***/ 872:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsernameValidator; });
var UsernameValidator = (function () {
    function UsernameValidator() {
    }
    UsernameValidator.checkUsername = function (control) {
        return new Promise(function (resolve) {
            //Fake a slow response from server
            setTimeout(function () {
                if (control.value.toLowerCase() === "greg") {
                    resolve({
                        "username taken": true
                    });
                }
                else {
                    resolve(null);
                }
            }, 2000);
        });
    };
    return UsernameValidator;
}());

//# sourceMappingURL=username.js.map

/***/ }),

/***/ 873:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__add_event_add_event__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_events__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__event_event__ = __webpack_require__(107);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HomePage = (function () {
    function HomePage(modalCtrl, eventsService, nav) {
        this.modalCtrl = modalCtrl;
        this.eventsService = eventsService;
        this.nav = nav;
        this.addEventPage = __WEBPACK_IMPORTED_MODULE_2__add_event_add_event__["a" /* AddEventPage */];
        this.events = [];
    }
    HomePage.prototype.ngOnInit = function () {
        var _this = this;
        this.eventsService.fetchEvents()
            .subscribe(function (events) { return _this.events = events; });
    };
    HomePage.prototype.ionViewWillEnter = function () {
        this.events = this.eventsService.loadEvents();
    };
    HomePage.prototype.onOpenEvent = function (event, index) {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__event_event__["a" /* EventPage */], { event: event, index: index });
        modal.present();
        modal.onDidDismiss(function () {
            _this.events = _this.eventsService.loadEvents();
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-home',template:/*ion-inline-start:"D:\git\iot_frontend\src\pages\home\home.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-buttons end>\n\n      <button ion-button icon-only [navPush]="addEventPage">\n\n        <ion-icon name="add"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    <ion-title>\n\n      Helping Hands\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <ion-card *ngFor="let event of events; let i = index" (click)="onOpenEvent(event, i)">\n\n    <img [src]="event.imageUrl">\n\n    <ion-card-content text-center>\n\n      <ion-card-title>\n\n        {{ event.title }}\n\n      </ion-card-title>\n\n      <p>{{ event.description }}</p>\n\n    </ion-card-content>\n\n  </ion-card>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\git\iot_frontend\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3__services_events__["a" /* EventsService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 874:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CameraPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_camera__ = __webpack_require__(98);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CameraPage = (function () {
    function CameraPage(camera) {
        this.camera = camera;
    }
    CameraPage.prototype.takePicture = function (type) {
        var _this = this;
        this.photoType = type;
        this.camera.getPicture({
            sourceType: this.camera.PictureSourceType.CAMERA,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            //      targetWidth: 1000,
            //      targetHeight: 1000
            correctOrientation: true
        }).then(function (imageData) {
            // imageData is a base64 encoded string
            if (_this.photoType == "selfie") {
                _this.selfiePhoto = "data:image/jpeg;base64," + imageData;
            }
            else {
                _this.idPhoto = "data:image/jpeg;base64," + imageData;
            }
        }, function (err) {
            console.log(err);
        });
    };
    CameraPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-camera',template:/*ion-inline-start:"D:\git\iot_frontend\src\pages\camera\camera.html"*/'\n\n<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>\n\n      Ionic Camera\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="home">\n\n  <ion-card>\n\n     <ion-card-content>\n\n       Selfie\n\n       <img [src]="selfiePhoto" *ngIf="selfiePhoto" />\n\n       <p><button ion-button (click)="takePicture(\'selfie\')">Take a Picture</button></p>\n\n     </ion-card-content>\n\n   </ion-card>\n\n   <ion-card>\n\n     <ion-card-content>\n\n       ID Photo\n\n       <img [src]="idPhoto" *ngIf="idPhoto" />\n\n       <p><button ion-button (click)="takePicture(\'license\')">Take a Picture</button></p>\n\n     </ion-card-content>\n\n   </ion-card>\n\n</ion-content>'/*ion-inline-end:"D:\git\iot_frontend\src\pages\camera\camera.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_camera__["a" /* Camera */]])
    ], CameraPage);
    return CameraPage;
}());

//# sourceMappingURL=camera.js.map

/***/ }),

/***/ 875:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mock_profiles__ = __webpack_require__(876);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var ProfileService = (function () {
    function ProfileService() {
    }
    ProfileService.prototype.findAll = function () {
        return Promise.resolve(__WEBPACK_IMPORTED_MODULE_1__mock_profiles__["a" /* default */]);
    };
    ProfileService.prototype.findById = function (id) {
        return Promise.resolve(__WEBPACK_IMPORTED_MODULE_1__mock_profiles__["a" /* default */][id - 1]);
    };
    ProfileService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], ProfileService);
    return ProfileService;
}());

//# sourceMappingURL=profile-service-mock.js.map

/***/ }),

/***/ 876:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var profiles = [
    {
        id: 1,
        name: "Olivia Wu",
        title: "Retired Accountant",
        phone: "412-244-3672",
        mobilePhone: "412-244-3672",
        email: "oliviawu@gmail.com",
        picture: "https://i2.wp.com/abingtoncaregivers.com/wp-content/uploads/2015/01/old-asian-woman.jpg?ssl=1"
    },
    {
        id: 2,
        name: "Albert Gonzalez",
        title: "Retired veteran",
        phone: "412-244-3678",
        mobilePhone: "412-244-3678",
        email: "albertg@gmail.com",
        picture: "https://img.apmcdn.org/3f3231287c5eeda801a54564c22955379dbec0f2/uncropped/569793-20160927-ove03.jpg"
    },
];
/* harmony default export */ __webpack_exports__["a"] = (profiles);
//# sourceMappingURL=mock-profiles.js.map

/***/ }),

/***/ 877:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var DataProvider = (function () {
    function DataProvider(http) {
        this.http = http;
        console.log('Hello DataProvider Provider');
    }
    DataProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], DataProvider);
    return DataProvider;
}());

//# sourceMappingURL=data.js.map

/***/ })

},[448]);
//# sourceMappingURL=main.js.map