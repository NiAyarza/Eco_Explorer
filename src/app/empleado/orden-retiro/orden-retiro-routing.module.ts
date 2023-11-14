import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdenRetiroPage } from './orden-retiro.page';

const routes: Routes = [
  {
    path: '',
    component: OrdenRetiroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdenRetiroPageRoutingModule {}
