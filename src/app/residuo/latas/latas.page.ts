import { Component, OnInit } from '@angular/core';
import { MenuControllerService } from 'src/app/servicios/menu.service';

@Component({
  selector: 'app-latas',
  templateUrl: './latas.page.html',
  styleUrls: ['./latas.page.scss'],
})
export class LatasPage implements OnInit {

  constructor(
    private menuService: MenuControllerService,

  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuService.hideMenuButton();
  }

}
