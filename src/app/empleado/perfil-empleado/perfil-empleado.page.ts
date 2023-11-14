import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteData } from 'src/app/interfaces/clienteData';
import { AuthService } from 'src/app/servicios/auth.service';
import { MenuControllerService } from 'src/app/servicios/menu.service';

@Component({
  selector: 'app-perfil-empleado',
  templateUrl: './perfil-empleado.page.html',
  styleUrls: ['./perfil-empleado.page.scss'],
})
export class PerfilEmpleadoPage implements OnInit {

  datosCliente: ClienteData = {
    nombre: '',
    apellido: '',
    fecha_nac: '',
    email: '',
    comuna: ''
  };

  comunas: any[] = [];
  
  constructor(
    private authService: AuthService, 
    private clienteService: AuthService, 
    private router : Router,
    private menuService: MenuControllerService
    ) { }

  datosCargados = false;
  comunasCargadas = false;

  cargarDatosCliente() {
    this.clienteService.obtenerDatosEmp().subscribe(
      (response: any) => {
        if (response && response.success && response.data) {
          this.asignarDatosCliente(response.data);
          console.log(response.data)
          this.datosCargados = true;
          this.actualizarNombreComuna();
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
      comuna: data.Comu_id,
    };
    
  }

  cargarComunas() {
    this.authService.getComunas().subscribe(
      (data: any) => {
        this.comunas = data;
        console.log(this.comunas);
        this.comunasCargadas = true;
        this.cargarDatosCliente();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  actualizarNombreComuna() {
    console.log('Comunas cargadas:', this.comunas);
    console.log('Datos cliente:', this.datosCliente);
  
    if (this.datosCliente && this.datosCliente.comuna && this.comunas.length > 0) {
      // Asegúrate de que el comuna_id sea un número para la comparación
      const comunaId = parseInt(this.datosCliente.comuna);
      console.log('ID de comuna buscada:', comunaId);
  
      // Encuentra la comuna en el array basándose en el comuna_id
      const comunaEncontrada = this.comunas.find(comuna => parseInt(comuna.comuna_id) === comunaId);
      console.log('Comuna encontrada:', comunaEncontrada);
  
      if (comunaEncontrada) {
        this.datosCliente.comuna = comunaEncontrada.nombre;
        console.log('Nombre de comuna asignado:', this.datosCliente.comuna);
      }
    }
  }

  ionViewWillEnter() {
    this.menuService.enableMenu();
    this.menuService.showMenuButton();
  }

  ngOnInit() {
    this.cargarComunas();
  }

}
