import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PuntoReciclajePage } from './punto-reciclaje.page';

describe('PuntoReciclajePage', () => {
  let component: PuntoReciclajePage;
  let fixture: ComponentFixture<PuntoReciclajePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PuntoReciclajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
