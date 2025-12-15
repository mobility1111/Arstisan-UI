import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobChargeComponent } from './job-charge.component';

describe('JobChargeComponent', () => {
  let component: JobChargeComponent;
  let fixture: ComponentFixture<JobChargeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobChargeComponent]
    });
    fixture = TestBed.createComponent(JobChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
