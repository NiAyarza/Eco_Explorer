import { Component } from '@angular/core';
import { MenuControllerService } from '../servicios/menu.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private menuService: MenuControllerService,) {}

  ionViewWillEnter() {
    this.menuService.enableMenu();
    this.menuService.showMenuButton();
  }

}
