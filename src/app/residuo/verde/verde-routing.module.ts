import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerdePage } from './verde.page';

const routes: Routes = [
  {
    path: '',
    component: VerdePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerdePageRoutingModule {}
