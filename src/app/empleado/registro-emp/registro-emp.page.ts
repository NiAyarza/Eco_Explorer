import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

import { AuthService } from 'src/app/servicios/auth.service';
import { MenuControllerService } from 'src/app/servicios/menu.service';

@Component({
  selector: 'app-registro-emp',
  templateUrl: './registro-emp.page.html',
  styleUrls: ['./registro-emp.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RegistroEmpPage implements OnInit {
  registerEmpForm: FormGroup;

  showPassword = false;

  comunas: any[] = [];

  constructor(private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder, 
    private menuService: MenuControllerService,
    private menuCtrl: MenuController
    ) {
    this.registerEmpForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      rut: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      comuna_id: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  registrarEmp() {
    if (this.registerEmpForm.valid) {
      const formData = new FormData();
      formData.append('rut', this.registerEmpForm.get('rut')?.value);
      formData.append('nombre', this.registerEmpForm.get('nombre')?.value);
      formData.append('apellido', this.registerEmpForm.get('apellido')?.value);
      formData.append('contraseña', this.registerEmpForm.get('contraseña')?.value);
      formData.append('email', this.registerEmpForm.get('email')?.value);
      formData.append('fecha_nacimiento', this.registerEmpForm.get('fecha_nacimiento')?.value);
      formData.append('comuna_id', this.registerEmpForm.get('comuna_id')?.value.toString());

      this.authService.registroEmp(formData).subscribe({
        next: (response) => {
          console.log('Registro exitoso:', response);
          this.router.navigateByUrl('/login');
        },
        error: (error) => {
          console.error('Error en el registro:', error);
        }
      });
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  ionViewWillEnter() {
    this.menuService.disableMenu();
    this.menuService.hideMenuButton();
  }

  ngOnInit() {
    this.authService.getComunas().subscribe(
      (data: any) => {
        this.comunas = data;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

}
