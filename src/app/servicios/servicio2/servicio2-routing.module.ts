import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Servicio2Page } from './servicio2.page';

const routes: Routes = [
  {
    path: '',
    component: Servicio2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Servicio2PageRoutingModule {}
