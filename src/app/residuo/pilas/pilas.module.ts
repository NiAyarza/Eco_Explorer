import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PilasPageRoutingModule } from './pilas-routing.module';

import { PilasPage } from './pilas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PilasPageRoutingModule
  ],
  declarations: [PilasPage]
})
export class PilasPageModule {}
