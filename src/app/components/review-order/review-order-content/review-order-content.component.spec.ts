import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewOrderContentComponent } from './review-order-content.component';

describe('ReviewOrderContentComponent', () => {
  let component: ReviewOrderContentComponent;
  let fixture: ComponentFixture<ReviewOrderContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewOrderContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewOrderContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
