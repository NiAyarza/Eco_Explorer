import { Component, OnInit } from '@angular/core';
import { MenuControllerService } from 'src/app/servicios/menu.service';

@Component({
  selector: 'app-vidrios',
  templateUrl: './vidrios.page.html',
  styleUrls: ['./vidrios.page.scss'],
})
export class VidriosPage implements OnInit {

  constructor(
    private menuService: MenuControllerService,

  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuService.hideMenuButton();
  }

}
