import { Injectable } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuControllerService {

  private _menuDisabled = new BehaviorSubject<boolean>(true);
  public menuDisabled$ = this._menuDisabled.asObservable();

  private _menuVisible = new BehaviorSubject<boolean>(true);
  public menuVisible$ = this._menuVisible.asObservable();

  constructor(private menuCtrl: MenuController) {}

  showMenuButton() {
    this._menuVisible.next(true);
  }

  hideMenuButton() {
    this._menuVisible.next(false);
  }

  enableMenu() {
    this._menuDisabled.next(false);
    this.menuCtrl.enable(true);
  }

  disableMenu() {
    this._menuDisabled.next(true);
    this.menuCtrl.enable(false);
  }
}