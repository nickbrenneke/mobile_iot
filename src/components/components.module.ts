import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { FlashCardComponent } from './flash-card/flash-card';

export const components = [
  FlashCardComponent,
];

@NgModule({
  declarations: [components],
  imports: [IonicModule],
  exports: [components]
})
export class ComponentsModule {}