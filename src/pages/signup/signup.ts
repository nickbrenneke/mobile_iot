import { Component, ViewChild } from '@angular/core';
import { Camera } from '@ionic-native/camera';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController, AlertController } from 'ionic-angular';
import { UsernameValidator } from '../../validators/username';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from "@ionic/storage";
import { MapPage } from '../map/map';
import { Events } from 'ionic-angular';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})

/*
Class name: SignupPage
Description: This page contains the functionality for a user to register/sign up for our platform.
  */
export class SignupPage {

  @ViewChild('signupSlider') signupSlider: any;
  public token;
  privacyForm: FormGroup;
  slideOneForm: FormGroup;
  slideTwoForm: FormGroup;
  public selfiePhoto: string;
  public idPhoto: string;
  public photoType: string;

  submitAttempt: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public formBuilder: FormBuilder, 
    public alertCtrl: AlertController, 
    public http: Http, 
    private camera: Camera, 
    public storage: Storage,
    public toastCtrl: ToastController,
    public events: Events) {

    this.privacyForm = formBuilder.group({
      privacyAgree: [null, Validators.requiredTrue]
    });
    //Build first form as a slide object
    this.slideOneForm = formBuilder.group({
      firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      phone: ['', Validators.compose([Validators.maxLength(10), Validators.minLength(10), Validators.pattern('[0-9]*'), Validators.required])],
      username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.maxLength(150)]), UsernameValidator.checkUsername],
      email: ['', Validators.compose([Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"), Validators.maxLength(254)])],
      enterPassword: [''],
      confirmPassword: ['']
    });

    //Create slide form two to contain camera objects to capture user picture and government ID photos
    this.slideTwoForm = formBuilder.group({
    });

  }

  next() {
    this.signupSlider.slideNext();
  }

  prev() {
    this.signupSlider.slidePrev();
  }

  /*   save(){
  
     this.submitAttempt = true;
  
     if(!this.slideOneForm.valid){
         this.signupSlider.slideTo(0);
     }
     else if(!this.slideTwoForm.valid){
         this.signupSlider.slideTo(1);
     }
     else {
         console.log("success!")
         console.log(this.slideOneForm.value);
         console.log(this.slideTwoForm.value);
     }
  
 }*/

  /*
  Function name: save
  Arguments: None
  Description: This function saves the data from the form and submits a POST request to the user registration API
  */
  save() {
    var headers = new Headers();
    this.submitAttempt = true;
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({ headers: headers });
    let profileData = {
      pic: this.selfiePhoto,
      pic_id: this.idPhoto,
      phone: this.slideOneForm.value['phone'],
    }
    let postParams = {
      username: this.slideOneForm.value['username'],
      password: this.slideOneForm.value['enterPassword'],
      email: this.slideOneForm.value['email'],
      first_name: this.slideOneForm.value['firstName'],
      last_name: this.slideOneForm.value['lastName'],
      profile: profileData,
    }

    //Submit JSON request to API, receive response, and log any errors
    if (!this.privacyForm.valid) {
      let alert = this.alertCtrl.create({
        title: 'Privacy Policy Agreement',
        message: 'You must agree to our privacy policy and terms of service before registering.',
        buttons: [
          {
            text: 'Dismiss',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }]
      });
      alert.present();
    }
    else if (!this.slideOneForm.valid) {
      let alert = this.alertCtrl.create({
        title: 'User Information Form Error',
        message: 'You have errors or missing field in your profile information',
        buttons: [
          {
            text: 'Dismiss',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }]
      });
      alert.present();
    }
    else if (!this.slideTwoForm.valid) {
      let alert = this.alertCtrl.create({
        title: 'User Photos Form Error',
        message: 'You must submit the required photos.',
        buttons: [
          {
            text: 'Dismiss',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }]
      });
      alert.present();
    }
    else {
      this.http.post("http://localhost:8000/accounts/api/users", JSON.stringify(postParams), options)
        .subscribe(data => {
          console.log(data["_body"]);
          let parsed = JSON.parse(data["_body"]);
          this.token = parsed["token"];
          this.storage.set('originalToken',this.token);
          this.storage.set('currentToken',this.token);
          this.events.publish('user:signin', this.slideOneForm.value['username'], this.token);
        }, error => {
          console.log("AN ERROR OCCURED!" + error.error);// Error getting the data
        });
      const successToast = this.toastCtrl.create({
        message: 'Account created successfully!',
        duration: 2500
      });
      successToast.present();
      this.navCtrl.setRoot(MapPage).then(
          () => {this.events.publish('user:signin', this.slideOneForm.value['username'], this.token);}
        );
    }
  }

  /*
Function name: takePicture
Arguments: type (type of photo: selfie (self portrait) or ID (govt issued ID)
Description: This function creates a Camera object to allow a user to take photos using native camera functionality
*/
  takePicture(type) {
    this.photoType = type;
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      //      targetWidth: 1000,
      //      targetHeight: 1000
      correctOrientation: true
    }).then((imageData) => {
      // imageData is a base64 encoded string
      if (this.photoType == "selfie") {
        this.selfiePhoto = "data:image/jpeg;base64," + imageData;
      }
      else {
        this.idPhoto = "data:image/jpeg;base64," + imageData;
      }
    }, (err) => {
      console.log(err);
    });
  }
}