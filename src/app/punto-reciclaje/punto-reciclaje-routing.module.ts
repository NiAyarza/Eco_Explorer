import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PuntoReciclajePage } from './punto-reciclaje.page';

const routes: Routes = [
  {
    path: '',
    component: PuntoReciclajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PuntoReciclajePageRoutingModule {}
