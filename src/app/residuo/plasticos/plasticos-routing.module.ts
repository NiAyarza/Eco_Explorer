import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlasticosPage } from './plasticos.page';

const routes: Routes = [
  {
    path: '',
    component: PlasticosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlasticosPageRoutingModule {}
