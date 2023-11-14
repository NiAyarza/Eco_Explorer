import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Servicio2Page } from './servicio2.page';

describe('Servicio2Page', () => {
  let component: Servicio2Page;
  let fixture: ComponentFixture<Servicio2Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Servicio2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
