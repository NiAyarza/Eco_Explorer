import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerdePageRoutingModule } from './verde-routing.module';

import { VerdePage } from './verde.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerdePageRoutingModule
  ],
  declarations: [VerdePage]
})
export class VerdePageModule {}
