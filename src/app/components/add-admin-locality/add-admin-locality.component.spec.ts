import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminLocalityComponent } from './add-admin-locality.component';

describe('AddAdminLocalityComponent', () => {
  let component: AddAdminLocalityComponent;
  let fixture: ComponentFixture<AddAdminLocalityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAdminLocalityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdminLocalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
