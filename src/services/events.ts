import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { File } from "@ionic-native/file";
import 'rxjs/add/operator/map';

import { Event } from "../models/event";
import { Location } from "../models/location";

declare var cordova: any;

@Injectable()
export class EventsService {
  private events: Event[] = [];

  constructor(private storage: Storage, private file: File) {}

  addEvent(title: string,
           description: string,
           location: Location,
           imageUrl: string) {
    const event = new Event(title, description, location, imageUrl);
    this.events.push(event);
    this.storage.set('events', this.events)
      .then()
      .catch(
        err => {
          this.events.splice(this.events.indexOf(event), 1);
        }
      );
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
          this.addEvent(event.title, event.description, event.location, event.imageUrl);
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
