import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { ClienteData } from '../interfaces/clienteData'; //


@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.page.html',
  styleUrls: ['./editar-cliente.page.scss'],
})
export class EditarClientePage implements OnInit {

  // Usaremos ViewChild para obtener referencias a los campos
  @ViewChild('nombreInput', { static: false }) nombreInput!: ElementRef;
  @ViewChild('apellidoInput', { static: false }) apellidoInput!: ElementRef;
  // ... puedes añadir más campos de esta manera

  // Variables para el enlace bidireccional de datos con [(ngModel)]
  nombre: string = "";
  apellido: string = "";
  // ... puedes añadir más variables para otros campos

  constructor(private authService: AuthService) { }

  passwordType: string = 'password'; // Esto mostrará la contraseña como asteriscos por defecto
  newPasswordType: string = 'password';

  toggleVisibility(inputType: string) {
    if (inputType === 'password') {
      return 'text';
    } else {
      return 'password';
    }
  }
  
  togglePassword() {
    this.passwordType = this.toggleVisibility(this.passwordType);
  }

  toggleNewPassword() {
    this.newPasswordType = this.toggleVisibility(this.newPasswordType);
  }
  
  habilitarEdicion(campoId: string) {
    if (campoId === 'nombre') {
      this.nombreInput.nativeElement.disabled = false;
      this.nombreInput.nativeElement.focus();
    } else if (campoId === 'apellido') {
      this.apellidoInput.nativeElement.disabled = false;
      this.apellidoInput.nativeElement.focus();
    }
    // ... puedes añadir más campos de esta manera
  }

  guardarCambios(campoId: string) {
    let data: ClienteData = {
      nombre: '',
      apellido: '',
    };
  
    if (campoId === 'nombre') {
      data[campoId] = this.nombre;
      this.nombreInput.nativeElement.disabled = true;
    } else if (campoId === 'apellido') {
      data[campoId] = this.apellido;
      this.apellidoInput.nativeElement.disabled = true;
    }
    // ... puedes añadir más campos de esta manera
  
    this.authService.editarCliente(data)
      .subscribe(
        response => {
          console.log(response); // Aquí manejas la respuesta, por ejemplo, mostrar un mensaje de éxito
        },
        error => {
          console.error(error); // Aquí manejas el error, por ejemplo, mostrar un mensaje de error
        }
      );
  }

  ngOnInit() {
    this.cargarDatosCliente();
  }

  cargarDatosCliente() {
    this.authService.obtenerDatosCliente().subscribe(
      (data: ClienteData) => {
        this.nombre = data.nombre;
        this.apellido = data.apellido;
        // ... asigna el resto de tus variables
      },
      error => {
        console.error('Error al obtener los datos del cliente:', error);
      }
    );
  }

}
