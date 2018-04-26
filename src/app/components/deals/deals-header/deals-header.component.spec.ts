import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsHeaderComponent } from './deals-header.component';

describe('DealsHeaderComponent', () => {
  let component: DealsHeaderComponent;
  let fixture: ComponentFixture<DealsHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealsHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
