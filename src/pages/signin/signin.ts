import { Component } from '@angular/core';
import { SignupPage } from '../signup/signup';
import { NavController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';


@Component({
  templateUrl: 'signin.html'
})
export class SigninPage { 
constructor(public nav: NavController, public http: Http) {
    this.nav = nav
  }

  openRegistration() {
    this.nav.push(SignupPage)
  }
  login() {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({ headers: headers });
    let postParams = {
      username: this.username,
      password: this.password,
    }
    
    this.http.post("http://localhost:8000/accounts/api/login", JSON.stringify(postParams), options)
      .subscribe(data => {
        console.log(data["_body"]);
       }, error => {
        console.log(error["_body"]);// Error getting the data
      });
  }
}