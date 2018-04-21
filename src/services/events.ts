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
    latitude: 40.443646,
    longitude: -79.944697
  };

  constructor(private storage: Storage,
              private file: File,
              private httpClient: HttpClient,
              private geolocation: Geolocation) {}

  createAuthorizationHeader(token: string){
    let headers = new HttpHeaders();
    // headers = headers.set("Access-Control-Allow-Origin", "*");
    // headers = headers.set("Access-Control-Allow-Credentials", "true");
    // headers = headers.set("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
      // .set("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")
    // headers = headers.set("X-CustomHeader", "custom header value");
      // .set("Authorization", token);
    //get auth token
    // let token = 'JWT ' + this.storage.get('currentToken');
    //append auth token to headers
    headers = headers.set("Authorization", 'JWT '+token);

    console.log('get the token in header ' + token);
    console.log('headers', {headers});
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
          return this.httpClient.get(this.baseUrl + '/we_help/events/?longitude='+this.location.longitude+'&latitude='+this.location.latitude, {headers})
            .map((events: Event[]) => events
            ,error => {
              console.log('failure invoke');
              console.log(error);// Error getting the data
            }).toPromise();
        }
      ));





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
