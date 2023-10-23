import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuControllerService } from '../servicios/menu.service';
import { MenuController } from '@ionic/angular';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RegistroPage implements OnInit {

  registerForm: FormGroup;

  showPassword = false;

  comunas: any[] = [];

  constructor(private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder, 
    private menuService: MenuControllerService,
    private menuCtrl: MenuController
    ) {
    this.registerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      rut: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      comuna_id: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  registrar() {
    if (this.registerForm.valid) {
      const formData = new FormData();
      formData.append('rut', this.registerForm.get('rut')?.value);
      formData.append('nombre', this.registerForm.get('nombre')?.value);
      formData.append('apellido', this.registerForm.get('apellido')?.value);
      formData.append('contraseña', this.registerForm.get('contraseña')?.value);
      formData.append('email', this.registerForm.get('email')?.value);
      formData.append('fecha_nacimiento', this.registerForm.get('fecha_nacimiento')?.value);
      formData.append('comuna_id', this.registerForm.get('comuna_id')?.value.toString());

      this.authService.registro(formData).subscribe({
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