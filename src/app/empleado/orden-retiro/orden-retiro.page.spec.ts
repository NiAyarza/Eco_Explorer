import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdenRetiroPage } from './orden-retiro.page';

describe('OrdenRetiroPage', () => {
  let component: OrdenRetiroPage;
  let fixture: ComponentFixture<OrdenRetiroPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OrdenRetiroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
