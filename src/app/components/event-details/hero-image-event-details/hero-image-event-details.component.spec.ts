import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroImageEventDetailsComponent } from './hero-image-event-details.component';

describe('HeroImageEventDetailsComponent', () => {
  let component: HeroImageEventDetailsComponent;
  let fixture: ComponentFixture<HeroImageEventDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroImageEventDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroImageEventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
