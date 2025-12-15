import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerConfirmJobComponent } from './customer-confirm-job.component';

describe('CustomerConfirmJobComponent', () => {
  let component: CustomerConfirmJobComponent;
  let fixture: ComponentFixture<CustomerConfirmJobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerConfirmJobComponent]
    });
    fixture = TestBed.createComponent(CustomerConfirmJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
