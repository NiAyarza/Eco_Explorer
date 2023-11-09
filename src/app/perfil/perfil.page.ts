import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { ClienteData } from '../interfaces/clienteData'; // Asegúrate de proporcionar la ruta correcta

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  datosCliente!: ClienteData;
  comunas: any[] = [];
  
  constructor(private authService: AuthService, private clienteService: AuthService) { }

  ngOnInit() {
    this.cargarComunas();
    this.cargarDatosCliente();
  }

  cargarDatosCliente() {
    this.clienteService.obtenerDatosCliente().subscribe(
      (data: ClienteData) => {
        // Manejar la respuesta exitosa aquí
        console.log('Datos del cliente:', data);
        this.datosCliente = data; // Asignar los datos al objeto del componente
      },
      (error) => {
        // Manejar el error aquí
        console.error('Error al obtener datos del cliente:', error);
      }
    );
  }

  cargarComunas() {
    this.authService.getComunas().subscribe(
      (data: any) => {
        this.comunas = data;
        this.actualizarNombreComuna(); // Llama a una función para actualizar el nombre de la comuna
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  actualizarNombreComuna() {
    if (this.comunas && this.datosCliente.comuna) {
      const comunaEncontrada = this.comunas.find((comuna: any) => comuna.id === this.datosCliente.comuna);
      if (comunaEncontrada) {
        this.datosCliente.comuna = comunaEncontrada.nombre;
      }
    }
  }
}