import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LatasPage } from './latas.page';

const routes: Routes = [
  {
    path: '',
    component: LatasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LatasPageRoutingModule {}
