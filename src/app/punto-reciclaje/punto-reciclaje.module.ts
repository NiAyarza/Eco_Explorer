import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PuntoReciclajePageRoutingModule } from './punto-reciclaje-routing.module';

import { PuntoReciclajePage } from './punto-reciclaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PuntoReciclajePageRoutingModule
  ],
  declarations: [PuntoReciclajePage]
})
export class PuntoReciclajePageModule {}
