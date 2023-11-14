import { Component, OnInit } from '@angular/core';
import { MenuControllerService } from '../menu.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.page.html',
  styleUrls: ['./pago.page.scss'],
})
export class PagoPage implements OnInit {

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
