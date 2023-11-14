import { Component, OnInit } from '@angular/core';
import { MenuControllerService } from 'src/app/servicios/menu.service';

@Component({
  selector: 'app-plasticos',
  templateUrl: './plasticos.page.html',
  styleUrls: ['./plasticos.page.scss'],
})
export class PlasticosPage implements OnInit {

  constructor(
    private menuService: MenuControllerService,

  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuService.hideMenuButton();
  }

}
