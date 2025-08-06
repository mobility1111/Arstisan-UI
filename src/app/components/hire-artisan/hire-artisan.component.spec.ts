import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HireArtisanComponent } from './hire-artisan.component';

describe('HireArtisanComponent', () => {
  let component: HireArtisanComponent;
  let fixture: ComponentFixture<HireArtisanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HireArtisanComponent]
    });
    fixture = TestBed.createComponent(HireArtisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
