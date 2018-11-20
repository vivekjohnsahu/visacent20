import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentSuccesComponent } from './payment-succes.component';

describe('PaymentSuccesComponent', () => {
  let component: PaymentSuccesComponent;
  let fixture: ComponentFixture<PaymentSuccesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentSuccesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentSuccesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
