import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsContentComponent } from './deals-content.component';

describe('DealsContentComponent', () => {
  let component: DealsContentComponent;
  let fixture: ComponentFixture<DealsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealsContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
