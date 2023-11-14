import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VidriosPage } from './vidrios.page';

describe('VidriosPage', () => {
  let component: VidriosPage;
  let fixture: ComponentFixture<VidriosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VidriosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
