import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PapelCartonPage } from './papel-carton.page';

describe('PapelCartonPage', () => {
  let component: PapelCartonPage;
  let fixture: ComponentFixture<PapelCartonPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PapelCartonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
