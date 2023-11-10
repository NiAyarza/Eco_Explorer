import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { ClienteData } from '../interfaces/clienteData'; // Asegúrate de proporcionar la ruta correcta
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  datosCliente: ClienteData = {
    nombre: '',
    apellido: '',
    fecha_nac: '',
    email: '',
    comuna: ''
  };

  comunas: any[] = [];
  
  constructor(private authService: AuthService, private clienteService: AuthService, private router : Router) { }

  datosCargados = false;
  comunasCargadas = false;

  cargarDatosCliente() {
    this.clienteService.obtenerDatosCliente().subscribe(
      (response: any) => {
        if (response && response.success && response.data) {
          this.asignarDatosCliente(response.data);
          this.datosCargados = true;
          this.intentarActualizarNombreComuna();
          console.log(response.data)
        }
      },
      (error) => {
        
        console.error('Error al obtener datos del cliente:', error);
      }
    );
  }

  private asignarDatosCliente(data: any): void {
    this.datosCliente = {
      nombre: data.nombre,
      apellido: data.apellido,
      fecha_nac: data.fecha_nac,
      email: data.email,
      comuna: data.Comu_id
    };
  }

  cargarComunas() {
    this.authService.getComunas().subscribe(
      (data: any) => {
        this.comunas = data;
        this.comunasCargadas = true;
        this.intentarActualizarNombreComuna();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  intentarActualizarNombreComuna() {
    if (this.datosCargados && this.comunasCargadas) {
      this.actualizarNombreComuna();
    }
  }

  actualizarNombreComuna() {
    if (this.comunas.length > 0 && this.datosCliente && this.datosCliente.comuna) {
      const comunaEncontrada = this.comunas.find(comuna => comuna.id === this.datosCliente.comuna);
      if (comunaEncontrada) {
        this.datosCliente.comuna = comunaEncontrada.nombre; // Asignar el nombre de la comuna
      }
    }
  }

  goToEditProfile(){
    this.router.navigateByUrl('editar-cliente');
  }

  ngOnInit() {
    this.cargarComunas();
    this.cargarDatosCliente();
  }
}