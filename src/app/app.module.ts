import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { File } from '@ionic-native/file';
import {CustomFormsModule} from 'ng2-validation';
import { Storage, IonicStorageModule } from "@ionic/storage";
import { Geolocation } from '@ionic-native/geolocation';
import { AgmCoreModule } from "@agm/core";
import { Camera } from '@ionic-native/camera';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { MapPage } from '../pages/map/map';
import { CameraPage } from '../pages/camera/camera';
import { WelcomePage } from '../pages/welcome/welcome';
import { AddEventPage } from "../pages/add-event/add-event";
import { EventPage } from "../pages/event/event";
import { SetLocationPage } from "../pages/set-location/set-location";
import { EventListPage } from "../pages/event-list/event-list";
import { ProfilePage } from "../pages/profile/profile";

import { EventsService } from "../services/events";
import { ProfileService } from "../services/profile-service-mock";
import { DataProvider } from '../providers/data/data';

@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    HomePage,
    SigninPage,
    MapPage,
    SignupPage,
    CameraPage,
    AddEventPage,
    EventPage,
    SetLocationPage,
    EventListPage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
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
    SignupPage,
    CameraPage,
    ProfilePage,
    EventListPage,
    SetLocationPage,
    EventPage,
    AddEventPage,
    WelcomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpClientModule,
    Geolocation,
    Camera,
    File,
    InAppBrowser,
    EventsService,
    ProfileService,
    DataProvider
  ]
})
export class AppModule {}
