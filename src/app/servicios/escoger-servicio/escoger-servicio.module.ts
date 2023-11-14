import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EscogerServicioPageRoutingModule } from './escoger-servicio-routing.module';

import { EscogerServicioPage } from './escoger-servicio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EscogerServicioPageRoutingModule
  ],
  declarations: [EscogerServicioPage]
})
export class EscogerServicioPageModule {}
