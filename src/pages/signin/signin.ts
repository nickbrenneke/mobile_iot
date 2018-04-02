import { Component } from '@angular/core';
import { SignupPage } from '../signup/signup';
import { NavController} from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HomePage } from '../home/home';
import { MapPage} from '../map/map';
import { WelcomePage} from '../welcome/welcome';
import 'rxjs/add/operator/map';
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
constructor(public nav: NavController, public http: Http, public storage: Storage) {
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
    this.authenticate();
    /*this.storage.get('currentToken').then((val) => {
    console.log('Your token is', val);*/
    this.storage.get('currentToken').then((val) => {
    console.log('Your stored token is', val);
    this.nav.setRoot(MapPage);
  });
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
      .subscribe(data => {
        //console.log("PRINTED IN SUBSCIRBE:    " + data["_body"]);
        let parsed = JSON.parse(data["_body"]);
        this.token = parsed["token"];
        this.storage.set('currentToken',this.token);
        //this.nav.setRoot(HomePage);
       }, error => {
        console.log(error["_body"]);// Error getting the data
    });
  }
}