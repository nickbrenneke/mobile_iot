import { ParallaxHeaderDirectiveModule } from '../../components/parallax-header/parallax-header.module';
import { ProfilePublicPage } from './profile-public';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    ProfilePublicPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePublicPage),
    ParallaxHeaderDirectiveModule
  ],
  exports: [
    ProfilePublicPage
  ]
})

export class ProfileFivePageModule { }