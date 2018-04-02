import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import {CustomFormsModule} from 'ng2-validation';
import { AgmCoreModule } from "@agm/core";
import { HttpClientModule } from '@angular/common/http';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
import { Geolocation } from '@ionic-native/geolocation';
import { MapPage as MapPage, ModalContentPage } from '../pages/map/map';
import { SignupPage } from '../pages/signup/signup';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { CameraPage } from '../pages/camera/camera';
import { AddPlacePage } from '../pages/add-place/add-place';
import { PlacePage } from '../pages/place/place';
import { SetLocationPage } from '../pages/set-location/set-location';

import { PlacesService } from "../services/places";

import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SigninPage,
    MapPage,
    ModalContentPage,
    SignupPage,
    CameraPage,
    AddPlacePage,
    PlacePage,
    SetLocationPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    CustomFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC1DqPR9cC4gZEEHXqGr32qXOFFcAdOCkM'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SigninPage,
    MapPage,
    ModalContentPage,
    SignupPage,
    CameraPage,
    AddPlacePage,
    PlacePage,
    SetLocationPage
  ],
  providers: [
    File,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    Camera,
    PlacesService
  ]
})
export class AppModule {}
