import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdenRetiroPageRoutingModule } from './orden-retiro-routing.module';

import { OrdenRetiroPage } from './orden-retiro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdenRetiroPageRoutingModule
  ],
  declarations: [OrdenRetiroPage]
})
export class OrdenRetiroPageModule {}
