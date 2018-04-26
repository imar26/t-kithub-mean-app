import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewOrderHeaderComponent } from './review-order-header.component';

describe('ReviewOrderHeaderComponent', () => {
  let component: ReviewOrderHeaderComponent;
  let fixture: ComponentFixture<ReviewOrderHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewOrderHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewOrderHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
