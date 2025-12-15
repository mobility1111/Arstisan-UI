import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCompleteComponent } from './job-complete.component';

describe('JobCompleteComponent', () => {
  let component: JobCompleteComponent;
  let fixture: ComponentFixture<JobCompleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobCompleteComponent]
    });
    fixture = TestBed.createComponent(JobCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
