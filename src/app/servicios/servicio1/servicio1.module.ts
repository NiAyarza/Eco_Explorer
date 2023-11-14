import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Servicio1PageRoutingModule } from './servicio1-routing.module';

import { Servicio1Page } from './servicio1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Servicio1PageRoutingModule
  ],
  declarations: [Servicio1Page]
})
export class Servicio1PageModule {}
