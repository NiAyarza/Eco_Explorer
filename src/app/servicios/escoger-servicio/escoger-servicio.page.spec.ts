import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EscogerServicioPage } from './escoger-servicio.page';

describe('EscogerServicioPage', () => {
  let component: EscogerServicioPage;
  let fixture: ComponentFixture<EscogerServicioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EscogerServicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
