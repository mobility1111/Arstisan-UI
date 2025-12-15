import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAssignComponent } from './job-assign.component';

describe('JobAssignComponent', () => {
  let component: JobAssignComponent;
  let fixture: ComponentFixture<JobAssignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobAssignComponent]
    });
    fixture = TestBed.createComponent(JobAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
