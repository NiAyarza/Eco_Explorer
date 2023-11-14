import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'editar-cliente',
    loadChildren: () => import('./editar-cliente/editar-cliente.module').then( m => m.EditarClientePageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'punto-reciclaje',
    loadChildren: () => import('./punto-reciclaje/punto-reciclaje.module').then( m => m.PuntoReciclajePageModule)
  },
  {
    path: 'latas',
    loadChildren: () => import('./residuo/latas/latas.module').then( m => m.LatasPageModule)
  },
  {
    path: 'plasticos',
    loadChildren: () => import('./residuo/plasticos/plasticos.module').then( m => m.PlasticosPageModule)
  },
  {
    path: 'pilas',
    loadChildren: () => import('./residuo/pilas/pilas.module').then( m => m.PilasPageModule)
  },
  {
    path: 'papel-carton',
    loadChildren: () => import('./residuo/papel-carton/papel-carton.module').then( m => m.PapelCartonPageModule)
  },
  {
    path: 'vidrios',
    loadChildren: () => import('./residuo/vidrios/vidrios.module').then( m => m.VidriosPageModule)
  },
  {
    path: 'verde',
    loadChildren: () => import('./residuo/verde/verde.module').then( m => m.VerdePageModule)
  },
  {
    path: 'amarillo',
    loadChildren: () => import('./residuo/amarillo/amarillo.module').then( m => m.AmarilloPageModule)
  },
  {
    path: 'rojo',
    loadChildren: () => import('./residuo/rojo/rojo.module').then( m => m.RojoPageModule)
  },
  {
    path: 'contrato',
    loadChildren: () => import('./servicios/contrato/contrato.module').then( m => m.ContratoPageModule)
  },
  {
    path: 'escoger-servicio',
    loadChildren: () => import('./servicios/escoger-servicio/escoger-servicio.module').then( m => m.EscogerServicioPageModule)
  },
  {
    path: 'nuestros-servicios',
    loadChildren: () => import('./servicios/nuestros-servicios/nuestros-servicios.module').then( m => m.NuestrosServiciosPageModule)
  },
  {
    path: 'pago',
    loadChildren: () => import('./servicios/pago/pago.module').then( m => m.PagoPageModule)
  },
  {
    path: 'servicio1',
    loadChildren: () => import('./servicios/servicio1/servicio1.module').then( m => m.Servicio1PageModule)
  },
  {
    path: 'servicio2',
    loadChildren: () => import('./servicios/servicio2/servicio2.module').then( m => m.Servicio2PageModule)
  },
  {
    path: 'perfil-empleado',
    loadChildren: () => import('./empleado/perfil-empleado/perfil-empleado.module').then( m => m.PerfilEmpleadoPageModule)
  },
  {
    path: 'orden-retiro',
    loadChildren: () => import('./empleado/orden-retiro/orden-retiro.module').then( m => m.OrdenRetiroPageModule)
  },
  {
    path: 'registro-emp',
    loadChildren: () => import('./empleado/registro-emp/registro-emp.module').then( m => m.RegistroEmpPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
