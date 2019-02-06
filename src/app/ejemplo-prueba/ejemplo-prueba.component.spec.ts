import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EjemploPruebaComponent } from './ejemplo-prueba.component';

describe('EjemploPruebaComponent', () => {
  let component: EjemploPruebaComponent;
  let fixture: ComponentFixture<EjemploPruebaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EjemploPruebaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EjemploPruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
