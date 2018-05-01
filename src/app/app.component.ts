import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { CameraPage} from '../pages/camera/camera';
import { WelcomePage } from '../pages/welcome/welcome';
import { EventListPage } from '../pages/event-list/event-list';
import { EventPage } from '../pages/event/event';
import { ProfilePage } from '../pages/profile/profile';
import { HistoryPage } from '../pages/history/history';
import { Storage } from '@ionic/storage';

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

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public alertCtrl: AlertController, public storage: Storage,
  public toastCtrl: ToastController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      // {title: 'Home', component: MapPage, icon: 'star'},
      {title: 'Help Wanted', component: EventListPage, icon: 'star'},
      {title: 'My Offers to Help', component: EventPage, icon: 'star'}, 
      {title: 'My Requests for Help', component: HistoryPage, icon: 'star'},           
      {title: 'My Account', component: ProfilePage, icon: 'star'},
      {title: 'About', component: WelcomePage, icon: 'star'}/*,
      {title: 'Logout', component: SigninPage, icon: 'star'}*/
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
  
  presentLogout() {
  let alert = this.alertCtrl.create({
    title: 'Confirm Log Out',
    message: 'Are you sure you want to log out?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Log Out',
        handler: () => {
        this.storage.remove('originalToken').then(() => {console.log('Original token has been removed.');
          this.storage.get('currentToken').then((val) => {console.log('CONFIRMING: Your current token is', val);})});
        this.storage.remove('currentToken').then(() => {console.log('Current token has been removed.');
          this.storage.get('originalToken').then((val) => {console.log('CONFIRMING: Your original token is', val);})});
        const logoutToast = this.toastCtrl.create({
          message: 'You have been logged out.',
          duration: 2500});
        logoutToast.present();
        this.nav.setRoot(SigninPage);
          console.log('Logged out');
        }
      }
    ]
  });
  alert.present();
}
}