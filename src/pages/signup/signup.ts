import { Component, ViewChild } from '@angular/core';
import {Camera} from '@ionic-native/camera';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { UsernameValidator } from  '../../validators/username';
import { Http, Headers, RequestOptions } from '@angular/http';
 
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
 
    @ViewChild('signupSlider') signupSlider: any;
 
    slideOneForm: FormGroup;
    slideTwoForm: FormGroup;
    public selfiePhoto: string;
    public idPhoto: string;
    public photoType: string;
 
    submitAttempt: boolean = false;
 
constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public http: Http, private camera: Camera) {
 
    this.slideOneForm = formBuilder.group({
        name: ['', Validators.compose([Validators.maxLength(255), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')]), UsernameValidator.checkUsername],
        email: [''],
        enterPassword: [''],
        confirmPassword: ['']
    });
 
    this.slideTwoForm = formBuilder.group({
    });
 
}
 
    next(){
        this.signupSlider.slideNext();
    }
 
    prev(){
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
save() {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({ headers: headers });
    let postParams = {
      username: this.slideOneForm.value['username'],
      password: this.slideOneForm.value['enterPassword'],
      email: this.slideOneForm.value['email']
    }
    
    this.http.post("http://localhost:8000/accounts/api/users", JSON.stringify(postParams), options)
      .subscribe(data => {
        console.log(data["_body"]);
       }, error => {
        console.log("AN ERROR OCCURED!" + error.error);// Error getting the data
      });
  }
 

  takePicture(type){
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
        if (this.photoType == "selfie"){
          this.selfiePhoto = "data:image/jpeg;base64," + imageData;
        }
        else{
          this.idPhoto = "data:image/jpeg;base64," + imageData;
        }
    }, (err) => {
        console.log(err);
    });
}

}