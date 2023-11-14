import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VidriosPageRoutingModule } from './vidrios-routing.module';

import { VidriosPage } from './vidrios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VidriosPageRoutingModule
  ],
  declarations: [VidriosPage]
})
export class VidriosPageModule {}
