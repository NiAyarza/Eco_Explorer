import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VidriosPage } from './vidrios.page';

const routes: Routes = [
  {
    path: '',
    component: VidriosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VidriosPageRoutingModule {}
