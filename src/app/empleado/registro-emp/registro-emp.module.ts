import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroEmpPageRoutingModule } from './registro-emp-routing.module';

import { RegistroEmpPage } from './registro-emp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroEmpPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RegistroEmpPage]
})
export class RegistroEmpPageModule {}
