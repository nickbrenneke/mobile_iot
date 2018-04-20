import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { File } from "@ionic-native/file";
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Event } from "../models/event";
import { Geolocation } from '@ionic-native/geolocation';
import { Location } from "../models/location";

declare var cordova: any;


@Injectable()
export class EventsService {
  private events: Event[] = [];
  baseUrl: string = "http://localhost:8000";

  location: Location = {
    lat: 40.443646,
    lng: -79.944697
  };

  constructor(private storage: Storage,
              private file: File,
              private httpClient: HttpClient,
              private geolocation: Geolocation) {}

  createAuthorizationHeader(){
    const headers = new HttpHeaders();
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Credentials", "true");
    headers.set("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    headers.set("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    headers.set("X-CustomHeader", "custom header value");
    //get auth token
    let token = 'JWT ' + this.storage.get('currentToken');
    //append auth token to headers
    headers.append("Authorization", token);

    return headers;
  }

  addEvent(event: Event): Observable<Event> {
    // const event = new Event(title, description, location, imageUrl);
    // this.events.push(event);
    // this.storage.set('events', this.events)
    //   .then()
    //   .catch(
    //     err => {
    //       this.events.splice(this.events.indexOf(event), 1);
    //     }
    //   );
    let options = {
      headers: this.createAuthorizationHeader()
    };

    return this.httpClient
      .post(this.baseUrl + '/we_help/events/created', event, options)
      .map(response => {
        return new Event(response);
      })
      .catch((error: any) => {
        return Observable.throw(error);
      });
  }

  loadEvents() {
    return this.events.slice();
  }

  //Mock-up code for showing event details
  fetchMapEvents() {
    return this.storage.get('events')
      .then(
        (events: Event[]) => {
          this.events = events != null ? events : [];
          return this.events;
        }
      )
      .catch(
        err => console.log(err)
      );    
  }

  fetchEvents(): Observable<Event[]> {
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
    let options = {
      headers: this.createAuthorizationHeader()
    };

    this.geolocation.getCurrentPosition()
      .then(
        location => {
          this.location.lat = location.coords.latitude;
          this.location.lng = location.coords.longitude;
        }
      );

    return this.httpClient
      // .get(this.baseUrl + '/we_help/events/?longitude=-79.95&latitude=40.45', options)
      .get(this.baseUrl + '/we_help/events/?longitude=lat&latitude=lng', options)
      .map((events: Event) => event)
      .catch((error: any) => Observable.throw(error));
  }

  deleteEvent(index: number) {
    const event = this.events[index];
    this.events.splice(index, 1);
    this.storage.set('events', this.events)
      .then(
        () => {
          this.removeFile(event);
        }
      )
      .catch(
        err => console.log(err)
      );
  }

  private removeFile(event: Event) {
    const currentName = event.imageUrl.replace(/^.*[\\\/]/, '');
    this.file.removeFile(cordova.file.dataDirectory, currentName)
      .then(
        () => console.log('Removed File')
      )
      .catch(
        () => {
          console.log('Error while removing File');
          // this.addEvent(event.title, event.description, event.location, event.imageUrl);
        }
      );
  }

  findByName(searchKey: string) {
    let key: string = searchKey.toUpperCase();
    // return Promise.resolve(Event.filter((event: any) =>
    //     (event.title +  ' ' +property.address +  ' ' + property.city + ' ' + property.description).toUpperCase().indexOf(key) > -1));
    return this.events.filter((event) => {
      return event.title.toUpperCase().indexOf(key) > -1;
    });
  }
}
