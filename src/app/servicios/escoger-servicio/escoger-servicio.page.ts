import { Component, OnInit } from '@angular/core';
import { MenuControllerService } from '../menu.service';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-escoger-servicio',
  templateUrl: './escoger-servicio.page.html',
  styleUrls: ['./escoger-servicio.page.scss'],
})
export class EscogerServicioPage implements OnInit {

  servicios: any[] = [];
  servicioSeleccionado: any; // Aquí almacenarás el servicio seleccionado
  total: number = 0;
  descripcion: string ='';

  constructor(
    private menuService: MenuControllerService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.authService.getServicios().subscribe(
      (data: any) => {
        this.servicios = data;
        console.log(this.servicios)
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  ionViewWillEnter() {
    this.menuService.disableMenu();
    this.menuService.hideMenuButton();
  }

  onServicioSeleccionado(event: any) {
    this.servicioSeleccionado = event.detail.value;
    this.total = this.servicioSeleccionado.precio;
    this.descripcion = this.servicioSeleccionado.descripcion;
  }

  guardarServicio() {
    if (this.servicioSeleccionado) {
      const email = localStorage.getItem('email'); // Asumiendo que el email está almacenado en localStorage
      const datos = {
        descripcion: this.servicioSeleccionado.descripcion,
        nombre: this.servicioSeleccionado.nombre,
        precio: this.servicioSeleccionado.precio,
        servicio_id: this.servicioSeleccionado.servicio_id,
        email: email
      };
  
      this.authService.setDatosContrato(datos);
      this.router.navigateByUrl('/contrato'); // Cambia a la ruta de tu página de contrato
    }

  }

}
