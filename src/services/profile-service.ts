import {Injectable} from '@angular/core';
import profiles from './mock-profiles';

import { Storage } from "@ionic/storage";
import { File } from "@ionic-native/file";
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Profile } from "../models/profile";
import { Geolocation } from '@ionic-native/geolocation';
import { Location } from "../models/location";
import { backend_baseUrl } from '../constants/backend-constants';

declare var cordova: any;


@Injectable()
export class ProfileService {
  profile: Profile;

  constructor(private storage: Storage,
              private file: File,
              private httpClient: HttpClient) {}

  createAuthorizationHeader(token: string){
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", 'JWT '+token);
    headers = headers.set("Content-Type", 'application/json');

    console.log('get the token in header ' + token);
    console.log('headers', {headers});
    return headers;
  }
    
  
  fetchProfile(): Observable<Object> {
    console.log('fetch profile');
    
    return Observable.from(
      Promise.all([this.storage.get('currentToken')])
      .then( results =>{
          let token = results[0];
          let location = results[1];
          console.log(token, location);
          let headers = this.createAuthorizationHeader(token);
          return this.httpClient.get(backend_baseUrl + 'accounts/api/profile/', {headers})
            .map((profile) => {
              console.log('Profile loaded');

              return profile;
            }
            ,error => {
              console.log('failure invoke');
              console.log(error);// Error getting the data
            }).toPromise();
        }
      ));
  }

  fetchPublicProfile(id:number): Observable<Object> {
    console.log('fetch profile');
    
    return Observable.from(
      Promise.all([this.storage.get('currentToken')])
      .then( results =>{
          let token = results[0];
          let location = results[1];
          console.log(token, location);
          let headers = this.createAuthorizationHeader(token);
          return this.httpClient.get(backend_baseUrl + 'accounts/api/profile/'+id, {headers})
            .map((profile) => {
              console.log('Profile loaded');

              return profile;
            }
            ,error => {
              console.log('failure invoke');
              console.log(error);// Error getting the data
            }).toPromise();
        }
      ));
  }

  updateProfile(): Observable<Object> {
    console.log('fetch profile');
    
    return Observable.from(
      Promise.all([this.storage.get('currentToken')])
      .then( results =>{
          let token = results[0];
          let location = results[1];
          console.log(token, location);
          let headers = this.createAuthorizationHeader(token);
          return this.httpClient.get(backend_baseUrl + 'accounts/api/profile/', {headers})
            .map((profile) => {
              console.log('Profile loaded');

              return profile;
            }
            ,error => {
              console.log('failure invoke');
              console.log(error);// Error getting the data
            }).toPromise();
        }
      ));
  }
}
