import { Component, OnInit } from '@angular/core';
import { MenuControllerService } from '../menu.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.page.html',
  styleUrls: ['./contrato.page.scss'],
})
export class ContratoPage implements OnInit {

  datosContrato: any;

  fechaInicio: string='';
  fechaFin: string='';

  constructor(
    private menuService: MenuControllerService,
    private authService: AuthService,
    private router: Router,

  ) { }

  ngOnInit() {
    const hoy = new Date();
    this.fechaInicio = this.formatDate(hoy);
    const treintaDiasDespues = new Date(hoy);
    treintaDiasDespues.setDate(treintaDiasDespues.getDate() + 30);
    this.fechaFin = this.formatDate(treintaDiasDespues);
    this.datosContrato = this.authService.getDatosContrato();
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
  

  ionViewWillEnter() {
    this.menuService.disableMenu();
    this.menuService.hideMenuButton();
  }

  confirmarContrato() {
    const datosContrato = {
      fechaInicio: this.fechaInicio,
      fechaFin: this.fechaFin,
      servicio_id: this.datosContrato.servicio_id,
      email: this.datosContrato.email,
    };
  
    this.authService.enviarDatosContrato(datosContrato).subscribe(
      (response: any) => {
        if (response.error) {
          // Mostrar mensaje de error y redirigir
          this.mostrarMensaje('Error: ' + response.error);
        } else {
          // Mostrar mensaje de éxito
          console.log('Contrato enviado con éxito', response);
        }
      },
      error => {
        console.error('Error al enviar el contrato', error);
      }
    );
  }
  
  mostrarMensaje(mensaje: string) {
    alert(mensaje);
    this.router.navigate(['/home']);
  }

}
