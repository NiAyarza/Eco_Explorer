import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlasticosPageRoutingModule } from './plasticos-routing.module';

import { PlasticosPage } from './plasticos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlasticosPageRoutingModule
  ],
  declarations: [PlasticosPage]
})
export class PlasticosPageModule {}
