import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { ClienteData } from '../interfaces/clienteData'; //
import { Router } from '@angular/router';
import { MenuControllerService } from '../servicios/menu.service';


@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.page.html',
  styleUrls: ['./editar-cliente.page.scss'],
})
export class EditarClientePage implements OnInit {
  modoEdicionNombre: boolean = false;
  modoEdicionApellido: boolean = false;
  modoEdicionComuna: boolean = false;
  comunaSeleccionada: string = ''; 
  nombreComunaSeleccionada: string = '';

  datosCargados = false;
  comunasCargadas = false;

  datosCliente: ClienteData = {
    nombre: '',
    apellido: '',
    fecha_nac: '',
    email: '',
    comuna: ''
  };
  
  comunas: any[] = [];

  // Usaremos ViewChild para obtener referencias a los campos
  @ViewChild('nombreInput', { static: false }) nombreInput!: ElementRef;
  @ViewChild('apellidoInput', { static: false }) apellidoInput!: ElementRef;
  // ... puedes añadir más campos de esta manera

  // Variables para el enlace bidireccional de datos con [(ngModel)]
  nombre: string = "";
  apellido: string = "";
  newPassword: string = "";
  // ... puedes añadir más variables para otros campos

  constructor(private authService: AuthService, 
    private clienteService: AuthService, 
    private router : Router,
    private menuService: MenuControllerService,
    ) { }

  contrasenaActual: string = '';
  nuevaContrasena: string = '';

  passwordType: string = 'password'; // Esto mostrará la contraseña como asteriscos por defecto
  newPasswordType: string = 'password';

  editarContrasena: boolean = false;
  mostrarNuevaContrasena: boolean = false;

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
      this.modoEdicionNombre = true;
    } else if (campoId === 'apellido') {
      this.modoEdicionApellido = true;
    } else if (campoId === 'comuna') {
      this.modoEdicionComuna = true;
    }if (campoId === 'contraseña') {
      this.editarContrasena = true;
      this.mostrarNuevaContrasena = true;
    }
  }

  cancelarEdicion(campoId: string) {
    if (campoId === 'nombre') {
      this.modoEdicionNombre = false;
      this.datosCliente.nombre = this.datosClienteOriginal.nombre;
    }
    if (campoId === 'apellido') {
      this.modoEdicionApellido = false;
      this.datosCliente.apellido = this.datosClienteOriginal.apellido;
    }
    if (campoId === 'contraseña') {
      this.editarContrasena = false;
    }
  }
  
  guardarCambios(campoId: string) {
    let data: any = {};

    if (campoId === 'nombre') {
      data.nombre = this.datosCliente.nombre;
      this.nombreInput.nativeElement.disabled = true;
    } else if (campoId === 'apellido') {
      data.apellido = this.datosCliente.apellido;
      this.apellidoInput.nativeElement.disabled = true;
    } else if (campoId === 'comuna') {
      const comunaSeleccionada = this.comunas.find(comuna => 
        comuna.nombre.toLowerCase() === this.nombreComunaSeleccionada.toLowerCase());
      
      if (comunaSeleccionada) {
        data.comuna = parseInt(comunaSeleccionada.comuna_id);
      } else {
        console.error('Comuna no encontrada');
        return;
      }
      this.modoEdicionComuna = false;
    } else if (campoId === 'newPassword') {
      data.contrasena = {
        contraseñaActual: this.contrasenaActual,
        nuevaContrasena: this.nuevaContrasena
      };
      // Lógica para enviar los datos al backend
    }
    // Agrega aquí más campos si es necesario

    console.log('Datos a guardar:', data);


      this.authService.editarCliente(data)
        .subscribe(
          response => {
            console.log(response); // Aquí manejas la respuesta
          },
          error => {
            console.error(error); // Aquí manejas el error
          }
        );
    };

  

  cargarDatosCliente() {
    this.clienteService.obtenerDatosCliente().subscribe(
      (response: any) => {
        if (response && response.success && response.data) {
          this.asignarDatosCliente(response.data);
          this.datosCargados = true;
          this.actualizarNombreComuna();
        }
      },
      (error) => {
        
        console.error('Error al obtener datos del cliente:', error);
      }
    );
  }

  datosClienteOriginal: ClienteData = {
    nombre: '',
    apellido: '',
    fecha_nac: '',
    email: '',
    comuna: ''
  };

  private asignarDatosCliente(data: any): void {
    this.datosCliente = {
      nombre: data.nombre,
      apellido: data.apellido,
      fecha_nac: data.fecha_nac,
      email: data.email,
      comuna: data.Comu_id,
    };
    this.datosClienteOriginal = {...this.datosCliente};
  }

  cargarComunas() {
    this.authService.getComunas().subscribe(
      (data: any) => {
        this.comunas = data;
        this.comunasCargadas = true;
        this.cargarDatosCliente();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  actualizarNombreComuna() {
    if (this.datosCliente && this.datosCliente.comuna && this.comunas.length > 0) {
      // Asegúrate de que el comuna_id sea un número para la comparación
      const comunaId = parseInt(this.datosCliente.comuna);
  
      // Encuentra la comuna en el array basándose en el comuna_id
      const comunaEncontrada = this.comunas.find(comuna => parseInt(comuna.comuna_id) === comunaId);
  
      if (comunaEncontrada) {
        this.datosCliente.comuna = comunaEncontrada.nombre;
      }
    }
  }

  goToEditProfile(){
    this.router.navigateByUrl('editar-cliente');
  }

  onConfirmar(){
    this.router.navigateByUrl('/perfil');
  }

  ionViewWillEnter() {
    this.menuService.disableMenu();
    this.menuService.hideMenuButton();
  }

  ngOnInit() {
    this.cargarComunas();
  }

}

