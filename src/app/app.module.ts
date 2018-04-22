import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from "@angular/common/http";
import { File } from '@ionic-native/file';
import { FormsModule } from "@angular/forms";
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
import { EventDetailPage } from "../pages/event-detail/event-detail";
import { HistoryPage } from "../pages/history/history";
import { ConfirmPage } from "../pages/confirm/confirm";

import { EventsService } from "../services/event-service";
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
    ProfilePage,
    EventDetailPage,
    HistoryPage,
    ConfirmPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    CustomFormsModule,
    FormsModule,
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
    WelcomePage,
    EventDetailPage,
    HistoryPage,
    ConfirmPage
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
