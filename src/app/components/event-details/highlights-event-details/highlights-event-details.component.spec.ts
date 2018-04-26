import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightsEventDetailsComponent } from './highlights-event-details.component';

describe('HighlightsEventDetailsComponent', () => {
  let component: HighlightsEventDetailsComponent;
  let fixture: ComponentFixture<HighlightsEventDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighlightsEventDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightsEventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
