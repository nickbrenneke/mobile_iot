import { Component, ViewChild } from '@angular/core';
import {Camera} from '@ionic-native/camera';

@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})
export class CameraPage {
  public selfiePhoto: string;
  public idPhoto: string;
  public photoType: string;

  constructor(private camera: Camera) {

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