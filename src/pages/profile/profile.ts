import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ProfileService} from '../../services/profile-service-mock';

@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html'
})
export class ProfilePage {

    profile: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public service: ProfileService) {
        this.profile = this.navParams.data;
        service.findById(this.profile.id).then(
            profile => this.profile = profile
        );
    }
}
