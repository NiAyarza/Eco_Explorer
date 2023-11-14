import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PilasPage } from './pilas.page';

const routes: Routes = [
  {
    path: '',
    component: PilasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PilasPageRoutingModule {}
