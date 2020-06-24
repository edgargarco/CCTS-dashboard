import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPatientStatusComponent } from './new-patient-status.component';

describe('NewPatientStatusComponent', () => {
  let component: NewPatientStatusComponent;
  let fixture: ComponentFixture<NewPatientStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPatientStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPatientStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
