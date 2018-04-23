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
import { backend_baseUrl } from '../constants/backend-constants';


declare var cordova: any;


@Injectable()
export class EventsService {
  private events: Event[] = [];

  location: Location = {
    latitude: 40.443646,
    longitude: -79.944697
  };

  constructor(private storage: Storage,
              private file: File,
              private httpClient: HttpClient,
              private geolocation: Geolocation) {}

  createAuthorizationHeader(token: string){
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", 'JWT '+token);
    headers = headers.set("Content-Type", 'application/json');

    console.log('get the token in header ' + token);
    console.log('headers', {headers});
    return headers;
  }

  addEvent(event: Event): Observable<Event> {
    
    console.log('post event');
    
    return Observable.from(
      Promise.all([this.storage.get('currentToken')])
      .then( results =>{
          let token = results[0];
          let location = results[1];
          console.log(token, location);
          let headers = this.createAuthorizationHeader(token);
          return this.httpClient.post(backend_baseUrl + 'we_help/events/', JSON.stringify(event), {headers})
            .map((event: Event) => event
            ,error => {
              console.log('failure invoke');
              console.log(error);// Error getting the data
            }).toPromise();
        }
      ));

  }

  loadEvents() {
    return this.events.slice();
  }

  fetchEvents(): Observable<Event[]> {
    console.log('fetch event');
    
    return Observable.from(
      Promise.all([this.storage.get('currentToken'), this.geolocation.getCurrentPosition()])
      .then( results =>{
          let token = results[0];
          let location = results[1];
          console.log(token, location);
          let headers = this.createAuthorizationHeader(token);
          this.location.latitude = location.coords.latitude;
          this.location.longitude = location.coords.longitude;
          return this.httpClient.get(backend_baseUrl + 'we_help/events/?longitude='+this.location.longitude+'&latitude='+this.location.latitude, {headers})
            .map((events: Event[]) => {
              this.events = events;
              return events;
            }
            ,error => {
              console.log('failure invoke');
              console.log(error);// Error getting the data
            }).toPromise();
        }
      ));
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

  confirmEvent(index: number) {
    const event = this.events[index];
    console.log("Comfirm signup");
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
