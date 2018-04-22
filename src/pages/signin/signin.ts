import { Component } from '@angular/core';
import { SignupPage } from '../signup/signup';
import { NavController, AlertController} from 'ionic-angular';
import { Events } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HomePage } from '../home/home';
import { EventListPage } from '../event-list/event-list';
import { MapPage} from '../map/map';
import { WelcomePage} from '../welcome/welcome';
import 'rxjs/Rx';
import { Storage } from '@ionic/storage';


@Component({
  templateUrl: 'signin.html'
})

  /*
  class name: SigninPage
  Description: This class contains related to the sign in page and functionality.
  */
export class SigninPage { 
username: string;
password: string;
public token;
constructor(public nav: NavController, public http: Http, public storage: Storage, public events: Events, public alertCtrl: AlertController) {
   this.nav = nav;
}  

    /*
  Function name: openRegistration
  Arguments: None
  Description: This function takes the user to the sign up page.
  */
  openRegistration() {
    this.nav.push(SignupPage);
  }
  
    /*
  Function name: login
  Arguments: None
  Description: This function executes the login after the user enters his/her details and clicks the login button.
  */
  login() {
    this.authenticate().subscribe((success) => {
      this.nav.setRoot(EventListPage).then(
          () => {this.events.publish('user:signin', this.username, this.token);}
        );
    }, error => {
        console.log(error["_body"]);// Error getting the data
        this.showErrorAlert();
    });
  }

  showErrorAlert(){
    let alert = this.alertCtrl.create({
      title: 'Login Error',
      message: 'Unable to login with the provided credentials.',
      buttons: [
      {
        text: 'OK',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
    ]
  });
  alert.present();
  }
  
    /*
  Function name: authenticate
  Arguments: None
  Description: This function authenticates the user by sending a POST request to the login API and receiving a token.
  */
  authenticate(){
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({ headers: headers });
    let postParams = {
      username: this.username,
      password: this.password
    }
    //Send JSON request and header info, parse response and return token object
    return this.http.post("http://localhost:8000/accounts/api/login", JSON.stringify(postParams), options)
      .map(data => {
        console.log("PRINTED IN authenticate:    " + data["_body"]);
        let parsed = JSON.parse(data["_body"]);
        this.token = parsed["token"];
        this.storage.set('originalToken',this.token);
        this.storage.set('currentToken',this.token);
        // this.events.publish('user:signin', this.username, this.token);

    }, error => {
        console.log(error["_body"]);// Error getting the data
    });

  }
}