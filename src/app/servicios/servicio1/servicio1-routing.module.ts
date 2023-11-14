import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Servicio1Page } from './servicio1.page';

const routes: Routes = [
  {
    path: '',
    component: Servicio1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Servicio1PageRoutingModule {}
