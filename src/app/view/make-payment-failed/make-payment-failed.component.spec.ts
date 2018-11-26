import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakePaymentFailedComponent } from './make-payment-failed.component';

describe('MakePaymentFailedComponent', () => {
  let component: MakePaymentFailedComponent;
  let fixture: ComponentFixture<MakePaymentFailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakePaymentFailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakePaymentFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
