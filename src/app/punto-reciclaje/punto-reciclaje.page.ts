import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';
import { MenuControllerService } from '../servicios/menu.service';
import { HttpClient } from '@angular/common/http';
import { Time } from '@angular/common';

@Component({
  selector: 'app-punto-reciclaje',
  templateUrl: './punto-reciclaje.page.html',
  styleUrls: ['./punto-reciclaje.page.scss'],
})
export class PuntoReciclajePage implements OnInit {
 
  constructor(
    private authService: AuthService,
    private http: HttpClient, 
    private router : Router,
    private menuService: MenuControllerService
  ) { 
    
  }

  ngOnInit() {
  }

}