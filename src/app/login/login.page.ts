import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuControllerService } from '../servicios/menu.service';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  showPassword = false;

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private formBuilder: FormBuilder, 
    private menuService: MenuControllerService,
    private menuCtrl: MenuController
    ) { 
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  login(): void{
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      this.authService.login(email, password).subscribe(
        (response) => {
          console.log('Login exitoso', response);
          this.router.navigateByUrl('/home')
        },
        (error) => {
          console.error('Error durante el login', error);
        }
        );
    }
  };

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  ionViewWillEnter() {
    this.menuService.disableMenu();
    this.menuService.hideMenuButton();
  }

  ngOnInit() {
  }

}
