import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtisanRegisterComponent } from './artisan-register.component';

describe('ArtisanRegisterComponent', () => {
  let component: ArtisanRegisterComponent;
  let fixture: ComponentFixture<ArtisanRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtisanRegisterComponent]
    });
    fixture = TestBed.createComponent(ArtisanRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
