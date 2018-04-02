import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { CameraPage} from '../pages/camera/camera';
import { WelcomePage } from '../pages/welcome/welcome';
import { EventListPage } from '../pages/event-list/event-list';
import { ProfilePage } from '../pages/profile/profile';

export interface MenuItem {
    title: string;
    component: any;
    icon: string;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SigninPage;

  pages: Array<MenuItem>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Home', component: MapPage, icon: 'star'},
      {title: 'Help Wanted', component: EventListPage, icon: 'star'},
      {title: 'My Account', component: ProfilePage, icon: 'star'},
      {title: 'About', component: WelcomePage, icon: 'star'},
      {title: 'Logout', component: SigninPage, icon: 'star'}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}