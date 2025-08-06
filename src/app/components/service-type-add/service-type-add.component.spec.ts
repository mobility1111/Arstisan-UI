import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceTypeAddComponent } from './service-type-add.component';

describe('ServiceTypeAddComponent', () => {
  let component: ServiceTypeAddComponent;
  let fixture: ComponentFixture<ServiceTypeAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceTypeAddComponent]
    });
    fixture = TestBed.createComponent(ServiceTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
