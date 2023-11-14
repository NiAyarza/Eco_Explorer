import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EscogerServicioPage } from './escoger-servicio.page';

const routes: Routes = [
  {
    path: '',
    component: EscogerServicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EscogerServicioPageRoutingModule {}
