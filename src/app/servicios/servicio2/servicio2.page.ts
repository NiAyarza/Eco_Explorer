import { Component, OnInit } from '@angular/core';
import { MenuControllerService } from '../menu.service';

@Component({
  selector: 'app-servicio2',
  templateUrl: './servicio2.page.html',
  styleUrls: ['./servicio2.page.scss'],
})
export class Servicio2Page implements OnInit {

  constructor(
    private menuService: MenuControllerService,

  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuService.disableMenu();
    this.menuService.hideMenuButton();
  }

}
