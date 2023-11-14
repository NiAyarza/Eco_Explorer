import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RojoPage } from './rojo.page';

describe('RojoPage', () => {
  let component: RojoPage;
  let fixture: ComponentFixture<RojoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RojoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
