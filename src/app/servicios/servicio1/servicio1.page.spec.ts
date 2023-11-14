import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Servicio1Page } from './servicio1.page';

describe('Servicio1Page', () => {
  let component: Servicio1Page;
  let fixture: ComponentFixture<Servicio1Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Servicio1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
