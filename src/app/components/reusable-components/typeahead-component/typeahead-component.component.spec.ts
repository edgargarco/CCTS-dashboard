import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeaheadComponentComponent } from './typeahead-component.component';

describe('TypeaheadComponentComponent', () => {
  let component: TypeaheadComponentComponent;
  let fixture: ComponentFixture<TypeaheadComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeaheadComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeaheadComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
