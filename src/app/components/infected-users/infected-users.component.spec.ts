import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfectedUsersComponent } from './infected-users.component';

describe('InfectedUsersComponent', () => {
  let component: InfectedUsersComponent;
  let fixture: ComponentFixture<InfectedUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfectedUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfectedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
