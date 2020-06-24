import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusAndRegisterFormComponent } from './status-and-register-form.component';

describe('StatusAndRegisterFormComponent', () => {
  let component: StatusAndRegisterFormComponent;
  let fixture: ComponentFixture<StatusAndRegisterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusAndRegisterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusAndRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
