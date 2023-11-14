import { Component, OnInit } from '@angular/core';
import { MenuControllerService } from 'src/app/servicios/menu.service';

@Component({
  selector: 'app-amarillo',
  templateUrl: './amarillo.page.html',
  styleUrls: ['./amarillo.page.scss'],
})
export class AmarilloPage implements OnInit {

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
