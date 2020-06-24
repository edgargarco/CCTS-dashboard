import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagRegistrationComponent } from './tag-registration.component';

describe('TagRegistrationComponent', () => {
  let component: TagRegistrationComponent;
  let fixture: ComponentFixture<TagRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
