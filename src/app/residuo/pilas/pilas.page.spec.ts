import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PilasPage } from './pilas.page';

describe('PilasPage', () => {
  let component: PilasPage;
  let fixture: ComponentFixture<PilasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PilasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
