import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtisanByLocationComponent } from './artisan-by-location.component';

describe('ArtisanByLocationComponent', () => {
  let component: ArtisanByLocationComponent;
  let fixture: ComponentFixture<ArtisanByLocationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtisanByLocationComponent]
    });
    fixture = TestBed.createComponent(ArtisanByLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
