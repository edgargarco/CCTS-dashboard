import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationLookUpComponent } from './location-look-up.component';

describe('LocationLookUpComponent', () => {
  let component: LocationLookUpComponent;
  let fixture: ComponentFixture<LocationLookUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationLookUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationLookUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
