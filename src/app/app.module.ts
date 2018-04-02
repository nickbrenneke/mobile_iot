import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from "@angular/common/http";
import { File } from '@ionic-native/file';
import {CustomFormsModule} from 'ng2-validation';
import { Storage, IonicStorageModule } from "@ionic/storage";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
import { Geolocation } from '@ionic-native/geolocation';
import { MapPage as MapPage, ModalContentPage } from '../pages/map/map';
import { SignupPage } from '../pages/signup/signup';
import { Camera } from '@ionic-native/camera';
import { CameraPage } from '../pages/camera/camera';
import { WelcomePage } from '../pages/welcome/welcome';
import { AddPlacePage } from "../pages/add-place/add-place";
import { PlacePage } from "../pages/place/place";
import { SetLocationPage } from "../pages/set-location/set-location";
import { EventListPage } from "../pages/event-list/event-list";
import { ProfilePage } from "../pages/profile/profile";
import { AgmCoreModule } from "@agm/core";

import { PlacesService } from "../services/places";
import { ProfileService } from "../services/profile-service-mock";
import { DataProvider } from '../providers/data/data';

@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    HomePage,
    SigninPage,
    MapPage,
    ModalContentPage,
    SignupPage,
    CameraPage,
    AddPlacePage,
    PlacePage,
    SetLocationPage,
    EventListPage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
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
    ModalContentPage,
    SignupPage,
    CameraPage,
    ProfilePage,
    EventListPage,
    SetLocationPage,
    PlacePage,
    AddPlacePage,
    WelcomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    Camera,
    File,
    PlacesService,
    ProfilePage,
    DataProvider
  ]
})
export class AppModule {}
