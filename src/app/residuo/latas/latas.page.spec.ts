import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LatasPage } from './latas.page';

describe('LatasPage', () => {
  let component: LatasPage;
  let fixture: ComponentFixture<LatasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LatasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
