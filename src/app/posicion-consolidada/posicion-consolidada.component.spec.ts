import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosicionConsolidadaComponent } from './posicion-consolidada.component';

describe('PosicionConsolidadaComponent', () => {
  let component: PosicionConsolidadaComponent;
  let fixture: ComponentFixture<PosicionConsolidadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosicionConsolidadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosicionConsolidadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
