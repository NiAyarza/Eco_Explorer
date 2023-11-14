import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AmarilloPage } from './amarillo.page';

const routes: Routes = [
  {
    path: '',
    component: AmarilloPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmarilloPageRoutingModule {}
