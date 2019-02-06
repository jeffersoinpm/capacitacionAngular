import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaldoAhorrosComponent } from './saldo-ahorros.component';

describe('SaldoAhorrosComponent', () => {
  let component: SaldoAhorrosComponent;
  let fixture: ComponentFixture<SaldoAhorrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaldoAhorrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaldoAhorrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
