import { Component, OnInit } from '@angular/core';
import { MenuControllerService } from './servicios/menu.service';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from './servicios/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  esCliente: boolean = false;
  esEmpleado: boolean = false;

  public showMenu: boolean = true;
  public menuDisabled: boolean = true;


  constructor(
    private menuCtrl: MenuController, 
    private menuService: MenuControllerService, 
    private router: Router,
    private authService: AuthService
    ) {
    this.menuService.menuVisible$.subscribe(visible => {
      this.showMenu = visible;
      this.menuCtrl.enable(this.showMenu);
    });

    this.menuService.menuDisabled$.subscribe(disabled => {
      this.menuDisabled = disabled;
    });
  }

  ngOnInit() {
    const tipo = localStorage.getItem('tipo');
    console.log('Tipo de usuario:', tipo);
    this.esCliente = tipo === 'cliente';
    this.esEmpleado = tipo === 'empleado';
  }
  
  goToProfile(){
    this.router.navigateByUrl('/perfil');
  }

  onLogoutClick() {
    this.authService.logout();
  }
}
