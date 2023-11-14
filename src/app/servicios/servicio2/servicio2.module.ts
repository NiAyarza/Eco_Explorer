import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Servicio2PageRoutingModule } from './servicio2-routing.module';

import { Servicio2Page } from './servicio2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Servicio2PageRoutingModule
  ],
  declarations: [Servicio2Page]
})
export class Servicio2PageModule {}
