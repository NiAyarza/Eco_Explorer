import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroEmpPage } from './registro-emp.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroEmpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroEmpPageRoutingModule {}
