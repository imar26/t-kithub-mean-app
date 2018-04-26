import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceDetailsComponent } from './price-details.component';

describe('PriceDetailsComponent', () => {
  let component: PriceDetailsComponent;
  let fixture: ComponentFixture<PriceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
