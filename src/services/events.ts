import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { File } from "@ionic-native/file";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Event } from "../models/event";

declare var cordova: any;


@Injectable()
export class EventsService {
  private events: Event[] = [];
  baseUrl: string = "http://localhost:8000";

  constructor(private storage: Storage, 
              private file: File,
              private httpClient: HttpClient) {}

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
    return this.httpClient
      .post(this.baseUrl + '/we_help/events/created', event)
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

  fetchEvents() {
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
