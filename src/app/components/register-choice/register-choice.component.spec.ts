import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterChoiceComponent } from './register-choice.component';

describe('RegisterChoiceComponent', () => {
  let component: RegisterChoiceComponent;
  let fixture: ComponentFixture<RegisterChoiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterChoiceComponent]
    });
    fixture = TestBed.createComponent(RegisterChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
