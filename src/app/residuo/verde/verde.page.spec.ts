import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerdePage } from './verde.page';

describe('VerdePage', () => {
  let component: VerdePage;
  let fixture: ComponentFixture<VerdePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VerdePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
