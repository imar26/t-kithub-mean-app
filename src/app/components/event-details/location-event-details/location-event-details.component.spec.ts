import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationEventDetailsComponent } from './location-event-details.component';

describe('LocationEventDetailsComponent', () => {
  let component: LocationEventDetailsComponent;
  let fixture: ComponentFixture<LocationEventDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationEventDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationEventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
