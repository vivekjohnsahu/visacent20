import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherserviceComponent } from './otherservice.component';

describe('OtherserviceComponent', () => {
  let component: OtherserviceComponent;
  let fixture: ComponentFixture<OtherserviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherserviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
