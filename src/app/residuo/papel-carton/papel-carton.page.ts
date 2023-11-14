import { Component, OnInit } from '@angular/core';
import { MenuControllerService } from 'src/app/servicios/menu.service';

@Component({
  selector: 'app-papel-carton',
  templateUrl: './papel-carton.page.html',
  styleUrls: ['./papel-carton.page.scss'],
})
export class PapelCartonPage implements OnInit {

  constructor(
    private menuService: MenuControllerService,

  ) { }

  ngOnInit() {
  }
  
  ionViewWillEnter() {
    this.menuService.hideMenuButton();
  }
}
