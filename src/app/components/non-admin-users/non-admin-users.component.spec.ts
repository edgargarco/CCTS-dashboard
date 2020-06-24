import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonAdminUsersComponent } from './non-admin-users.component';

describe('NonAdminUsersComponent', () => {
  let component: NonAdminUsersComponent;
  let fixture: ComponentFixture<NonAdminUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonAdminUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonAdminUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
