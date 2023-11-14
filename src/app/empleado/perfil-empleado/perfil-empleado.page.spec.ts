import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilEmpleadoPage } from './perfil-empleado.page';

describe('PerfilEmpleadoPage', () => {
  let component: PerfilEmpleadoPage;
  let fixture: ComponentFixture<PerfilEmpleadoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PerfilEmpleadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
