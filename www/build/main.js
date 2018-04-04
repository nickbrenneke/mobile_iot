webpackJsonp([0],{

/***/ 144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__add_event_add_event__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_events__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__event_event__ = __webpack_require__(73);
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
        this.eventsService.fetchEvents()
            .then(function (events) { return _this.events = events; });
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
            selector: 'page-map',template:/*ion-inline-start:"/Users/aoranw/mobile_iot/src/pages/map/map.html"*/'<ion-header>\n<ion-navbar>\n    <ion-title>\n    Requests Nearby\n    </ion-title>\n      <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-buttons end>\n      <button ion-button icon-only [navPush]="addEventPage">\n      <ion-icon name="add"></ion-icon>\n    </button>\n        </ion-buttons>\n</ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n<div #map id="map"></div> \n\n<!-- <div style="width : 100% ;height: 60%">\n  <ion-list>\n    <ion-list-header>\n      Open Events\n    </ion-list-header>\n    <a ion-item (click)="openModal({eventNum: 0})">\n      Raking\n    </a>\n    <a ion-item (click)="openModal({eventNum: 1})">\n      Putting Away Groceries\n    </a>\n    <a ion-item (click)="openModal({eventNum: 2})">\n      Fixing Fence\n    </a>\n  </ion-list>\n</div> -->\n\n<ion-card *ngFor="let event of events; let i = index" (click)="onOpenEvent(event, i)">\n  <ion-card-content text-center>\n    <ion-card-title>\n      {{ event.title }}\n    </ion-card-title>\n    <p>{{ event.description }}</p>\n  </ion-card-content>\n</ion-card>\n\n</ion-content>'/*ion-inline-end:"/Users/aoranw/mobile_iot/src/pages/map/map.html"*/
        })
        /*
        Class name: MapPage
        Description: This class contains the functions and components to render the Google Maps view of events.
        */
        ,
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* ModalController */],
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

/***/ 145:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddEventPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__set_location_set_location__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_events__ = __webpack_require__(39);
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
        this.selectOptions = ['<15mins', '15-30mins', '>30mins'];
        this.location = {
            lat: 40.443646,
            lng: -79.944697
        };
        this.locationIsSet = false;
        this.imageUrl = '';
    }
    AddEventPage.prototype.onSubmit = function (form) {
        this.eventsService
            .addEvent(form.value.title, form.value.description, this.location, this.imageUrl);
        form.reset();
        this.location = {
            lat: 40.7624324,
            lng: -73.9759827
        };
        this.imageUrl = '';
        this.locationIsSet = false;
    };
    AddEventPage.prototype.onOpenMap = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__set_location_set_location__["a" /* SetLocationPage */], { location: this.location, isSet: this.locationIsSet });
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
            selector: 'page-add-event',template:/*ion-inline-start:"/Users/aoranw/mobile_iot/src/pages/add-event/add-event.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>New Request</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <form #f="ngForm" (ngSubmit)="onSubmit(f)">\n    <ion-list>\n      <ion-item>\n        <ion-label fixed>Title</ion-label>\n        <ion-input\n          type="text"\n          placeholder="Moving stuff..."\n          name="title"\n          ngModel\n          required></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>Short Description</ion-label>\n        <ion-textarea\n          name="description"\n          ngModel\n          required></ion-textarea>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>Estimated Time</ion-label>\n        <ion-select>\n          <ion-option\n            *ngFor="let option of selectOptions"\n            [value]="option">{{ option }}\n          </ion-option>\n        </ion-select>\n      </ion-item>\n      <ion-item>\n        <ion-label>Valid Until</ion-label>\n        <ion-datetime displayFormat="MMM D hh:mm A" pickerFormat="MMM D hh mm A"></ion-datetime>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>Reward</ion-label>\n        <ion-textarea\n          name="reward"\n          ngModel\n          required></ion-textarea>\n      </ion-item>\n    </ion-list>\n    <ion-grid>\n      <ion-row>\n        <ion-col>\n          <button\n            ion-button\n            block\n            outline\n            type="button"\n            icon-left\n            (click)="onLocate()">\n            <ion-icon name="locate"></ion-icon>\n            Locate me\n          </button>\n        </ion-col>\n        <ion-col>\n          <button\n            ion-button\n            block\n            outline\n            type="button"\n            icon-left\n            (click)="onOpenMap()">\n            <ion-icon name="map"></ion-icon>\n            Select on Map\n          </button>\n        </ion-col>\n      </ion-row>\n      <ion-row *ngIf="locationIsSet">\n        <ion-col>\n          <agm-map\n            [latitude]="location.lat"\n            [longitude]="location.lng"\n            [zoom]="16"\n            [zoomControl]="false"\n            [streetViewControl]="false">\n            <agm-marker\n              [latitude]="location.lat"\n              [longitude]="location.lng"></agm-marker>\n          </agm-map>\n        </ion-col>\n      </ion-row>   \n      <ion-row>\n        <ion-col>\n          <button\n            ion-button\n            color="secondary"\n            block\n            type="submit"\n            [disabled]="!f.valid || !locationIsSet"\n            (click)="popToRoot()">\n            Post\n          </button>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </form>\n</ion-content>'/*ion-inline-end:"/Users/aoranw/mobile_iot/src/pages/add-event/add-event.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_6__services_events__["a" /* EventsService */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]])
    ], AddEventPage);
    return AddEventPage;
}());

//# sourceMappingURL=add-event.js.map

/***/ }),

/***/ 157:
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
webpackEmptyAsyncContext.id = 157;

/***/ }),

/***/ 198:
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
webpackEmptyAsyncContext.id = 198;

/***/ }),

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SetLocationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_location__ = __webpack_require__(469);
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
            selector: 'page-set-location',template:/*ion-inline-start:"/Users/aoranw/mobile_iot/src/pages/set-location/set-location.html"*/'\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Choose Location</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-grid>\n    <ion-row>\n      <ion-col>\n        <agm-map\n          [latitude]="location.lat"\n          [longitude]="location.lng"\n          [zoom]="16"\n          [zoomControl]="false"\n          [streetViewControl]="false"\n          (mapClick)="onSetMarker($event)">\n          <agm-marker\n            [latitude]="marker.lat"\n            [longitude]="marker.lng"\n            *ngIf="marker"></agm-marker>\n        </agm-map>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>\n        <button\n          ion-button\n          block\n          color="secondary"\n          (click)="onConfirm()"\n          [disabled]="!marker">Confirm</button>\n      </ion-col>\n      <ion-col>\n        <button\n          ion-button\n          block\n          color="danger"\n          (click)="onAbort()">Abort</button>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/Users/aoranw/mobile_iot/src/pages/set-location/set-location.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */]])
    ], SetLocationPage);
    return SetLocationPage;
}());

//# sourceMappingURL=set-location.js.map

/***/ }),

/***/ 292:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SigninPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__signup_signup__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__map_map__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(472);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(69);
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
    function SigninPage(nav, http, storage) {
        this.nav = nav;
        this.http = http;
        this.storage = storage;
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
        this.authenticate();
        /*this.storage.get('currentToken').then((val) => {
        console.log('Your token is', val);*/
        this.storage.get('currentToken').then(function (val) {
            console.log('Your stored token is', val);
            _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__map_map__["a" /* MapPage */]);
        });
        this.storage.get('orig_iat').then(function (val) {
            console.log('Your original token is', val);
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
            .subscribe(function (data) {
            //console.log("PRINTED IN SUBSCIRBE:    " + data["_body"]);
            var parsed = JSON.parse(data["_body"]);
            _this.token = parsed["token"];
            _this.storage.set('currentToken', _this.token);
            //this.nav.setRoot(HomePage);
        }, function (error) {
            console.log(error["_body"]); // Error getting the data
        });
    };
    SigninPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/aoranw/mobile_iot/src/pages/signin/signin.html"*/'\n<ion-header>\n  <ion-navbar>\n    <ion-title>Sign In</ion-title>\n    <!--button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button-->\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n\n    <ion-item>\n      <ion-label floating>Username</ion-label>\n      <ion-input [(ngModel)]="username" type="text" value=""></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Password</ion-label>\n      <ion-input [(ngModel)]="password" type="password" value=""></ion-input>\n    </ion-item>\n\n  </ion-list>\n\n  <div padding>\n    <button ion-button color="primary" (click)="login()" block>Sign In</button>\n  </div>\n  \n    <div padding>\n    <button ion-button color="primary" (click)="openRegistration()" block>Register</button>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/aoranw/mobile_iot/src/pages/signin/signin.html"*/
        })
        /*
        class name: SigninPage
        Description: This class contains related to the sign in page and functionality.
        */
        ,
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */]])
    ], SigninPage);
    return SigninPage;
}());

//# sourceMappingURL=signin.js.map

/***/ }),

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_camera__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__validators_username__ = __webpack_require__(471);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(69);
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
    function SignupPage(navCtrl, formBuilder, http, camera, storage) {
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.http = http;
        this.camera = camera;
        this.storage = storage;
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
            _this.storage.set('orig_iat', _this.token);
        }, function (error) {
            console.log("AN ERROR OCCURED!" + error.error); // Error getting the data
        });
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
            selector: 'page-signup',template:/*ion-inline-start:"/Users/aoranw/mobile_iot/src/pages/signup/signup.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>\n      Sign Up\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n \n<ion-content>\n<ion-slides #signupSlider pager>\n  <ion-slide>\n    <p *ngIf="submitAttempt" style="color: #ea6153;">Please fill out all details accurately.</p>\n    <ion-list no-lines>\n        <form enctype=\'application/json\'[formGroup]="slideOneForm">\n            <ion-item>\n                <ion-label floating>First Name</ion-label>\n                <ion-input formControlName="firstName" type="text" [class.invalid]="!slideOneForm.controls.firstName.valid && (slideOneForm.controls.firstName.dirty || submitAttempt)"></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label floating>Last Name</ion-label>\n                <ion-input formControlName="lastName" type="text" [class.invalid]="!slideOneForm.controls.lastName.valid && (slideOneForm.controls.lastName.dirty || submitAttempt)"></ion-input>\n            </ion-item>\n            <ion-item>\n            <ion-label floating>Username</ion-label>\n              <ion-input [class.invalid]="!slideOneForm.controls.username.valid && (slideOneForm.controls.username.dirty || submitAttempt)" formControlName="username" type="text"></ion-input>\n            </ion-item>\n            <ion-item *ngIf="slideOneForm.controls.username.pending">\n                <p>Checking username...</p>\n            </ion-item>\n            <ion-item *ngIf="!slideOneForm.controls.username.valid && !slideOneForm.controls.username.pending && (slideOneForm.controls.username.dirty || submitAttempt)">\n                <p>Sorry, that username can not be used!</p>\n            </ion-item>\n            <ion-item *ngIf="!slideOneForm.controls.firstName.valid  && (slideOneForm.controls.firstName.dirty || submitAttempt)">\n                <p>Please enter a valid first name.</p>\n            </ion-item>\n            <ion-item *ngIf="!slideOneForm.controls.lastName.valid  && (slideOneForm.controls.lastName.dirty || submitAttempt)">\n                <p>Please enter a valid last name.</p>\n            </ion-item>\n            <ion-item>\n                <ion-label floating>Email Address</ion-label>\n                <ion-input formControlName="email" type="email" [class.invalid]="submitAttempt"></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label floating>Password</ion-label>\n                <ion-input formControlName="enterPassword" type="password" [class.invalid]="submitAttempt"></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label floating>Confirm Password</ion-label>\n                <ion-input formControlName="confirmPassword" type="password" [class.invalid]="submitAttempt"></ion-input>\n            </ion-item>\n        </form>\n  </ion-list>\n    <div padding>\n      <button ion-button color="primary" (click)="next()" block>Next</button>\n      </div>\n  </ion-slide>\n  <ion-slide>\n     <form enctype=\'application/json\' [formGroup]="slideTwoForm">\n       <div class="col col-33">\n            <img [src]="selfiePhoto" class="full-image" *ngIf="selfiePhoto" />\n      </div>\n       Selfie\n       <p><button ion-button (click)="takePicture(\'selfie\')">Take a Picture</button></p>\n    <div class="col col-33">\n          <img [src]="idPhoto" class="full-image" *ngIf="idPhoto" />\n          </div>\n       ID Photo\n       <p><button ion-button (click)="takePicture(\'license\')">Take a Picture</button></p>\n        </form>\n      <div padding>\n    <button ion-button color="primary" (click)="prev()" block>Previous</button>\n    </div>\n      <div padding>\n    <button ion-button color="primary" (click)="save()" block>Create Account</button>\n    </div>\n  </ion-slide>\n</ion-slides>\n</ion-content>'/*ion-inline-end:"/Users/aoranw/mobile_iot/src/pages/signup/signup.html"*/
        })
        /*
        Class name: SignupPage
        Description: This page contains the functionality for a user to register/sign up for our platform.
          */
        ,
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"], __WEBPACK_IMPORTED_MODULE_5__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 294:
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
            selector: 'page-welcome',template:/*ion-inline-start:"/Users/aoranw/mobile_iot/src/pages/welcome/welcome.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>Helping Hands</ion-title>\n\n    </ion-navbar>\n</ion-header>\n\n<ion-content no-bounce>\n    <ion-slides>\n\n        <ion-slide style="background-image: url(\'assets/img/community1.png\')">\n            <p>Receive help or help your community right start from here!</p>\n        </ion-slide>\n        \n    </ion-slides>\n\n</ion-content>'/*ion-inline-end:"/Users/aoranw/mobile_iot/src/pages/welcome/welcome.html"*/
        })
    ], WelcomePage);
    return WelcomePage;
}());

//# sourceMappingURL=welcome.js.map

/***/ }),

/***/ 295:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_events__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__event_event__ = __webpack_require__(73);
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
    function EventListPage(modalCtrl, eventsService) {
        this.modalCtrl = modalCtrl;
        this.eventsService = eventsService;
        this.events = [];
    }
    EventListPage.prototype.ngOnInit = function () {
        var _this = this;
        this.eventsService.fetchEvents()
            .then(function (events) { return _this.events = events; });
    };
    EventListPage.prototype.ionViewWillEnter = function () {
        this.events = this.eventsService.loadEvents();
    };
    EventListPage.prototype.onOpenEvent = function (event, index) {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__event_event__["a" /* EventPage */], { event: event, index: index });
        modal.present();
        modal.onDidDismiss(function () {
            _this.events = _this.eventsService.loadEvents();
        });
    };
    EventListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-event-list',template:/*ion-inline-start:"/Users/aoranw/mobile_iot/src/pages/event-list/event-list.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-searchbar [(ngModel)]="searchKey" (ionInput)="onInput($event)"\n                       (ionCancel)="onCancel($event)"></ion-searchbar>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-card *ngFor="let event of events; let i = index" (click)="onOpenEvent(event, i)">\n    <img [src]="event.imageUrl">\n    <ion-card-content text-center>\n      <ion-card-title>\n        {{ event.title }}\n      </ion-card-title>\n      <p>{{ event.description }}</p>\n    </ion-card-content>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/aoranw/mobile_iot/src/pages/event-list/event-list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_2__services_events__["a" /* EventsService */]])
    ], EventListPage);
    return EventListPage;
}());

//# sourceMappingURL=event-list.js.map

/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_profile_service_mock__ = __webpack_require__(297);
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
    function ProfilePage(navCtrl, navParams, service) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.profile = this.navParams.data;
        service.findById(this.profile.id).then(function (profile) { return _this.profile = profile; });
    }
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-profile',template:/*ion-inline-start:"/Users/aoranw/mobile_iot/src/pages/profile/profile.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>My Account</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content class="account">\n\n<!--     <ion-card>\n\n        <ion-card-content>\n            <img src="{{profile.picture}}"/>\n            <h2>{{profile.name}}</h2>\n            <h3>{{profile.title}}</h3>\n        </ion-card-content>\n\n        <ion-list>\n            <a href="tel:{{profile.Phone__c}}" ion-item>\n                <ion-icon name="call" item-left></ion-icon>\n                <p>Call Office</p>\n                <h2>{{profile.phone}}</h2>\n            </a>\n            <a href="tel:{{profile.phone}}" ion-item>\n                <ion-icon name="call" item-left></ion-icon>\n                <p>Call Mobile</p>\n                <h2>{{profile.mobilePhone}}</h2>\n            </a>\n            <a href="tel:{{profile.phone}}" ion-item>\n                <ion-icon name="text" item-left></ion-icon>\n                <p>Text</p>\n                <h2>{{profile.mobilePhone}}</h2>\n            </a>\n            <a href="mailto:{{profile.email}}" ion-item>\n                <ion-icon name="mail" item-left></ion-icon>\n                <p>Email</p>\n                <h2>{{profile.email}}</h2>\n            </a>\n        </ion-list>\n\n    </ion-card> -->\n\n    <ion-card>\n\n        <ion-card-content>\n            <img src="https://i2.wp.com/abingtoncaregivers.com/wp-content/uploads/2015/01/old-asian-woman.jpg?ssl=1"/>\n            <h2>Olivia Wu</h2>\n            <h3>Retired Accountant</h3>\n        </ion-card-content>\n\n        <ion-list>\n<!--             <a href="tel:{{profile.Phone__c}}" ion-item>\n                <ion-icon name="call" item-left></ion-icon>\n                <p>Call Office</p>\n                <h2>{{profile.phone}}</h2>\n            </a> -->\n            <a ion-item>\n                <ion-icon name="call" item-left></ion-icon>\n                <p>Call Mobile</p>\n                <h2>412-244-3672</h2>\n            </a>\n<!--             <a href="tel:{{profile.phone}}" ion-item>\n                <ion-icon name="text" item-left></ion-icon>\n                <p>Text</p>\n                <h2>{{profile.mobilePhone}}</h2>\n            </a> -->\n            <a ion-item>\n                <ion-icon name="mail" item-left></ion-icon>\n                <p>Email</p>\n                <h2>oliviawu@gmail.com</h2>\n            </a>\n        </ion-list>\n\n    </ion-card>\n\n</ion-content>\n'/*ion-inline-end:"/Users/aoranw/mobile_iot/src/pages/profile/profile.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__services_profile_service_mock__["a" /* ProfileService */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 297:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mock_profiles__ = __webpack_require__(473);
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

/***/ 298:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(320);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 320:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_validation__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_validation___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_ng2_validation__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_geolocation__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__agm_core__ = __webpack_require__(463);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_camera__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_component__ = __webpack_require__(468);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_home_home__ = __webpack_require__(474);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_signin_signin__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_signup_signup__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_map_map__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_camera_camera__ = __webpack_require__(475);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_welcome_welcome__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_add_event_add_event__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_event_event__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_set_location_set_location__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_event_list_event_list__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_profile_profile__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__services_events__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__services_profile_service_mock__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__providers_data_data__ = __webpack_require__(476);
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
                __WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_18__pages_welcome_welcome__["a" /* WelcomePage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_signin_signin__["a" /* SigninPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_map_map__["a" /* MapPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_camera_camera__["a" /* CameraPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_add_event_add_event__["a" /* AddEventPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_event_event__["a" /* EventPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_set_location_set_location__["a" /* SetLocationPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_event_list_event_list__["a" /* EventListPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_profile_profile__["a" /* ProfilePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_5__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_7_ng2_validation__["CustomFormsModule"],
                __WEBPACK_IMPORTED_MODULE_10__agm_core__["a" /* AgmCoreModule */].forRoot({
                    apiKey: 'AIzaSyC1DqPR9cC4gZEEHXqGr32qXOFFcAdOCkM'
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_13__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_signin_signin__["a" /* SigninPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_map_map__["a" /* MapPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_camera_camera__["a" /* CameraPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_event_list_event_list__["a" /* EventListPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_set_location_set_location__["a" /* SetLocationPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_event_event__["a" /* EventPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_add_event_add_event__["a" /* AddEventPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_welcome_welcome__["a" /* WelcomePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_24__services_events__["a" /* EventsService */],
                __WEBPACK_IMPORTED_MODULE_25__services_profile_service_mock__["a" /* ProfileService */],
                __WEBPACK_IMPORTED_MODULE_26__providers_data_data__["a" /* DataProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 39:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_event__ = __webpack_require__(470);
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
    function EventsService(storage, file) {
        this.storage = storage;
        this.file = file;
        this.events = [];
    }
    EventsService.prototype.addEvent = function (title, description, location, imageUrl) {
        var _this = this;
        var event = new __WEBPACK_IMPORTED_MODULE_3__models_event__["a" /* Event */](title, description, location, imageUrl);
        this.events.push(event);
        this.storage.set('events', this.events)
            .then()
            .catch(function (err) {
            _this.events.splice(_this.events.indexOf(event), 1);
        });
    };
    EventsService.prototype.loadEvents = function () {
        return this.events.slice();
    };
    EventsService.prototype.fetchEvents = function () {
        var _this = this;
        return this.storage.get('events')
            .then(function (events) {
            _this.events = events != null ? events : [];
            return _this.events;
        })
            .catch(function (err) { return console.log(err); });
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
        var _this = this;
        var currentName = event.imageUrl.replace(/^.*[\\\/]/, '');
        this.file.removeFile(cordova.file.dataDirectory, currentName)
            .then(function () { return console.log('Removed File'); })
            .catch(function () {
            console.log('Error while removing File');
            _this.addEvent(event.title, event.description, event.location, event.imageUrl);
        });
    };
    EventsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__["a" /* File */]])
    ], EventsService);
    return EventsService;
}());

//# sourceMappingURL=events.js.map

/***/ }),

/***/ 468:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_map_map__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_signin_signin__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_welcome_welcome__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_event_list_event_list__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_profile_profile__ = __webpack_require__(296);
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
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_signin_signin__["a" /* SigninPage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_4__pages_map_map__["a" /* MapPage */], icon: 'star' },
            { title: 'Help Wanted', component: __WEBPACK_IMPORTED_MODULE_7__pages_event_list_event_list__["a" /* EventListPage */], icon: 'star' },
            { title: 'My Account', component: __WEBPACK_IMPORTED_MODULE_8__pages_profile_profile__["a" /* ProfilePage */], icon: 'star' },
            { title: 'About', component: __WEBPACK_IMPORTED_MODULE_6__pages_welcome_welcome__["a" /* WelcomePage */], icon: 'star' },
            { title: 'Logout', component: __WEBPACK_IMPORTED_MODULE_5__pages_signin_signin__["a" /* SigninPage */], icon: 'star' }
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
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/aoranw/mobile_iot/src/app/app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <img src="assets/img/hands.jpg" class="menu-logo"/>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/Users/aoranw/mobile_iot/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 469:
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

/***/ 470:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Event; });
var Event = (function () {
    function Event(title, description, location, imageUrl) {
        this.title = title;
        this.description = description;
        this.location = location;
        this.imageUrl = imageUrl;
    }
    return Event;
}());

//# sourceMappingURL=event.js.map

/***/ }),

/***/ 471:
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

/***/ 473:
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

/***/ 474:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__add_event_add_event__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_events__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__event_event__ = __webpack_require__(73);
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
            .then(function (events) { return _this.events = events; });
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
            selector: 'page-home',template:/*ion-inline-start:"/Users/aoranw/mobile_iot/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-buttons end>\n      <button ion-button icon-only [navPush]="addEventPage">\n        <ion-icon name="add"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>\n      Helping Hands\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-card *ngFor="let event of events; let i = index" (click)="onOpenEvent(event, i)">\n    <img [src]="event.imageUrl">\n    <ion-card-content text-center>\n      <ion-card-title>\n        {{ event.title }}\n      </ion-card-title>\n      <p>{{ event.description }}</p>\n    </ion-card-content>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/aoranw/mobile_iot/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3__services_events__["a" /* EventsService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 475:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CameraPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_camera__ = __webpack_require__(72);
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
            selector: 'page-camera',template:/*ion-inline-start:"/Users/aoranw/mobile_iot/src/pages/camera/camera.html"*/'\n<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Ionic Camera\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="home">\n  <ion-card>\n     <ion-card-content>\n       Selfie\n       <img [src]="selfiePhoto" *ngIf="selfiePhoto" />\n       <p><button ion-button (click)="takePicture(\'selfie\')">Take a Picture</button></p>\n     </ion-card-content>\n   </ion-card>\n   <ion-card>\n     <ion-card-content>\n       ID Photo\n       <img [src]="idPhoto" *ngIf="idPhoto" />\n       <p><button ion-button (click)="takePicture(\'license\')">Take a Picture</button></p>\n     </ion-card-content>\n   </ion-card>\n</ion-content>'/*ion-inline-end:"/Users/aoranw/mobile_iot/src/pages/camera/camera.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_camera__["a" /* Camera */]])
    ], CameraPage);
    return CameraPage;
}());

//# sourceMappingURL=camera.js.map

/***/ }),

/***/ 476:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(477);
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

/***/ }),

/***/ 73:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_events__ = __webpack_require__(39);
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
            selector: 'page-event',template:/*ion-inline-start:"/Users/aoranw/mobile_iot/src/pages/event/event.html"*/'\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{ event.title }}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-grid>\n    <ion-row>\n      <ion-col text-center>\n        <img [src]="event.imageUrl">\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>\n        <p>{{ event.description }}</p>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>\n        <agm-map\n          [latitude]="event.location.lat"\n          [longitude]="event.location.lng"\n          [zoom]="16">\n          <agm-marker\n            [latitude]="event.location.lat"\n            [longitude]="event.location.lng"></agm-marker>\n        </agm-map>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>\n        <button\n          ion-button\n          block\n          (click)="onLeave()">Leave</button>\n      </ion-col>\n      <ion-col>\n        <button\n          ion-button\n          block\n          color="danger"\n          (click)="onDelete()">Delete</button>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/Users/aoranw/mobile_iot/src/pages/event/event.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__services_events__["a" /* EventsService */]])
    ], EventPage);
    return EventPage;
}());

//# sourceMappingURL=event.js.map

/***/ })

},[298]);
//# sourceMappingURL=main.js.map