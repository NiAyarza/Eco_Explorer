import { Component, OnInit } from '@angular/core';
import { MenuControllerService } from '../menu.service';

@Component({
  selector: 'app-servicio1',
  templateUrl: './servicio1.page.html',
  styleUrls: ['./servicio1.page.scss'],
})
export class Servicio1Page implements OnInit {

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
