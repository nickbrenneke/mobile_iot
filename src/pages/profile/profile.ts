import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { Profile } from "../../models/profile";
import { ProfileService } from "../../services/profile-service-mock";
import 'rxjs/add/operator/debounceTime';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  showProfile: boolean;
  searchKey: string = '';
  searchControl: FormControl;
  searching: any = false;
  profile = new Profile();

  user = {
    username: 'k13k', //should be full name
    profileImage: 'assets/img/avatar/girl-avatar.png', //should be user pic
    coverImage: 'assets/img/background/background-5.jpg', //we will apply a global images
    first_name: 'Cosima',
    last_name: 'Niehaus',
    description: 'Passionate Designer. Recently focusing on developing mobile hybrid apps and web development.',
    phone: '555 555 555',
    email: 'cosima@niehaus.com',
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private profileService: ProfileService) {
  }

  ionViewDidLoad() {
    // invoke profile service
    // get data

    this.searchControl = new FormControl();
     // console.log('Welcome', user, 'with', token);
      this.profileService.fetchProfile()
        .subscribe(
          
          (profile) => {
            console.log("asign profile", profile);
            this.profile = profile;
          })

    // let person = JSON.parse(localStorage.getItem('PERSON'));
    // if (person){
    //   this.person = person;
    //   this.age = this.getAge(this.person.birthdate);
    //   this.dob = new Date(this.person.birthdate).toISOString();
    // 
  }
  

}
