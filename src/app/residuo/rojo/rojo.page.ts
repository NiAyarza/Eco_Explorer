import { Component, OnInit } from '@angular/core';
import { MenuControllerService } from 'src/app/servicios/menu.service';

@Component({
  selector: 'app-rojo',
  templateUrl: './rojo.page.html',
  styleUrls: ['./rojo.page.scss'],
})
export class RojoPage implements OnInit {

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
