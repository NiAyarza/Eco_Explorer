import { Component, OnInit } from '@angular/core';
import { MenuControllerService } from 'src/app/servicios/menu.service';

@Component({
  selector: 'app-pilas',
  templateUrl: './pilas.page.html',
  styleUrls: ['./pilas.page.scss'],
})
export class PilasPage implements OnInit {

  constructor(
    private menuService: MenuControllerService,

  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuService.hideMenuButton();
  }

}
