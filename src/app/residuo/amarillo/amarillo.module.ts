import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AmarilloPageRoutingModule } from './amarillo-routing.module';

import { AmarilloPage } from './amarillo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AmarilloPageRoutingModule
  ],
  declarations: [AmarilloPage]
})
export class AmarilloPageModule {}
