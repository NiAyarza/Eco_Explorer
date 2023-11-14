import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LatasPageRoutingModule } from './latas-routing.module';

import { LatasPage } from './latas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LatasPageRoutingModule
  ],
  declarations: [LatasPage]
})
export class LatasPageModule {}
