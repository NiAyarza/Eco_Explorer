import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlasticosPage } from './plasticos.page';

describe('PlasticosPage', () => {
  let component: PlasticosPage;
  let fixture: ComponentFixture<PlasticosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PlasticosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
