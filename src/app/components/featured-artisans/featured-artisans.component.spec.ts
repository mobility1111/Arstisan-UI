import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedArtisansComponent } from './featured-artisans.component';

describe('FeaturedArtisansComponent', () => {
  let component: FeaturedArtisansComponent;
  let fixture: ComponentFixture<FeaturedArtisansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeaturedArtisansComponent]
    });
    fixture = TestBed.createComponent(FeaturedArtisansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
